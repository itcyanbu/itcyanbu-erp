import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            if (!supabase) {
                console.error('Supabase not configured');
                navigate('/');
                return;
            }

            try {
                // Exchange the code for a session
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Error during authentication callback:', error);
                    navigate('/');
                    return;
                }

                if (data.session) {
                    console.log('Authentication successful!', data.session.user);
                    // Redirect to the main app
                    navigate('/contacts');
                } else {
                    console.warn('No session found after authentication');
                    navigate('/');
                }
            } catch (err) {
                console.error('Unexpected error during auth callback:', err);
                navigate('/');
            }
        };

        handleCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Completing authentication...</p>
            </div>
        </div>
    );
}
