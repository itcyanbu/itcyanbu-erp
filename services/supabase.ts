import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase URL or Key. Please check your .env file.');
}

let supabaseInstance;

try {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase URL or Key');
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
    console.warn('Supabase initialization failed:', error);
    // Return a dummy client to prevent crash, requests will just fail gracefully
    supabaseInstance = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

export const supabase = supabaseInstance;
