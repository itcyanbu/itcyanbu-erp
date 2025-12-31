import React from 'react';
import {
    Users as UsersIcon, Briefcase, Heart,
    GraduationCap, Calendar, Clock,
    FileText, TrendingUp, DollarSign
} from 'lucide-react';

const HR = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-1">Human Resources</h1>
                <nav className="text-sm text-slate-500">
                    <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                    <span className="mx-2">/</span>
                    <span>HR Module</span>
                </nav>
            </div>

            {/* HR Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Employees', value: '12', icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Open Positions', value: '3', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Leaves Today', value: '1', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Attendance %', value: '92%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-400">OVERVIEW</span>
                        </div>
                        <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                        <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* HR Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-not-allowed">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <UsersIcon size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Employee Directory</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">Manage all employee records, documents, and professional profiles.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-not-allowed">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <Clock size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Attendance & Time</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">Track check-ins, work hours, and late marks automatically.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-not-allowed">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <Heart size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Leave Management</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">Electronic leave applications, approvals, and balance tracking.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-not-allowed">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                        <DollarSign size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Payroll & Salaries</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">Generate payslips, manage deductions, and track salary history.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-not-allowed">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Recruitment</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">Post jobs, manage candidate pipelines, and schedule interviews.</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-not-allowed">
                    <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4">
                        <FileText size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Performance Reviews</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">Conduct appraisals, set OKRs, and track employee growth.</p>
                </div>
            </div>

            <div className="mt-8 bg-blue-600 text-white p-8 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black mb-2">Full HRMS Dynamic Module</h2>
                    <p className="text-blue-100 max-w-lg">The integrated HRMS provides a comprehensive suite for managing your workforce within the CRM ecosystem.</p>
                </div>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                    Access Full HRMS
                </button>
            </div>
        </div>
    );
};

export default HR;
