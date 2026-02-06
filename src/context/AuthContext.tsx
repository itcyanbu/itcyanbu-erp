import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
    signInWithGoogle: () => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    isAuthenticated: boolean;
    isSupabaseEnabled: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const isSupabaseEnabled = isSupabaseConfigured();

    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        if (!supabase) {
            // Mock Login for Demo Mode
            const mockUser: any = {
                id: 'mock-user-123',
                email: email,
                role: 'authenticated',
                aud: 'authenticated',
                created_at: new Date().toISOString(),
                app_metadata: {},
                user_metadata: {}
            };
            setUser(mockUser);
            return { error: null };
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signUp = async (email: string, password: string, metadata?: any) => {
        if (!supabase) {
            // Mock Signup for Demo Mode
            const mockUser: any = {
                id: 'mock-user-123',
                email: email,
                role: 'authenticated',
                aud: 'authenticated',
                created_at: new Date().toISOString(),
                app_metadata: {},
                user_metadata: metadata || {}
            };
            setUser(mockUser);
            return { error: null };
        }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });
        return { error };
    };

    const signInWithGoogle = async () => {
        if (!supabase) {
            // Mock Google Login for Demo Mode
            const mockUser: any = {
                id: 'mock-google-user-456',
                email: 'demo@gmail.com',
                role: 'authenticated',
                aud: 'authenticated',
                created_at: new Date().toISOString(),
                app_metadata: { provider: 'google' },
                user_metadata: {
                    full_name: 'Demo User',
                    avatar_url: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
                }
            };
            setUser(mockUser);
            return { error: null };
        }
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        return { error };
    };

    const signOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    const value = {
        user,
        session,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        isAuthenticated: !!user,
        isSupabaseEnabled
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
