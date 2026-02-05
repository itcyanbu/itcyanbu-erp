import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials not found. App will run in localStorage-only mode.');
    console.warn('To enable cloud storage, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local');
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    })
    : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase;

// Database types
export interface Database {
    public: {
        Tables: {
            contacts: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    first_name: string | null;
                    last_name: string | null;
                    email: string | null;
                    phone: string | null;
                    contact_type: string | null;
                    tags: string[] | null;
                    initials: string | null;
                    avatar_color: string | null;
                    time_zone: string | null;
                    dnd_all_channels: boolean | null;
                    custom_fields: Record<string, any> | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['contacts']['Insert']>;
            };
            conversations: {
                Row: {
                    id: string;
                    user_id: string;
                    contact_id: string | null;
                    channel: 'email' | 'sms' | 'whatsapp' | 'chat' | 'internal';
                    last_message: Record<string, any> | null;
                    unread_count: number;
                    is_starred: boolean;
                    tags: string[] | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
            };
            messages: {
                Row: {
                    id: string;
                    conversation_id: string;
                    user_id: string;
                    type: 'message' | 'internal_comment' | 'system';
                    from_type: 'user' | 'contact' | 'system';
                    body: string;
                    channel: string;
                    is_internal: boolean;
                    status: 'sent' | 'delivered' | 'read' | 'failed' | null;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['messages']['Insert']>;
            };
            appointments: {
                Row: {
                    id: string;
                    user_id: string;
                    contact_id: string | null;
                    calendar_id: string | null;
                    title: string;
                    description: string | null;
                    start_time: string;
                    end_time: string;
                    status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
                    location: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['appointments']['Insert']>;
            };
            calendars: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    description: string | null;
                    color: string;
                    is_active: boolean;
                    settings: Record<string, any> | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['calendars']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['calendars']['Insert']>;
            };
        };
    };
}
