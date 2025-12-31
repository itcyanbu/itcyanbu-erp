import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/Toast';

interface ClientLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'Software Login' | 'CRM Login' | null;
}

const ClientLoginModal: React.FC<ClientLoginModalProps> = ({ isOpen, onClose, type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Try Supabase authentication
            const { supabase } = await import('../services/supabase');
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Check if user has active license
            const { data: profile } = await supabase
                .from('profiles')
                .select('role, id')
                .eq('id', data.user.id)
                .single();

            // Get user's active licenses
            const { data: licenses } = await supabase
                .from('licenses')
                .select('*')
                .eq('client_email', email)
                .order('issued_at', { ascending: false });

            // Allow if no license (Trial) or if valid license found
            if (licenses && licenses.length > 0) {
                const license = licenses[0];
                const isValid = license.status === 'active' && new Date(license.valid_until) > new Date();

                if (!isValid) {
                    showToast('error', 'Your license has expired. Please renew to continue.');
                    setLoading(false);
                    return;
                }

                sessionStorage.setItem('userLicense', JSON.stringify(license));
            } else {
                // No license found - Implicit Trial Mode
                console.log('No license found - entering Trial Mode');
            }

            // Success - store license info in session
            sessionStorage.setItem('userLicense', JSON.stringify(license));
            sessionStorage.setItem('userEmail', email);

            // Success path also needs to navigate correctly
            showToast('success', 'Login successful!');
            onClose();
            const destination = window.location.pathname.includes('crm') ? '/crm' : '/software';
            navigate(destination);
        } catch (error: any) {
            console.error('Login error:', error);

            // Demo mode fallback
            if (email && password) {
                showToast('info', 'Demo mode: Redirecting to software portal');
                sessionStorage.setItem('demoMode', 'true');
                sessionStorage.setItem('userEmail', email);
                onClose();
                const isCRM = type === 'CRM Login';
                navigate(isCRM ? '/crm?demo=true' : '/software?demo=true');
            } else {
                showToast('error', error.message || 'Login failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">{type || 'Software Login'}</h2>
                        <p className="text-slate-500 mb-6">Access your business tools and dashboard</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="you@company.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#112D4E] text-white py-3 rounded-lg hover:bg-[#1a3f6b] transition-colors font-semibold disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Login to Software'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-500">
                                Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ClientLoginModal;
