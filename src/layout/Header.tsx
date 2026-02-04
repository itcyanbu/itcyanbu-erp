import { Search, Bell, HelpCircle, Languages, Phone, Zap, Megaphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();

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
                <button
                    onClick={toggleLanguage}
                    id="language-switcher-header"
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md mr-1"
                >
                    <Languages size={14} />
                    {i18n.language === 'ar' ? 'English' : 'العربية'}
                </button>

                {/* Action Icons Group */}
                <div className="flex items-center gap-3 mr-1">
                    <button className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors shadow-sm">
                        <Phone size={24} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-sm">
                        <Zap size={24} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-[#5f8b8b] flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
                        <Megaphone size={24} />
                    </button>
                    <button className="relative w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-sm">
                        <Bell size={24} />
                        <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-white border-2 border-orange-500 rounded-full shadow-sm"></span>
                    </button>
                </div>

                <a
                    href="https://glow-guide-help-hub.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-50 transition-all mr-1"
                    title={t('common.help')}
                >
                    <HelpCircle size={28} />
                </a>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#b2b2ff] flex items-center justify-center text-white font-bold text-xl shadow-sm cursor-pointer border-2 border-[#d8d8ff] hover:opacity-90 transition-opacity ml-1">
                    MM
                </div>
            </div>
        </header>
    );
};

export default Header;
