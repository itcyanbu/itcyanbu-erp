import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, FolderOpen, Users, Ticket, CheckSquare, TrendingUp,
    FileText, ShoppingCart, Settings, LogOut, ChevronLeft, Search, User,
    Mail, Receipt, UserPlus, Package2, BarChart4, Box, ClipboardList,
    Folder, UserCheck, FileBarChart, ChevronDown, ChevronRight, Settings2, UserCog,
    Share2, MapPin, Building, Tag, Package, Clock, DollarSign, Building2, Coins,
    AlertTriangle, RefreshCcw, Plus, UserCircle, Map, Lock, ShieldCheck,
    LayoutGrid, File, List, CirclePlus, Rocket, BarChart3, AreaChart, X
} from 'lucide-react';

const CRMLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [showNotepad, setShowNotepad] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: ShieldCheck, label: 'Quick Links', path: '/crm/quick-links' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/crm/dashboard' },
        {
            icon: Users,
            label: 'Leads',
            path: '/crm/leads',
            subItems: [
                { icon: Search, label: 'Search Leads', path: '/crm/leads/list' },
                { icon: Plus, label: 'Add New Lead', path: '/crm/leads/new' },
                { icon: FileBarChart, label: 'View Leads Report', path: '/crm/leads/view-report' },
                { icon: BarChart4, label: 'Monthly Report', path: '/crm/leads/monthly' },
                { icon: Lock, label: 'Blocked Leads', path: '/crm/leads/blocked-lead' },
                { icon: RefreshCcw, label: 'Transfer Leads', path: '/crm/leads/transfer-lead' },
                { icon: Folder, label: 'File Manager', path: '/crm/leads/files' },
                { icon: User, label: 'Lead Assign To Me', path: '/crm/leads/assigned' },
                { icon: LayoutGrid, label: 'Leads Summary', path: '/crm/leads/summary' },
            ]
        },
        {
            icon: FolderOpen,
            label: 'Master',
            path: '/crm/master',
            subItems: [
                { icon: MapPin, label: 'City', path: '/crm/master/city' },
                { icon: Map, label: 'Area', path: '/crm/master/area' },
                { icon: Building, label: 'Industry', path: '/crm/master/industry' },
                { icon: Share2, label: 'Sources', path: '/crm/master/sources' },
                { icon: Tag, label: 'Category', path: '/crm/master/category' },
                { icon: Package, label: 'Service Type', path: '/crm/master/service-type' },
                { icon: Clock, label: 'Follow up status', path: '/crm/master/follow-up-status' },
                { icon: DollarSign, label: 'Expense Type', path: '/crm/master/expense-type' },
                { icon: Building2, label: 'Department', path: '/crm/master/department' },
                { icon: UserCog, label: 'Designations', path: '/crm/master/designations' },
                { icon: BarChart4, label: 'Lead Status', path: '/crm/master/lead-status' },
                { icon: Coins, label: 'Currency', path: '/crm/master/currency' },
            ]
        },
        {
            icon: Ticket,
            label: 'Tickets',
            path: '/crm/tickets',
            subItems: [
                { icon: Ticket, label: 'Add Ticket', path: '/crm/tickets/add' },
                { icon: FileText, label: 'Ticket Summary', path: '/crm/tickets/summary' },
            ]
        },
        {
            icon: CheckSquare,
            label: 'Tasks',
            path: '/crm/tasks',
            subItems: [
                { icon: CheckSquare, label: 'Add Task', path: '/crm/tasks/add' },
                { icon: FileText, label: 'Task Summary', path: '/crm/tasks/summary' },
            ]
        },
        {
            icon: TrendingUp,
            label: 'Sales',
            path: '/crm/sales',
            subItems: [
                { icon: Map, label: 'Map-View Sales Team', path: '/crm/sales/map-view' },
                { icon: BarChart3, label: 'Sales Target And Performance', path: '/crm/sales/performance' },
                { icon: Rocket, label: 'Track Sales Team', path: '/crm/sales/track' },
                { icon: AreaChart, label: 'View Sales', path: '/crm/sales/view' },
            ]
        },
        {
            icon: FileText,
            label: 'Quotation',
            path: '/crm/quotations',
            subItems: [
                { icon: FileBarChart, label: 'Summary', path: '/crm/quotations/summary' },
                { icon: Plus, label: 'Create', path: '/crm/quotations/create' },
                { icon: Package2, label: 'Products', path: '/crm/quotations/products' },
            ]
        },
        {
            icon: ShoppingCart,
            label: 'Sale Order',
            path: '/crm/orders',
            subItems: [
                { icon: FileBarChart, label: 'Summary', path: '/crm/orders/summary' },
                { icon: Plus, label: 'Create', path: '/crm/orders/create' },
            ]
        },
        {
            icon: Receipt,
            label: 'Billing & Accounting',
            path: '/crm/billing',
            subItems: [
                { icon: FileBarChart, label: 'Summary', path: '/crm/billing/summary' },
                { icon: Plus, label: 'Create', path: '/crm/billing/create' },
            ]
        },
        { icon: Settings, label: 'General', path: '/crm/general' },
        { icon: UserCircle, label: 'Users', path: '/crm/users' },
    ];

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            navigate('/');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-[#1a3f6b] text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'} flex flex-col relative`}>
                {/* User Profile Section */}
                <div className="flex flex-col items-center py-6 px-4 bg-[#112D4E]">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-1 shadow-lg overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=fff&color=112D4E&size=128" alt="Admin" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="absolute -top-1 -right-4 bg-slate-500/50 hover:bg-slate-500 text-white rounded-full p-0.5 transition-colors"
                        >
                            <ChevronLeft size={14} className={collapsed ? 'rotate-180' : ''} />
                        </button>
                    </div>
                    {!collapsed && <span className="mt-2 text-sm font-bold text-white tracking-wide">Admin</span>}
                </div>

                {/* Collapse Button */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-20 -right-3 bg-[#A7D129] text-[#112D4E] rounded-full p-1 border-2 border-white shadow-lg z-30 hover:scale-110 transition-transform"
                >
                    <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                </button>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isOpen = openSubmenu === item.label;
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <div key={index} className="flex flex-col">
                                {hasSubItems ? (
                                    <button
                                        onClick={() => toggleSubmenu(item.label)}
                                        className={`flex items-center justify-between px-4 py-3 transition-all hover:bg-white/10 ${isActive ? 'bg-white/5 border-l-4 border-[#A7D129]' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={18} className={`${isActive ? 'text-[#A7D129]' : 'text-blue-200'}`} />
                                            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                                        </div>
                                        {!collapsed && (
                                            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                        )}
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 transition-all hover:bg-white/10 ${location.pathname === item.path ? 'bg-white/10 border-l-4 border-[#A7D129]' : ''}`}
                                    >
                                        <Icon size={18} className={`${location.pathname === item.path ? 'text-[#A7D129]' : 'text-blue-200'}`} />
                                        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                                    </Link>
                                )}

                                {/* Submenu Items */}
                                {!collapsed && hasSubItems && isOpen && (
                                    <div className="bg-white/95 backdrop-blur-sm py-1 shadow-inner border-y border-white/10">
                                        {item.subItems?.map((sub, sIdx) => {
                                            const SubIcon = sub.icon;
                                            const isSubActive = location.pathname === sub.path;
                                            return (
                                                <Link
                                                    key={sIdx}
                                                    to={sub.path}
                                                    className={`flex items-center gap-3 pl-12 pr-4 py-2.5 text-xs font-semibold transition-all ${isSubActive
                                                        ? 'bg-blue-50 text-[#1a3f6b] border-r-4 border-[#1a3f6b]'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#1a3f6b]'}`}
                                                >
                                                    <SubIcon size={14} className={`${isSubActive ? 'text-[#1a3f6b]' : 'text-slate-400'}`} />
                                                    <span>{sub.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-0 bg-[#F1F4F9]">
                {/* Module Icon Navigation Bar (Upper Page) */}
                <div className="flex-shrink-0 bg-[#112D4E] px-4 py-2 border-b border-white/5 flex items-center justify-center gap-6 overflow-x-auto whitespace-nowrap">
                    {[
                        { label: 'ERP CRM', icon: LayoutDashboard, color: 'bg-[#5CB85C]' },
                        { label: 'Sales Order', icon: ShoppingCart, color: 'bg-[#5BC0DE]' },
                        { label: 'Tickets', icon: Ticket, color: 'bg-[#D9534F]' },
                        { label: 'Quotations', icon: FileText, color: 'bg-[#F0AD4E]' },
                        { label: 'Orders', icon: Package, color: 'bg-[#337AB7]' },
                        { label: 'Billing', icon: Receipt, color: 'bg-[#5CB85C]' },
                    ].map((mod, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer transition-transform hover:scale-105">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${mod.color} group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all`}>
                                <mod.icon size={20} />
                            </div>
                            <span className="text-[10px] text-blue-100 font-bold tracking-tight uppercase group-hover:text-white">{mod.label}</span>
                        </div>
                    ))}
                </div>

                {/* Top Header */}
                <header className="flex-shrink-0 bg-[#112D4E] text-white px-6 py-2 flex items-center justify-between shadow-md z-20">
                    <div className="flex items-center flex-1 max-w-sm">
                        <div className="flex w-full overflow-hidden rounded bg-white mt-1">
                            <input
                                type="text"
                                placeholder="Search"
                                className="flex-1 bg-white px-4 py-1.5 text-slate-700 text-sm focus:outline-none"
                            />
                            <button className="bg-white px-3 py-1.5 border-l border-slate-200 hover:bg-slate-50 transition-colors">
                                <Search size={18} className="text-slate-500" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setShowNotepad(true)} className="text-blue-100 hover:text-white transition-colors" title="Notepad">
                            <FileText size={20} />
                        </button>
                        <div className="relative group">
                            <button className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors">
                                <User size={20} className="text-blue-100" />
                                <span className="text-sm font-medium">My Profile</span>
                                <ChevronDown size={14} className="text-blue-200" />
                            </button>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-[#1d426e] p-2 rounded hover:bg-red-500/20 transition-all text-blue-100"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>

            {/* Notepad Modal */}
            {showNotepad && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-[#112D4E] text-white px-6 py-4 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Your Notepad</h3>
                            <button onClick={() => setShowNotepad(false)} className="text-blue-100 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            <textarea
                                className="w-full h-80 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-700 bg-slate-50 font-medium"
                                placeholder="Write your notes here..."
                            ></textarea>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button className="bg-[#5CB85C] text-white px-8 py-2.5 rounded font-bold shadow-lg hover:bg-[#4cae4c] transition-all active:scale-95">Save Notepad</button>
                            <button onClick={() => setShowNotepad(false)} className="bg-[#D9534F] text-white px-8 py-2.5 rounded font-bold shadow-lg hover:bg-[#d43f3a] transition-all active:scale-95">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CRMLayout;
