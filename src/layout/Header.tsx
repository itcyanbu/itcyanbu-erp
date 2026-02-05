import { Search, Bell, HelpCircle, Languages, Phone, Zap, Megaphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

            <div className="flex items-center gap-3">
                {/* Language Switcher - Keeping it accessible */}
                <button
                    onClick={toggleLanguage}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    title={i18n.language === 'ar' ? 'Switch to English' : 'Switch to Arabic'}
                >
                    <Languages size={20} />
                </button>

                {/* HighLevel Style Icons */}
                <div className="flex items-center gap-3">
                    {/* Phone - Green */}
                    <button className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-sm">
                        <Phone size={20} />
                    </button>

                    {/* Quick Actions - Blue */}
                    <button className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm">
                        <Zap size={20} fill="currentColor" />
                    </button>

                    {/* Announcements - Teal/Slate */}
                    <button className="w-10 h-10 rounded-full bg-[#407B80] hover:bg-[#34666a] text-white flex items-center justify-center transition-colors shadow-sm">
                        <Megaphone size={20} />
                    </button>

                    {/* Notifications - Orange */}
                    <button className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow-sm relative">
                        <Bell size={20} />
                    </button>

                    {/* Help - Blue */}
                    <a
                        href="https://glow-guide-help-hub.lovable.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-sm"
                    >
                        <HelpCircle size={22} />
                    </a>

                    {/* Profile - Purple */}
                    <div className="relative group">
                        <button className="w-12 h-12 rounded-full bg-[#Cfa1ff] hover:bg-[#c490ff] text-white font-bold text-xl flex items-center justify-center transition-colors shadow-sm">
                            {user?.email ? user.email.substring(0, 2).toUpperCase() : 'MM'}
                        </button>

                        {/* Dropdown for Sign Out */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 hidden group-hover:block hover:block z-50">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-900">{user?.email || 'Guest User'}</p>
                            </div>
                            <button
                                onClick={signOut}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
