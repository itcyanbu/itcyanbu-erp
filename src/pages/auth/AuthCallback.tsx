import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Handle OAuth callback
        if (supabase) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    navigate('/');
                } else {
                    navigate('/login');
                }
            });
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
                <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
                <h2 className="text-xl font-semibold text-gray-900">Completing sign in...</h2>
                <p className="text-gray-600 mt-2">Please wait while we redirect you.</p>
            </div>
        </div>
    );
};

export default AuthCallback;
