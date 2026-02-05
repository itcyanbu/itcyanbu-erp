import { Search, Languages, Bell, HelpCircle, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { user, signOut } = useAuth();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    const getInitials = (email: string) => {
        return email ? email.substring(0, 2).toUpperCase() : 'U';
    };

    const displayName = user?.email?.split('@')[0] || 'User';

    return (
        <header className="h-16 bg-white border-b border-ghl-border flex items-center justify-between px-6 shrink-0 relative z-20">
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
                {/* Language Switcher */}
                <button
                    onClick={toggleLanguage}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    title={i18n.language === 'ar' ? 'Switch to English' : 'Switch to Arabic'}
                >
                    <Languages size={20} />
                </button>

                {/* Help & Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                    <HelpCircle size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-gray-200 mx-1"></div>

                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <div className="text-right block">
                        <div className="text-sm font-bold text-gray-900 leading-none mb-1">{displayName}</div>
                        <button
                            onClick={async () => {
                                await signOut();
                                window.location.href = '/login';
                            }}
                            className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 justify-end w-full"
                        >
                            <LogOut size={12} />
                            {t('common.sign_out') || 'Sign Out'}
                        </button>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold shadow-sm">
                        {getInitials(user?.email || '')}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
