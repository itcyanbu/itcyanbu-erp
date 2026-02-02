import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { t, i18n } = useTranslation();
    const [view, setView] = useState<'login' | 'request' | 'success'>('login');
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('demo');
    const [reqData, setReqData] = useState({ name: '', email: '', business: '' });

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send data to a backend
        console.log('Account Request:', reqData);
        setView('success');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold transition-all border border-blue-100"
                    >
                        <Languages size={14} />
                        {i18n.language === 'ar' ? 'English' : 'العربية'}
                    </button>
                </div>

                {view === 'login' ? (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('login.signin')}</h1>
                            <p className="text-gray-500 text-sm">{t('login.to_account')}</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('login.email_label')}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('login.email_placeholder')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('login.password_label')}
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t('login.password_placeholder')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                {t('login.signin_button')}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                {t('login.demo_mode')}: <span className="font-semibold text-gray-700">demo@example.com</span> / <span className="font-semibold text-gray-700">demo</span>
                            </p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span>{t('login.no_account')} </span>
                                <button
                                    onClick={() => setView('request')}
                                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                                >
                                    {t('login.contact_admin')}
                                </button>
                            </div>
                        </div>
                    </>
                ) : view === 'request' ? (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('login.request_title')}</h1>
                        </div>

                        <form onSubmit={handleRequest} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.full_name')}</label>
                                <input
                                    required
                                    type="text"
                                    value={reqData.name}
                                    onChange={(e) => setReqData({ ...reqData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.email_label')}</label>
                                <input
                                    required
                                    type="email"
                                    value={reqData.email}
                                    onChange={(e) => setReqData({ ...reqData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.business_name')}</label>
                                <input
                                    required
                                    type="text"
                                    value={reqData.business}
                                    onChange={(e) => setReqData({ ...reqData, business: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                            >
                                {t('login.submit_request')}
                            </button>

                            <button
                                type="button"
                                onClick={() => setView('login')}
                                className="w-full text-sm text-blue-600 hover:underline"
                            >
                                {t('login.back_to_login')}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-gray-900 font-medium mb-4">{t('login.request_received')}</p>
                        <button
                            onClick={() => setView('login')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            {t('login.back_to_login')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
