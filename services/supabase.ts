// EMERGENCY MOCK MODE
// The real Supabase client is causing the app to crash on load.
// We are exporting a temporary dummy object to unblock the UI.

console.warn("!!! RUNNING IN EMERGENCY MOCK MODE - DATABASE DISCONNECTED !!!");

const mockClient = {
    auth: {
        signUp: async () => ({ data: {}, error: { message: "System Maintenance: Database Disconnected" } }),
        signInWithPassword: async () => ({ data: {}, error: { message: "System Maintenance: Database Disconnected" } }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    },
    from: () => ({
        select: () => ({
            eq: () => ({
                single: async () => ({ data: { role: 'user' }, error: null }),
                order: () => ({ data: [], error: null })
            }),
            order: () => ({ data: [], error: null })
        }),
        insert: async () => ({ error: { message: "Maintenance Mode" } }),
        update: async () => ({ error: { message: "Maintenance Mode" } }),
    })
};

export const getSupabase = () => mockClient;
export const supabase = mockClient;
