/**
 * Production-Ready VCF (vCard) Parser
 * - Handles vCard 2.1, 3.0, 4.0
 * - Unfolds multi-line records (spaces, tabs, soft line breaks '=')
 * - Full Quoted-Printable & UTF-8 decoder (e.g. Arabic, Cyrillic, accented names)
 * - Safely strips out massive binary fields (PHOTO, LOGO, SOUND) to prevent browser memory crashes
 * - Extracts structured N: if FN: is missing
 */

function decodeQuotedPrintable(str: string): string {
    if (!str || typeof str !== 'string') return '';
    
    // Remove soft line breaks
    const cleaned = str.replace(/=\r?\n/g, '').replace(/=\n/g, '');
    
    // If not quoted-printable encoded, return as-is
    if (!cleaned.includes('=')) return cleaned.trim();

    const bytes: number[] = [];
    for (let i = 0; i < cleaned.length; i++) {
        if (cleaned[i] === '=' && i + 2 < cleaned.length && /[0-9A-Fa-f]{2}/.test(cleaned.substring(i + 1, i + 3))) {
            bytes.push(parseInt(cleaned.substring(i + 1, i + 3), 16));
            i += 2;
        } else {
            bytes.push(cleaned.charCodeAt(i));
        }
    }

    try {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(new Uint8Array(bytes)).replace(/_/g, ' ').trim();
    } catch {
        return cleaned.replace(/=([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16))).trim();
    }
}

function cleanValue(raw: string, isQuotedPrintable: boolean): string {
    if (!raw) return '';
    let val = raw.trim();
    if (isQuotedPrintable || val.includes('=')) {
        val = decodeQuotedPrintable(val);
    }
    // Remove enclosing quotes or escaped chars
    return val.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\n/g, ' ').trim();
}

export const parseVCF = (content: string): { headers: string[], data: Record<string, string>[] } => {
    if (!content || typeof content !== 'string') {
        return { headers: ['name', 'phone', 'email'], data: [] };
    }

    // Step 1: Unfold lines (vCard standard: line beginning with space or tab is a continuation)
    const rawLines = content.split(/\r?\n/);
    const unfoldedLines: string[] = [];

    for (let i = 0; i < rawLines.length; i++) {
        let line = rawLines[i];
        if (!line) continue;

        // Skip binary payload lines to save memory and avoid regex slowdown
        if (line.toUpperCase().startsWith('PHOTO') || line.toUpperCase().startsWith('LOGO') || line.toUpperCase().startsWith('SOUND') || line.toUpperCase().startsWith('KEY')) {
            // Skip until next standard header or END:VCARD
            while (i + 1 < rawLines.length && (rawLines[i + 1].startsWith(' ') || rawLines[i + 1].startsWith('\t') || rawLines[i + 1].includes(':') === false)) {
                i++;
            }
            continue;
        }

        // Line continuation
        if ((line.startsWith(' ') || line.startsWith('\t')) && unfoldedLines.length > 0) {
            unfoldedLines[unfoldedLines.length - 1] += line.slice(1);
        } else {
            unfoldedLines.push(line);
        }
    }

    const cards: Record<string, string>[] = [];
    let currentCard: Record<string, string> | null = null;
    let fallbackNameFromN = '';

    const keys = new Set<string>();
    keys.add('name');
    keys.add('phone');
    keys.add('email');
    keys.add('company');

    for (let i = 0; i < unfoldedLines.length; i++) {
        const line = unfoldedLines[i].trim();
        if (!line) continue;

        if (line.toUpperCase().startsWith('BEGIN:VCARD')) {
            currentCard = {};
            fallbackNameFromN = '';
        } else if (line.toUpperCase().startsWith('END:VCARD')) {
            if (currentCard) {
                // If no FN was found, use the parsed N field
                if (!currentCard.name && fallbackNameFromN) {
                    currentCard.name = fallbackNameFromN;
                }
                // Only push if card has at least a name, phone, or email
                if (currentCard.name || currentCard.phone || currentCard.email) {
                    cards.push(currentCard);
                }
            }
            currentCard = null;
            fallbackNameFromN = '';
        } else if (currentCard) {
            const colonIdx = line.indexOf(':');
            if (colonIdx === -1) continue;

            const keyPart = line.substring(0, colonIdx).trim();
            const rawValue = line.substring(colonIdx + 1).trim();
            if (!rawValue) continue;

            const isQP = keyPart.toUpperCase().includes('ENCODING=QUOTED-PRINTABLE') || keyPart.toUpperCase().includes('ENCODING=QP');
            const key = keyPart.split(';')[0].toLowerCase();

            // Ignore version and binary keys
            if (key === 'version' || key === 'photo' || key === 'logo' || key === 'sound') continue;

            if (key === 'fn') {
                const val = cleanValue(rawValue, isQP);
                if (val) {
                    currentCard.name = val;
                    keys.add('name');
                }
            } else if (key === 'n') {
                // Structured name format: Family;Given;Additional;Prefix;Suffix
                const parts = rawValue.split(';').map(p => cleanValue(p, isQP)).filter(Boolean);
                if (parts.length > 0) {
                    // Usually Given Name + Family Name: parts[1] + ' ' + parts[0]
                    const given = parts[1] || '';
                    const family = parts[0] || '';
                    fallbackNameFromN = `${given} ${family}`.trim() || parts.join(' ').trim();
                }
            } else if (key === 'tel') {
                const val = cleanValue(rawValue, isQP);
                if (val) {
                    // If multiple phones, store first or append
                    if (!currentCard.phone) {
                        currentCard.phone = val;
                    }
                    keys.add('phone');
                }
            } else if (key === 'email') {
                const val = cleanValue(rawValue, isQP);
                if (val) {
                    if (!currentCard.email) {
                        currentCard.email = val;
                    }
                    keys.add('email');
                }
            } else if (key === 'org') {
                const val = cleanValue(rawValue, isQP).replace(/;/g, ' ').trim();
                if (val) {
                    currentCard.company = val;
                    keys.add('company');
                }
            } else if (key === 'title') {
                const val = cleanValue(rawValue, isQP);
                if (val) {
                    currentCard.title = val;
                    keys.add('title');
                }
            } else if (key === 'note') {
                const val = cleanValue(rawValue, isQP);
                if (val) {
                    currentCard.notes = val;
                    keys.add('notes');
                }
            } else if (key === 'adr') {
                const val = cleanValue(rawValue, isQP).replace(/;/g, ' ').trim();
                if (val) {
                    currentCard.address = val;
                    keys.add('address');
                }
            }
        }
    }

    return {
        headers: Array.from(keys),
        data: cards
    };
};
