import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Loader2, ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'reseller' | 'user';
    checkLicense?: boolean;
}

const ProtectedRoute = ({ children, requiredRole, checkLicense }: ProtectedRouteProps) => {
    const location = useLocation();

    // 1. Synchronous Demo Check (Prevents flickering and race conditions)
    const isDemoInit = sessionStorage.getItem('demoMode') === 'true' ||
        new URLSearchParams(window.location.search).get('demo') === 'true';

    const [loading, setLoading] = useState(!isDemoInit);
    const [authorized, setAuthorized] = useState(isDemoInit);
    const [licenseActive, setLicenseActive] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // 1. Double check URL for demo parameter (Just in case)
            const queryParams = new URLSearchParams(window.location.search);
            if (queryParams.get('demo') === 'true') {
                sessionStorage.setItem('demoMode', 'true');
                setAuthorized(true);
                setLoading(false);
                return;
            }

            // 2. If already authorized by demo init, stop here
            // This prevents unnecessary DB calls if demo mode was already established synchronously.
            if (isDemoInit) {
                setAuthorized(true);
                setLoading(false);
                return;
            }

            try {
                // 3. Database Session Check
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (!session || sessionError) {
                    setAuthorized(false);
                    setLoading(false);
                    return;
                }

                // 4. User Profile / Role Check
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                // 5. Master Admin Override
                if (profile?.role === 'admin') {
                    setAuthorized(true);
                    setLoading(false);
                    return;
                }

                // 6. Subscription/License Validation
                if (checkLicense) {
                    const { data: license } = await supabase
                        .from('licenses')
                        .select('status, valid_until')
                        .eq('user_id', session.user.id)
                        .order('issued_at', { ascending: false })
                        .limit(1)
                        .maybeSingle();

                    // Allow access if NO license exists (assume new user/trial)
                    // Only block if a license EXISTS and is NOT active/expired
                    if (license) {
                        const isValid = license.status === 'active' && new Date(license.valid_until) > new Date();
                        if (!isValid) {
                            setLicenseActive(false);
                            setAuthorized(false);
                            setLoading(false);
                            return;
                        }
                    }
                }

                // 7. Role-Specific Access
                if (requiredRole && profile?.role !== requiredRole) {
                    setAuthorized(false);
                    setLoading(false);
                    return;
                }

                setAuthorized(true);
            } catch (error) {
                console.error('Security Check Error:', error);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [requiredRole, checkLicense, isDemoInit]);

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
                <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Verifying access rights...</p>
            </div>
        );
    }

    if (!authorized) {
        if (!licenseActive) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
                        <ShieldAlert size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">License Expired or Inactive</h2>
                    <p className="text-slate-600 max-w-md mb-8">
                        Your access to this module has been suspended because your license is either expired or not yet activated. Please contact support or your reseller.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-3 bg-[#112D4E] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                        Return to Home
                    </button>
                </div>
            );
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
