import React from 'react';
import {
    Ticket, FileText, MessageSquare, List,
    UserPlus, Users, UserCheck,
    CheckSquare, Folder, ClipboardList,
    Map, Target, Navigation, BarChart3,
    Calendar, History, UserPen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
    const categories = [
        {
            title: 'TICKETS',
            color: 'border-emerald-400',
            links: [
                { icon: Ticket, label: 'Create Ticket', path: '/crm/tickets/add', bgColor: 'bg-emerald-50' },
                { icon: Folder, label: 'View Tickets', path: '/crm/tickets/summary', bgColor: 'bg-emerald-50' },
            ]
        },
        {
            title: 'GENERAL',
            color: 'border-indigo-400',
            links: [
                { icon: UserPen, label: 'Create Daily Remark', path: '/crm/general/remark-add', bgColor: 'bg-indigo-50' },
                { icon: History, label: 'View Daily Remark', path: '/crm/general/remark-view', bgColor: 'bg-indigo-50' },
            ]
        },
        {
            title: 'LEADS',
            color: 'border-blue-400',
            links: [
                { icon: UserPlus, label: 'Create New Lead', path: '/crm/leads/list', bgColor: 'bg-blue-50' },
                { icon: List, label: 'View Leads', path: '/crm/leads/list', bgColor: 'bg-blue-50' },
                { icon: UserCheck, label: 'Lead Assigned To Me', path: '/crm/leads/assigned', bgColor: 'bg-blue-50' },
            ]
        },
        {
            title: 'TASKS',
            color: 'border-pink-400',
            links: [
                { icon: CheckSquare, label: 'Create & Assign Tasks', path: '/crm/tasks/add', bgColor: 'bg-pink-50' },
                { icon: Folder, label: 'Projects', path: '/crm/tasks/projects', bgColor: 'bg-pink-50' },
                { icon: ClipboardList, label: 'View Assigned Tasks', path: '/crm/tasks/summary', bgColor: 'bg-pink-50' },
            ]
        },
        {
            title: 'SALES',
            color: 'border-green-500',
            links: [
                { icon: Map, label: 'Map View Sales Team', path: '/crm/sales/map', bgColor: 'bg-green-50' },
                { icon: Target, label: 'Sales Target & Performance', path: '/crm/sales/performance', bgColor: 'bg-green-50' },
                { icon: Navigation, label: 'Track Sales Team', path: '/crm/sales/track', bgColor: 'bg-green-50' },
                { icon: BarChart3, label: 'View Sales', path: '/crm/sales/followups', bgColor: 'bg-green-50' },
            ]
        },
        {
            title: 'HR',
            color: 'border-orange-400',
            links: [
                { icon: Calendar, label: 'HR Attendance Summary', path: '/crm/hr/attendance', bgColor: 'bg-orange-50' },
                { icon: History, label: 'HR Login History', path: '/crm/hr/login-history', bgColor: 'bg-orange-50' },
                { icon: UserPen, label: 'Manual Attendance', path: '/crm/hr/manual', bgColor: 'bg-orange-50' },
            ]
        }
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <div className="mb-6">
                <button className="bg-[#112D4E] text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md">
                    QuickLinks
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {categories.map((category, idx) => (
                    <div key={idx} className={`bg-white rounded-xl shadow-sm border-l-4 ${category.color} p-6 h-full transition-transform hover:shadow-md`}>
                        <h2 className="text-gray-700 font-bold text-lg mb-6 tracking-wide">{category.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {category.links.map((link, lIdx) => (
                                <Link
                                    key={lIdx}
                                    to={link.path}
                                    className={`${link.bgColor} group flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md h-16`}
                                >
                                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                                        <link.icon size={18} className="text-gray-700" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 leading-tight">{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickLinks;
