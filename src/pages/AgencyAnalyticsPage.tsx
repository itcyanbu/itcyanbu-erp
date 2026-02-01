import { useState } from 'react';
import {
    TrendingUp,
    Users,
    Globe,
    Search,
    Filter,
    DollarSign,
    ArrowUp,
    ArrowDown,
    Activity,
    MoreHorizontal
} from 'lucide-react';

const AgencyAnalyticsPage = () => {
    const [activeTab, setActiveTab] = useState('Financials');

    const tabs = [
        { id: 'Financials', label: 'Financials', icon: DollarSign },
        { id: 'Sub-accounts', label: 'Sub-accounts', icon: Users },
        { id: 'SaaS Mode', label: 'SaaS Mode', icon: Globe },
        { id: 'Leaderboard', label: 'Leaderboard', icon: Activity },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Agency Analytics</h1>
                        <p className="text-gray-500 mt-1">Monitor your agency's health, revenue, and sub-account performance.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">

                {activeTab === 'Financials' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Monthly Recurring Revenue</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">$24,500</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <ArrowUp size={14} className="mr-1" /> 12.5%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Net Revenue (YTD)</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">$285k</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <ArrowUp size={14} className="mr-1" /> 8.2%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Active Sub-accounts</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">145</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <TrendingUp size={14} className="mr-1" /> 5
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Churn Rate</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">1.2%</p>
                                    <span className="flex items-center text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
                                        <ArrowDown size={14} className="mr-1" /> 0.5%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions / Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Recent Revenue</h2>
                                    <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                                    <DollarSign size={16} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">SaaS Subscription - Monthly</p>
                                                    <p className="text-xs text-gray-500">Client Account #{i}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">+$297.00</p>
                                                <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Subscription Health</h2>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Active (70%)</span>
                                    </div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div className="bg-yellow-500 h-2 rounded-full w-[20%]"></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Trialing (20%)</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div className="bg-red-500 h-2 rounded-full w-[10%]"></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Past Due (10%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Sub-accounts' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Sub-account Performance</h2>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type="text" placeholder="Search accounts..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                                    <Filter size={16} /> Filter
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Account Name</th>
                                        <th className="px-6 py-3 font-medium">Plan</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium">Revenue (MTD)</th>
                                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">Client Business {i}</td>
                                            <td className="px-6 py-4">Pro Plan ($297/mo)</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">$297.00</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'SaaS Mode' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Globe size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">SaaS Mode Configurator</h2>
                        <p className="text-gray-500 mt-2">Manage your pricing plans, rebilling settings, and white-label options.</p>
                        <button className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Manage SaaS Settings
                        </button>
                    </div>
                )}

                {activeTab === 'Leaderboard' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Activity size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Agency Leaderboard</h2>
                        <p className="text-gray-500 mt-2">See how your agency compares to others in similar niches.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgencyAnalyticsPage;
