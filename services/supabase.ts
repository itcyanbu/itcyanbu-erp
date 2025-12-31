import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
    if (supabaseInstance) return supabaseInstance;

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Robust check for missing or placeholder keys
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-actual-key')) {
        console.warn('Supabase Configuration Missing or Invalid.');
        // Return a dummy client that won't crash but will fail requests gracefully
        return createClient('https://placeholder.supabase.co', 'placeholder-key');
    }

    try {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (error) {
        console.error('Supabase Initialization Failed:', error);
        return createClient('https://placeholder.supabase.co', 'placeholder-key');
    }

    return supabaseInstance;
};

// Keep default export for backwards compatibility if needed, but discourage use
export const supabase = getSupabase();
