import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 1. Define a Mock Client for fallback (Emergency Mode)
const mockClient: any = {
    auth: {
        signUp: async () => ({ data: {}, error: { message: "System Maintenance: Database Connection Failed (Check Keys)" } }),
        signInWithPassword: async () => ({ data: {}, error: { message: "System Maintenance: Database Connection Failed (Check Keys)" } }),
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    },
    from: () => ({
        select: () => ({
            eq: () => ({
                single: async () => ({ data: null, error: { message: "Mock Data" } }),
                order: () => ({ data: [], error: null })
            }),
            order: () => ({ data: [], error: null })
        }),
        insert: async () => ({ error: { message: "Maintenance Mode" } }),
        update: async () => ({ error: { message: "Maintenance Mode" } }),
    })
};

let supabaseInstance: SupabaseClient | null = null;

// 2. Safe Initialization Function
export const getSupabase = (): SupabaseClient => {
    if (supabaseInstance) return supabaseInstance;

    try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        // Validation
        if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-actual-key')) {
            console.warn('Supabase: Missing/Invalid Keys. Using Mock Client.');
            supabaseInstance = mockClient as SupabaseClient;
            return supabaseInstance!;
        }

        // Attempt Connection
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
            }
        });

        return supabaseInstance!;
    } catch (error) {
        console.error('Supabase: CRITICAL INITIALIZATION FAILURE. Using Mock Client.', error);
        supabaseInstance = mockClient as SupabaseClient;
        return supabaseInstance!;
    }
};

// 3. Proxy Export for legacy compatibility (Prevents import-time crashes)
export const supabase = new Proxy({} as SupabaseClient, {
    get: (target, prop) => {
        const client = getSupabase(); // Init on demand
        // @ts-ignore
        const value = client[prop];
        if (typeof value === 'function') {
            return value.bind(client);
        }
        return value;
    }
});
