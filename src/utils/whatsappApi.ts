// WhatsApp Cloud API Service (Meta Graph API)
// Credentials stored in localStorage - configurable from Settings > WhatsApp

export interface WhatsAppAPIConfig {
    phoneNumberId: string;
    accessToken: string;
    apiVersion: string;
}

export interface WATextMessage {
    to: string;
    body: string;
}

export interface WATemplateMessage {
    to: string;
    templateName: string;
    language: string;
    components?: any[];
}

const CONFIG_KEY = 'wa_cloud_api_config';

export function getWAConfig(): WhatsAppAPIConfig | null {
    try {
        const raw = localStorage.getItem(CONFIG_KEY);
        if (!raw) return null;
        const cfg = JSON.parse(raw) as WhatsAppAPIConfig;
        if (!cfg.phoneNumberId || !cfg.accessToken) return null;
        return cfg;
    } catch {
        return null;
    }
}

export function saveWAConfig(cfg: WhatsAppAPIConfig): void {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
}

export function clearWAConfig(): void {
    localStorage.removeItem(CONFIG_KEY);
}

export interface WASendResult {
    success: boolean;
    to: string;
    messageId?: string;
    error?: string;
}

async function sendWARequest(cfg: WhatsAppAPIConfig, body: object): Promise<{ ok: boolean; data: any }> {
    const version = cfg.apiVersion || 'v20.0';
    const url = `https://graph.facebook.com/${version}/${cfg.phoneNumberId}/messages`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cfg.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messaging_product: 'whatsapp', ...body }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function sendTextMessage(cfg: WhatsAppAPIConfig, msg: WATextMessage): Promise<WASendResult> {
    try {
        const { ok, data } = await sendWARequest(cfg, {
            to: msg.to,
            type: 'text',
            text: { preview_url: false, body: msg.body },
        });
        if (ok && data?.messages?.[0]?.id) {
            return { success: true, to: msg.to, messageId: data.messages[0].id };
        }
        const errMsg = data?.error?.message || JSON.stringify(data);
        return { success: false, to: msg.to, error: errMsg };
    } catch (e: any) {
        return { success: false, to: msg.to, error: e.message || 'Network error' };
    }
}

export async function sendBulkTextMessages(
    cfg: WhatsAppAPIConfig,
    messages: WATextMessage[],
    onProgress?: (done: number, total: number, result: WASendResult) => void
): Promise<WASendResult[]> {
    const results: WASendResult[] = [];
    for (let i = 0; i < messages.length; i++) {
        const result = await sendTextMessage(cfg, messages[i]);
        results.push(result);
        if (onProgress) onProgress(i + 1, messages.length, result);
        // Meta recommends ~80 req/sec max — 12ms delay is safe
        if (i < messages.length - 1) await new Promise(r => setTimeout(r, 100));
    }
    return results;
}

export async function testWAConnection(cfg: WhatsAppAPIConfig): Promise<{ ok: boolean; display_phone_number?: string; error?: string }> {
    try {
        const version = cfg.apiVersion || 'v20.0';
        const url = `https://graph.facebook.com/${version}/${cfg.phoneNumberId}?fields=display_phone_number,verified_name,quality_rating`;
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${cfg.accessToken}` },
        });
        const data = await res.json();
        if (res.ok && data.display_phone_number) {
            return { ok: true, display_phone_number: data.display_phone_number };
        }
        return { ok: false, error: data?.error?.message || 'Connection failed' };
    } catch (e: any) {
        return { ok: false, error: e.message || 'Network error' };
    }
}
