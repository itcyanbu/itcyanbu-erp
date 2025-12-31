import React from 'react';
import { Box, Users, MessageSquare, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AppCard = ({ title, description, icon: Icon, color, delay, onClick }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay * 0.1 }}
        onClick={onClick}
        className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
    >
        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-6 text-white shadow-md group-hover:scale-110 transition-transform`}>
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            {description}
        </p>
        <div className="flex items-center text-[#112D4E] font-semibold text-sm group-hover:gap-2 transition-all">
            Launch App <ArrowRight size={16} className="ml-1" />
        </div>
    </motion.div>
);

import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();
    const apps = [
        {
            title: 'ERP System',
            description: 'Manage comprehensive business resources, inventory, and supply chain operations.',
            icon: Box,
            color: 'bg-blue-500',
            path: '/software/erp'
        },
        {
            title: 'CRM Suite',
            description: 'Customer relationship management tools to boost sales and track leads.',
            icon: Users,
            color: 'bg-emerald-500',
            path: '/crm'
        },
        {
            title: 'HRMS Portal',
            description: 'Human resource management for payroll, attendance, and employee records.',
            icon: MessageSquare,
            color: 'bg-violet-500',
            path: '/software/hrms'
        },
        {
            title: 'E-Commerce',
            description: 'Online store management, order processing, and product cataloging.',
            icon: ShoppingCart,
            color: 'bg-orange-500',
            path: '/software/ecommerce'
        },
        {
            title: 'Analytics & Reports',
            description: 'Detailed insights and data visualization for informed decision making.',
            icon: BarChart3,
            color: 'bg-indigo-500',
            path: '/software/analytics'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#112D4E]">Welcome, Demo User</h1>
                <p className="text-slate-500 mt-2">Access your subscribed applications and manage your business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app, index) => (
                    <AppCard
                        key={index}
                        {...app}
                        delay={index}
                        onClick={() => navigate(app.path)}
                    />
                ))}

                {/* Add New App Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-slate-50 transition-colors h-full min-h-[250px]"
                >
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                        <span className="text-2xl font-light">+</span>
                    </div>
                    <h3 className="font-semibold text-slate-600">Add Module</h3>
                    <p className="text-xs text-slate-400 mt-1">Browse available software</p>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDashboard;
