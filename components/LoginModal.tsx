import React, { useEffect, useState } from 'react';
import { sendWelcomeEmail } from '../services/email';
// Removed unused framer-motion to simplify debugging and stability
import { X, User, Lock, Mail, Building, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'Register' | 'Super Admin Login' | 'Software Login' | 'CRM Login' | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Debug logging
    useEffect(() => {
        if (isOpen) {
            console.log('LoginModal mounted. Type:', type);
        }
    }, [isOpen, type]);

    if (!isOpen) return null;

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

        try {
            if (isRegister) {
                const formData = new FormData(form);
                const companyName = formData.get('companyName') as string;
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                const phone = formData.get('phone') as string;
                const country = formData.get('country') as string;
                const resellerCode = formData.get('resellerCode') as string;

                if (companyName && email && password) {
                    // 1. Sign Up
                    const { data, error } = await supabase.auth.signUp({
                        email: email,
                        password: password,
                        options: {
                            data: {
                                full_name: companyName,
                                phone: phone,
                                country: country,
                                reseller_code: resellerCode,
                                role: 'user'
                            }
                        }
                    });

                    if (error) throw error;

                    if (data.user) {
                        // 2. Send Welcome Email (simulated/EmailJS)
                        await sendWelcomeEmail(companyName, email);
                        // Using browser alert for reliability in this debug phase
                        alert('Registration successful! Please check your email to verify your account.');
                        onClose();
                    }
                }
            } else {
                // Login Logic
                const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
                const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;

                if (!emailInput || !passwordInput) throw new Error("Input fields not found");

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
                    } else if (type === 'Software Login' || type === 'CRM Login') {
                        navigate('/software');
                    } else {
                        // Default to software portal for standard users
                        navigate('/software');
                    }
                    onClose();
                }
            }
        } catch (err: any) {
            console.error('Auth Error:', err);

            const isConfigError = err.message?.includes('Mix of Supabase URL') ||
                err.message?.includes('Failed to fetch') ||
                err.message?.includes('Load failed');

            if (isConfigError) {
                console.warn("Supabase connection issue. Entering Demo Mode fallback.");
                alert("Demo Mode: Supabase keys missing or unreachable. Redirecting...");
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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <div
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
                    <h3 className="text-2xl font-bold text-center text-white">
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
                        <p className="text-sm text-blue-200 mt-1 text-center">
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
                                        name="companyName"
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
                                        name="email"
                                        required
                                        className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none"
                                        placeholder="E-mail"
                                    />
                                </div>

                                <div className="flex">
                                    <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="flex">
                                    <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        name="phone"
                                        required
                                        className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-r-lg outline-none"
                                        placeholder="Contact No."
                                    />
                                </div>

                                <div className="flex">
                                    <div className="bg-[#f0f0f0] p-3 rounded-l-lg flex items-center justify-center w-12 text-gray-600">
                                        <Building size={20} />
                                    </div>
                                    <select
                                        name="country"
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
                                        <ArrowRight size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        name="resellerCode"
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
                                            name="email"
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
                                            name="password"
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
                    {isRegister ? (
                        <a href="#" className="hover:text-white transition-colors">
                            JOIN THE COMMUNITY TODAY
                        </a>
                    ) : 'Protected by enterprise-grade security'}
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
