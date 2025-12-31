import React, { useEffect } from 'react';
import { sendWelcomeEmail } from '../services/email';
import { motion, AnimatePresence } from 'framer-motion'; // Keep import but unused for now
import { X, User, Lock, Mail, Building, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'Register' | 'Super Admin Login' | 'Software Login' | 'CRM Login' | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    // Debug logging on mount
    useEffect(() => {
        if (isOpen) {
            console.log('LoginModal mounted/opened. Type:', type);
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
            // Fallback for demo if supabase isn't configured or network fails
            const isConfigError = err.message?.includes('Mix of Supabase URL') ||
                err.message?.includes('Failed to fetch') ||
                err.message?.includes('Load failed');

            if (isConfigError) {
                console.warn("Supabase not configured or unreachable. Entering Demo Mode.");
                alert("Demo Mode: Supabase keys missing or unreachable. Redirecting to dashboard...");
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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-red-500/20">
            <div className="bg-white p-10 rounded-xl shadow-2xl border-4 border-red-500">
                <h1 className="text-4xl font-bold text-red-600 mb-4">DEBUG MODE</h1>
                <p className="text-xl mb-4">If you see this, the modal is WORKING.</p>
                <p className="mb-4">Current Type: <strong>{type}</strong></p>
                <button
                    onClick={onClose}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
                >
                    Close Debug Modal
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
