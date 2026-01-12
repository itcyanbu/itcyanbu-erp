import React from 'react';
import {
    LayoutDashboard,
    Rocket,
    MessageSquare,
    CalendarDays,
    Users,
    Briefcase,
    CreditCard,
    Megaphone,
    Workflow,
    Globe,
    Star,
    Settings,
    ChevronLeft
} from 'lucide-react';

interface SidebarProps {
    onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
    const menuItems = [
        { icon: Rocket, label: 'Launchpad' },
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: MessageSquare, label: 'Conversations' },
        { icon: CalendarDays, label: 'Calendars' },
        { icon: Users, label: 'Contacts', active: true },
        { icon: Briefcase, label: 'Opportunities' },
        { icon: CreditCard, label: 'Payments' },
        { icon: Megaphone, label: 'Marketing' },
        { icon: Workflow, label: 'Automation' },
        { icon: Globe, label: 'Sites' },
        { icon: Star, label: 'Reputation' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-ghl-border flex flex-col shrink-0">
            <div className="h-16 flex items-center justify-center border-b border-ghl-border">
                {/* Placeholder Logo */}
                <div className="text-xl font-bold text-ghl-blue">Agency</div>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-1 px-3">
                            <a
                                href="#"
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${item.active
                                    ? 'bg-ghl-blue/10 text-ghl-blue'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-ghl-border space-y-4">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm">
                    <ChevronLeft size={16} />
                    Collapse
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
