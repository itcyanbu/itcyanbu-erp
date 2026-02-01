import React, { useState } from 'react';
import {
    Rocket,
    BarChart3,
    MessageSquare,
    Calendar,
    Users,
    Filter,
    CreditCard,
    LayoutGrid,
    Zap,
    Globe,
    GraduationCap,
    Star,
    FileText,
    Box,
    Award,
    LineChart,
    Image,
    Facebook,
    Play,
    Settings,
    Brain,
} from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
    activeModule?: string;
    onModuleChange?: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule = 'Contacts', onModuleChange }) => {
    const { t, i18n } = useTranslation();

    // Profile State
    const [profileName] = useState(() => localStorage.getItem('ghl_profile_name') || 'Ai & IT Solutions');
    const [profileLogo] = useState('/itc-logo.jpg');

    const menuItems = [
        { icon: Rocket, label: 'Launchpad', id: 'Launchpad', tKey: 'sidebar.launchpad' },
        { icon: BarChart3, label: 'Dashboard', id: 'Dashboard', tKey: 'sidebar.dashboard' },
        { icon: MessageSquare, label: 'Conversations', id: 'Conversations', tKey: 'sidebar.conversations' },
        { icon: Calendar, label: 'Calendars', id: 'Calendars', tKey: 'sidebar.calendars' },
        { icon: Users, label: 'Contacts', id: 'Contacts', tKey: 'sidebar.contacts' },
        { icon: Filter, label: 'Opportunities', id: 'Opportunities', tKey: 'sidebar.opportunities' },
        { icon: CreditCard, label: 'Payments', id: 'Payments', tKey: 'sidebar.payments' },
        { icon: LayoutGrid, label: 'Marketing', id: 'Marketing', tKey: 'sidebar.marketing' },
        { icon: Zap, label: 'Automation', id: 'Automation', tKey: 'sidebar.automation' },
        { icon: Globe, label: 'Sites', id: 'Sites', tKey: 'sidebar.sites' },
        { icon: GraduationCap, label: 'Memberships', id: 'Memberships', tKey: 'sidebar.memberships' },
        { icon: Star, label: 'Reputation', id: 'Reputation', tKey: 'sidebar.reputation' },
        { icon: FileText, label: 'Reporting', id: 'Reporting', tKey: 'sidebar.reporting' },
        { icon: Box, label: 'App Marketplace', id: 'App Marketplace', tKey: 'sidebar.marketplace' },
        { icon: Award, label: 'Affiliate Portal', id: 'Affiliate Portal', tKey: 'sidebar.affiliate' },
        { icon: LineChart, label: 'Agency Analytics', id: 'Agency Analytics', tKey: 'sidebar.agency_analytics' },
        { icon: Image, label: 'Media Library', id: 'Media Library', tKey: 'sidebar.media_library' },
        { icon: Facebook, label: 'Facebook Group', id: 'Facebook Group', tKey: 'sidebar.facebook_group' },
        { icon: Brain, label: 'AI Solutions', id: 'AI Solutions', tKey: 'sidebar.ai_solutions' }
    ];

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="w-20 lg:w-64 h-full bg-[#1e293b] flex flex-col shrink-0 border-r border-[#334155] transition-all duration-300 relative">

            {/* Top Profile Section */}
            <div className="p-4 border-b border-[#334155]">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={toggleLanguage}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 rounded font-bold transition-all shadow-sm"
                    >
                        {i18n.language === 'ar' ? 'English' : 'العربية'}
                    </button>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">{i18n.language}</span>
                </div>

                <div className="flex items-center gap-3 relative group">
                    <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden shadow-sm flex items-center justify-center bg-slate-800">
                        <img src={profileLogo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden lg:block overflow-hidden flex-1">
                        <h2 className="text-white font-bold text-sm truncate">{profileName}</h2>
                        <p className="text-[#94a3b8] text-xs font-medium">Agency Account</p>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto px-2 py-4 custom-scrollbar">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onModuleChange?.(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                                activeModule === item.id
                                    ? "bg-blue-600/10 text-blue-400 font-semibold border-l-4 border-blue-600 rtl:border-l-0 rtl:border-r-4"
                                    : "text-[#94a3b8] hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon
                                size={22}
                                className={clsx(
                                    "transition-transform duration-200 group-hover:scale-110 shrink-0",
                                    activeModule === item.id ? "text-blue-500" : "text-[#64748b]"
                                )}
                            />
                            <span className="hidden lg:block text-sm truncate font-medium">
                                {t(item.tKey)}
                            </span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Bottom Footer Section */}
            <div className="p-4 border-t border-[#334155]">
                <button
                    onClick={() => onModuleChange?.('Settings')}
                    className={clsx(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#94a3b8] hover:bg-slate-800 hover:text-white transition-all group",
                        activeModule === 'Settings' && "bg-blue-600/10 text-blue-400"
                    )}
                >
                    <Settings size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                    <span className="hidden lg:block text-sm font-medium">{t('common.settings')}</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
