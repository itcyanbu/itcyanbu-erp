import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutGrid,
    Box,
    Users,
    MessageSquare,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, isActive, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
            ? 'bg-[#A7D129] text-[#112D4E] font-bold shadow-md'
            : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </button>
);

const SoftwareLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: LayoutGrid, label: 'Apps Dashboard', path: '/software' },
        { icon: Box, label: 'ERP System', path: '/software/erp' },
        { icon: Users, label: 'CRM Dashboard', path: '/crm' },
        { icon: MessageSquare, label: 'HRMS', path: '/software/hrms' },
        { icon: BarChart3, label: 'Analytics', path: '/software/analytics' },
        { icon: Settings, label: 'Settings', path: '/software/settings' },
    ];

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar - Dark Blue Theme */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 0 }}
                className={`bg-[#112D4E] text-white flex-shrink-0 relative overflow-hidden h-full z-20 shadow-2xl`}
            >
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <img src="/logo.png" alt="ITC Logo" className="h-8 w-auto bg-white rounded p-1" />
                    <div className="font-bold text-lg tracking-tight">
                        Software<span className="text-[#A7D129]">Portal</span>
                    </div>
                </div>

                <div className="p-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                            isActive={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                        />
                    ))}
                </div>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-6 px-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-[#A7D129]">
                            {/* Avatar Placeholder */}
                            <img src={`https://ui-avatars.com/api/?name=User&background=random`} alt="User" className="rounded-full" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">Demo User</p>
                            <p className="text-xs text-slate-400 truncate">ITC-8821</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                    >
                        <LogOut size={16} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-slate-800">
                            {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6 md:p-8 bg-slate-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SoftwareLayout;
