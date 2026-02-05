import { Search, Languages } from 'lucide-react';
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
                {/* Language Switcher - Keeping it accessible */}
                <button
                    onClick={toggleLanguage}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    title={i18n.language === 'ar' ? 'Switch to English' : 'Switch to Arabic'}
                >
                    <Languages size={20} />
                </button>

                {/* HighLevel Style Icons - Removed per user request */}
                {/* Icons are handled in page-specific headers (e.g. ContactsPage) */}
            </div>
        </header>
    );
};

export default Header;
