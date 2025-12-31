import React from 'react';
import { sendWelcomeEmail } from '../services/email';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Building, ArrowRight } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'Register' | 'Super Admin Login' | 'Software Login' | 'CRM Login' | null;
}

import { useNavigate } from 'react-router-dom';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null; // Restored guard clause

    const getTitle = () => {
        switch (type) {
            case 'Register': return 'Create Account';
            case 'Super Admin Login': return 'Admin Portal';
            case 'Software Login': return 'Software Access';
            case 'CRM Login': return 'CRM Dashboard';
            default: return 'Login';
        }
    };

    const isRegister = type === 'Register';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.target as HTMLFormElement;

        // --- Supabase Integration ---
        const { supabase } = await import('../services/supabase');

        try {
            if (isRegister) {
                const nameInput = form.querySelector('input[placeholder="John Doe"]') as HTMLInputElement;
                const emailInput = form.querySelector('input[placeholder="name@company.com"]') as HTMLInputElement;
                const passwordInput = form.querySelector('input[type="password"]') as HTMLInputElement;

                if (nameInput?.value && emailInput?.value && passwordInput?.value) {
                    // 1. Sign Up
                    const { data, error } = await supabase.auth.signUp({
                        email: emailInput.value,
                        password: passwordInput.value,
                        options: {
                            data: {
                                full_name: nameInput.value,
                                role: 'user' // Default role
                            }
                        }
                    });

                    if (error) throw error;

                    if (data.user) {
                        // 2. Send Welcome Email (simulated/EmailJS)
                        await sendWelcomeEmail(nameInput.value, emailInput.value);
                        alert('Registration successful! Please check your email to verify your account.');
                        onClose();
                    }
                }
            } else {
                // Login Logic
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                const passwordInput = form.querySelector('input[type="password"]') as HTMLInputElement;

                const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                    email: emailInput.value,
                    password: passwordInput.value
                });

                if (authError) throw authError;

                if (authData.user) {
                    // 3. Fetch User Role
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', authData.user.id)
                        .single();

                    const userRole = profile?.role || 'user';

                    // 4. Redirect based on Role or Intended Login Type
                    if (userRole === 'super_admin' || type === 'Super Admin Login') {
                        navigate('/admin');
                    } else if (type === 'Software Login' || type === 'CRM Login') { // Any user can access software portal
                        navigate('/software');
                    } else {
                        alert('Login successful!');
                        // Default to software portal for standard users
                        navigate('/software');
                    }
                    onClose();
                }
            }
        } catch (err: any) {
            console.error('Auth Error:', err);
            // Fallback for demo if supabase isn't configured or network fails (simulated env)
            const isConfigError = err.message?.includes('Mix of Supabase URL') ||
                err.message?.includes('Failed to fetch') ||
                err.message?.includes('Load failed');

            if (isConfigError) {
                console.warn("Supabase not configured or unreachable. Entering Demo Mode.");
                alert("Demo Mode: Supabase keys missing or unreachable. Redirecting to dashboard...");
                // Fallback simulation for demo purposes
                setTimeout(() => {
                    sessionStorage.setItem('demoMode', 'true');
                    navigate(type === 'Super Admin Login' ? '/admin?demo=true' : '/software?demo=true');
                    onClose();
                }, 1000);
            } else {
                alert(`Authentication failed: ${err.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={`relative w-full max-w-md ${isRegister ? 'bg-[#1e1e1e] text-white' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden border border-white/10`}
                >
                    {/* Header */}
                    <div className={`${isRegister ? 'bg-[#1e1e1e]' : 'bg-[#112D4E]'} p-6 relative border-b border-white/10`}>
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold text-center">
                            {isRegister ? 'Create an Account (Free)' : getTitle()}
                        </h3>
                        {isRegister && (
                            <div className="mt-4 text-center">
                                <p className="text-sm font-medium flex items-center justify-center gap-2 mb-1">
                                    <span role="img" aria-label="lock">🔑🔒</span> We Maintain Data Privacy, 100% Safe & Secure
                                </p>
                                <p className="text-xs text-gray-400">No Payment Required</p>
                            </div>
                        )}
                        {!isRegister && (
                            <p className="text-sm text-blue-200 mt-1">
                                Secure login area
                            </p>
                        )}
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {isRegister ? (
                                <>
                                    <div className="flex">
                                        <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                            <Building size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none"
                                            placeholder="Company Name"
                                        />
                                    </div>

                                    <div className="flex">
                                        <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none"
                                            placeholder="E-mail"
                                        />
                                    </div>

                                    <div className="flex">
                                        <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none"
                                            placeholder="Contact No."
                                        />
                                    </div>

                                    <div className="flex">
                                        <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        </div>
                                        <select
                                            className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none appearance-none"
                                            defaultValue="Saudi Arabia"
                                        >
                                            <option>Saudi Arabia</option>
                                            <option>United Arab Emirates</option>
                                            <option>Egypt</option>
                                            <option>Jordan</option>
                                        </select>
                                    </div>

                                    <div className="flex">
                                        <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 12h.01"></path><path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7"></path><path d="M16 20l2 2 4-4"></path></svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none"
                                            placeholder="Reseller Code (optional)"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <input type="checkbox" id="terms" required className="w-4 h-4 rounded" />
                                        <label htmlFor="terms" className="text-sm text-gray-300">
                                            I agree to the <a href="#" className="text-blue-400 hover:underline">Terms and Conditions</a>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#1db954] text-white py-3 rounded-lg font-bold hover:bg-[#1ed760] transition-all flex items-center justify-center gap-2 mt-6 uppercase tracking-wider"
                                    >
                                        {isLoading ? 'Processing...' : (
                                            <>
                                                SUBMIT <svg className="w-5 h-5 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                            </>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="email"
                                                required
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#112D4E] focus:border-transparent outline-none transition-all"
                                                placeholder="name@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="password"
                                                required
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#112D4E] focus:border-transparent outline-none transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#112D4E] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3f6b] transition-colors flex items-center justify-center gap-2 mt-6 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Processing...' : 'Sign In'}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    <div className={`${isRegister ? 'bg-black/20 text-gray-500' : 'bg-gray-50 text-gray-500'} px-8 py-4 text-center text-xs`}>
                        {isRegister ? 'JOIN THE COMMUNITY TODAY' : 'Protected by enterprise-grade security'}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LoginModal;
