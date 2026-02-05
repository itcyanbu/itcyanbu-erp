import { Search, Bell, HelpCircle, Languages, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { user, signOut } = useAuth();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        console.log('Header: Toggling language to', newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="h-16 bg-white border-b border-ghl-border flex items-center justify-between px-6 shrink-0 relative">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('common.search') + "..."}
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 bg-gray-100 rounded-md border-transparent focus:border-ghl-blue focus:bg-white focus:ring-0 text-sm transition-all text-left rtl:text-right"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleLanguage}
                    id="language-switcher-header"
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md"
                >
                    <Languages size={14} />
                    {i18n.language === 'ar' ? 'English' : 'العربية'}
                </button>
                <a
                    href="https://glow-guide-help-hub.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                    title={t('common.help')}
                >
                    <HelpCircle size={20} />
                </a>
                <button className="relative text-gray-500 hover:text-gray-700">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                    {user ? (
                        <button
                            onClick={signOut}
                            className="text-gray-500 hover:text-red-600 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                            Sign In
                        </Link>
                    )}
                </div>

                <div className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden shadow-sm flex items-center justify-center bg-gray-50">
                    <img src="/itc-logo.jpg" alt="ITC Logo" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
    );
};

export default Header;
