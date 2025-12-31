import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

interface UseSupabaseQueryOptions<T> {
    table: string;
    select?: string;
    filter?: { column: string; value: any };
    orderBy?: { column: string; ascending?: boolean };
}

export function useSupabaseQuery<T = any>(options: UseSupabaseQueryOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let query = supabase.from(options.table).select(options.select || '*');

                if (options.filter) {
                    query = query.eq(options.filter.column, options.filter.value);
                }

                if (options.orderBy) {
                    query = query.order(options.orderBy.column, {
                        ascending: options.orderBy.ascending ?? true
                    });
                }

                const { data: result, error: queryError } = await query;

                if (queryError) throw queryError;
                setData(result as T);
                setError(null);
            } catch (err) {
                setError(err as Error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [options.table, options.select, options.filter?.column, options.filter?.value]);

    return { data, loading, error };
}

export function useSupabaseInsert<T = any>(table: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const insert = async (values: Partial<T>) => {
        try {
            setLoading(true);
            const { data, error: insertError } = await supabase
                .from(table)
                .insert(values)
                .select()
                .single();

            if (insertError) throw insertError;
            setError(null);
            return data;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { insert, loading, error };
}

export function useSupabaseUpdate<T = any>(table: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const update = async (id: string, values: Partial<T>) => {
        try {
            setLoading(true);
            const { data, error: updateError } = await supabase
                .from(table)
                .update(values)
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;
            setError(null);
            return data;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { update, loading, error };
}

// Aggregate query hook for stats
export function useSupabaseStats() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [stats, setStats] = useState({
        totalResellers: 0,
        pendingKYC: 0,
        activeLicenses: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                // Count resellers
                const { count: resellerCount } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true })
                    .eq('role', 'reseller');

                // Count pending KYC
                const { count: pendingCount } = await supabase
                    .from('reseller_documents')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'pending');

                // Calculate Total Revenue from licenses
                const { data: licenseData } = await supabase
                    .from('licenses')
                    .select('price')
                    .eq('status', 'active');

                const revenue = licenseData?.reduce((sum, l) => sum + (Number(l.price) || 0), 0) || 0;

                // Count active licenses
                const { count: licenseCount } = await supabase
                    .from('licenses')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'active');

                setStats({
                    totalResellers: resellerCount || 0,
                    pendingKYC: pendingCount || 0,
                    activeLicenses: licenseCount || 0,
                    totalRevenue: revenue
                });
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
