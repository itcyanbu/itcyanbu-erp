/**
 * Simple VCF (vCard) Parser
 * Parses VCF string content into a flat array of objects compatible with the CSV importer structure.
 * Supports multiple vCards in a single file.
 */

export const parseVCF = (content: string): { headers: string[], data: Record<string, string>[] } => {
    const cards: Record<string, string>[] = [];
    const lines = content.split(/\r?\n/);

    let currentCard: Record<string, string> | null = null;

    // Set of all keys found across all cards to build headers
    const keys = new Set<string>();
    keys.add('fn'); // Full Name
    keys.add('email');
    keys.add('tel');

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith('BEGIN:VCARD')) {
            currentCard = {};
        } else if (trimmed.startsWith('END:VCARD')) {
            if (currentCard && Object.keys(currentCard).length > 0) {
                cards.push(currentCard);
            }
            currentCard = null;
        } else if (currentCard) {
            // fast and loose parsing
            const parts = trimmed.split(':');
            if (parts.length < 2) return;

            let keyPart = parts[0].toLowerCase();
            const value = parts.slice(1).join(':').trim(); // Re-join in case value has colons

            // Handle params like EMAIL;TYPE=...
            const keyParams = keyPart.split(';');
            const key = keyParams[0];

            // Normalize keys to standard headers
            if (key === 'n') return; // Skip structured name N:Doe;John;..., rely on FN
            if (key === 'version') return;

            // Map common vCard fields to readable headers
            let header = key;
            if (key === 'fn') header = 'name';
            else if (key === 'email') header = 'email';
            else if (key === 'tel') header = 'phone';
            else if (key === 'org') header = 'company';
            else if (key === 'title') header = 'title';
            else if (key === 'note') header = 'notes';
            else if (key === 'adr') header = 'address';
            else if (key === 'bday') header = 'birthday';
            else if (key === 'url') header = 'website';

            // If already exists (e.g. multiple emails), append or ignore? 
            // For simplicity, we'll overwrite or append with comma if needed, but let's just overwrite for now or use specific logic
            // Actually, let's just take the first one found or append if it's different.
            if (currentCard[header]) {
                // duplicate key, maybe append?
                // currentCard[header] += `, ${value}`;
            } else {
                currentCard[header] = value;
            }

            keys.add(header);
        }
    });

    return {
        headers: Array.from(keys),
        data: cards
    };
};
