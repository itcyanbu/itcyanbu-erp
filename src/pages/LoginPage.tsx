import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Eye, EyeOff, Info, ChevronDown } from 'lucide-react';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { i18n } = useTranslation();
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('demo');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4 font-sans">
            <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[480px]">
                {/* Logo Section */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    <div className="w-10 h-10 bg-[#007bff] rounded-lg flex items-center justify-center shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                            <path d="M21 5l-7 7-4-4L3 15v4l7-7 4 4 7-7V5z" />
                            {/* Simplified Bird Icon path */}
                        </svg>
                    </div>
                    <span className="text-[28px] font-bold text-[#333] tracking-tight">itcyanbu</span>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-[24px] font-bold text-[#1a1a1a]">Log in</h1>
                    <div className="relative">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-full text-sm font-medium transition-all border border-gray-100"
                        >
                            <Languages size={16} className="text-blue-500" />
                            {i18n.language === 'ar' ? 'العربية' : 'English'}
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please enter an email address."
                            className="w-full px-5 py-4 bg-[#f8f9fa] border border-transparent rounded-[16px] text-[15px] text-gray-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400 shadow-inner"
                            required
                        />
                    </div>

                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Please enter your password"
                            className="w-full px-5 py-4 bg-[#f8f9fa] border border-transparent rounded-[16px] text-[15px] text-gray-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400 shadow-inner pr-[90px]"
                            required
                        />
                        <div className="absolute right-4 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <div className="w-[1px] h-4 bg-gray-200" />
                            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Info size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-200 rounded-md bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all shadow-sm" />
                                <svg
                                    className="absolute inset-0 w-3 h-3 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-[14px] text-gray-600 font-medium">Remember me</span>
                        </label>
                        <button type="button" className="text-[14px] text-blue-600 font-medium hover:underline">
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#007bff] hover:bg-[#0069d9] text-white font-bold py-4 px-6 rounded-[16px] transition-all duration-200 shadow-[0_4px_15px_rgba(0,123,255,0.2)] text-[16px] mt-4"
                    >
                        Log in
                    </button>
                </form>

                <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <span className="relative px-4 bg-white text-gray-400 text-xs font-medium uppercase tracking-wider">or</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-[14px] hover:bg-gray-50 transition-all shadow-sm">
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5 shadow-sm rounded-full" />
                        <span className="text-[14px] font-semibold text-gray-700">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-[14px] hover:bg-gray-50 transition-all shadow-sm">
                        <div className="w-5 h-5 bg-gray-100 rounded-sm flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400 fill-current">
                                <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v14z" />
                            </svg>
                        </div>
                        <span className="text-[14px] font-semibold text-gray-700">Phone number</span>
                    </button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-[14px] text-gray-500 font-medium">
                        Don't have a itcyanbu account? <button type="button" className="text-blue-600 font-bold hover:underline">Sign up now</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
