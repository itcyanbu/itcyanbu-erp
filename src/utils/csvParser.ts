/**
 * Simple CSV Parser
 * Handles basic CSV parsing with support for quoted values.
 * Does not support complex edge cases like multi-line quoted values securely, 
 * but sufficient for standard contact imports.
 */

export const parseCSV = (content: string): { headers: string[], data: Record<string, string>[] } => {
    const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length === 0) return { headers: [], data: [] };

    const parseLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    // Double quote inside quotes
                    current += '"';
                    i++;
                } else {
                    // Toggle quotes
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                // End of field
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    };

    const headers = parseLine(lines[0]);
    const data = lines.slice(1).map(line => {
        const values = parseLine(line);
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        return row;
    });

    return { headers, data };
};
