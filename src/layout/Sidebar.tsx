import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Rocket,
    MessageSquare,
    CalendarDays,
    Users,
    Briefcase,
    CreditCard,
    Workflow,
    Globe,
    Star,
    Settings,
    ChevronLeft,
    Search,
    Zap,
    Send,
    Award,
    BarChart3,
    LayoutGrid,
    Wrench,
    ShieldAlert,
    Video,
    Facebook,
    Brain,
    ShieldCheck,
    Edit2,
    Save,
    X,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

interface SidebarProps {
    onLogout?: () => void;
    activeModule?: string;
    onModuleChange?: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule = 'Contacts', onModuleChange }) => {
    // Profile State
    const [profileName, setProfileName] = useState(() => localStorage.getItem('ghl_profile_name') || 'Ai & IT Solutions');
    const [profileLogo, setProfileLogo] = useState(() => localStorage.getItem('ghl_profile_logo') || '');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [tempName, setTempName] = useState(profileName);
    const [tempLogo, setTempLogo] = useState(profileLogo);

    // Menu State
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

    // Persist Profile Changes
    useEffect(() => {
        localStorage.setItem('ghl_profile_name', profileName);
        localStorage.setItem('ghl_profile_logo', profileLogo);
    }, [profileName, profileLogo]);

    const handleSaveProfile = () => {
        setProfileName(tempName);
        setProfileLogo(tempLogo);
        setIsEditingProfile(false);
    };

    const handleCancelEdit = () => {
        setTempName(profileName);
        setTempLogo(profileLogo);
        setIsEditingProfile(false);
    };

    const toggleMenu = (label: string) => {
        setExpandedMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const mainMenuItems = [
        { icon: Rocket, label: 'Launchpad' },
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: MessageSquare, label: 'Conversations' },
        { icon: CalendarDays, label: 'Calendars' },
        { icon: Users, label: 'Contacts' },
        { icon: Briefcase, label: 'Opportunities' },
        { icon: CreditCard, label: 'Payments' },
    ];

    const secondaryMenuItems = [
        { icon: Send, label: 'Marketing' },
        { icon: Workflow, label: 'Automation' },
        { icon: Brain, label: 'Ai Solutions' },
        { icon: ShieldCheck, label: 'Cyber Security' },
        { icon: Globe, label: 'Sites' },
        { icon: Award, label: 'Memberships' },
        { icon: Star, label: 'Reputation' },
        { icon: BarChart3, label: 'Reporting' },
        { icon: LayoutGrid, label: 'App Marketplace' },
        { icon: Wrench, label: 'Affiliate Portal' },
        { icon: ShieldAlert, label: 'Agency Analytics' },
        { icon: Video, label: 'Media library' },
        { icon: Facebook, label: 'Facebook Group' },
    ];

    return (
        <div className="w-64 h-screen bg-[#1F2937] text-gray-300 border-r border-gray-700 flex flex-col shrink-0 font-sans">
            {/* Header Section */}
            <div className="flex flex-col px-4 py-4 gap-3">
                {/* Agency Selector / Profile */}
                {isEditingProfile ? (
                    <div className="bg-gray-800 rounded-lg p-2 flex flex-col gap-2 border border-ghl-blue">
                        <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:border-ghl-blue outline-none"
                            placeholder="Agency Name"
                        />
                        <input
                            type="text"
                            value={tempLogo}
                            onChange={(e) => setTempLogo(e.target.value)}
                            className="bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:border-ghl-blue outline-none"
                            placeholder="Logo URL (optional)"
                        />
                        <div className="flex justify-end gap-2 mt-1">
                            <button onClick={handleCancelEdit} className="p-1 text-gray-400 hover:text-white">
                                <X size={16} />
                            </button>
                            <button onClick={handleSaveProfile} className="p-1 text-green-500 hover:text-green-400">
                                <Save size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between bg-gray-800 rounded-lg p-2 cursor-pointer hover:bg-gray-700 transition group relative">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0 overflow-hidden">
                                {profileLogo ? (
                                    <img src={profileLogo} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <Users size={16} className="text-gray-300" />
                                )}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-white truncate">{profileName}</span>
                            </div>

                        </div>
                        <div className="flex flex-col gap-0.5">
                            <ChevronLeft size={10} className="rotate-90 text-gray-500" />
                            <ChevronLeft size={10} className="-rotate-90 text-gray-500" />
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => {
                                setTempName(profileName);
                                setTempLogo(profileLogo);
                                setIsEditingProfile(true);
                            }}
                            className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded-full text-gray-300 hover:text-white hover:bg-gray-600"
                            title="Edit Profile"
                        >
                            <Edit2 size={12} />
                        </button>
                    </div>
                )}

                {/* Search Bar */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray-800 text-sm text-gray-300 rounded-md py-1.5 pl-8 pr-10 focus:outline-none focus:ring-1 focus:ring-ghl-blue placeholder-gray-500"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <span className="bg-gray-700 text-gray-400 text-[10px] px-1.5 py-0.5 rounded border border-gray-600">⌘ K</span>
                        </div>
                    </div>
                    <button className="p-1.5 bg-green-500/10 text-green-500 rounded-md hover:bg-green-500/20 transition-colors">
                        <Zap size={16} fill="currentColor" />
                    </button>
                </div>
            </div>

            {/* Scrollable Menu Items */}
            <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">

                {/* Main Section */}
                {mainMenuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onModuleChange?.(item.label)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all w-full text-left ${activeModule === item.label
                            ? 'bg-ghl-blue text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                    >
                        <item.icon size={20} className={activeModule === item.label ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'} />
                        <span>{item.label}</span>
                    </button>
                ))}

                {/* Divider */}
                <div className="my-2 border-t border-gray-700/50 mx-2"></div>

                {/* Secondary Section */}
                {secondaryMenuItems.map((item, index) => {
                    const hasChildren = 'children' in item && (item as any).children;
                    const isExpanded = expandedMenus[item.label];
                    const isActive = activeModule === item.label || (hasChildren && (item as any).children.some((child: any) => child.label === activeModule));

                    if (hasChildren) {
                        return (
                            <div key={`sec-${index}`}>
                                <button
                                    onClick={() => toggleMenu(item.label)}
                                    className={`group flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all w-full text-left ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'} />
                                        <span>{item.label}</span>
                                    </div>
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>

                                {isExpanded && (
                                    <div className="ml-9 mt-1 space-y-1 border-l border-gray-700 pl-2">
                                        {(item as any).children.map((child: any, cIndex: number) => (
                                            <button
                                                key={`child-${index}-${cIndex}`}
                                                onClick={() => onModuleChange?.(child.label)}
                                                className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all w-full text-left ${activeModule === child.label
                                                    ? 'text-white bg-gray-800'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                    }`}
                                            >
                                                <child.icon size={16} />
                                                <span>{child.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <button
                            key={`sec-${index}`}
                            onClick={() => onModuleChange?.(item.label)}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all w-full text-left ${activeModule === item.label
                                ? 'bg-ghl-blue text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            <item.icon size={20} className={activeModule === item.label ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer Section */}
            <div className="p-2 border-t border-gray-700 bg-[#1F2937]">
                <button
                    onClick={() => onModuleChange?.('Settings')}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all w-full text-left ${activeModule === 'Settings'
                        ? 'bg-ghl-blue text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                >
                    <Settings size={20} className={activeModule === 'Settings' ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'} />
                    <span>Settings</span>
                </button>

                <div className="mt-2 flex justify-end px-2">
                    <button className="bg-emerald-500/20 text-emerald-500 rounded-full p-1 hover:bg-emerald-500/30 transition">
                        <ChevronLeft size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
