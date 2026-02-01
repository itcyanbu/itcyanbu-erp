import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    DollarSign,
    Image,
    Megaphone,
    Search,
    Filter,
    Download,
    Plus,
    MoreHorizontal,
    TrendingUp,
    Link,
    Copy,
    CheckCircle2
} from 'lucide-react';

const AffiliatePortalPage = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const tabs = [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'Affiliates', label: 'Affiliates', icon: Users },
        { id: 'Commissions', label: 'Commissions', icon: DollarSign },
        { id: 'Media', label: 'Media', icon: Image },
        { id: 'Campaigns', label: 'Campaigns', icon: Megaphone },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Affiliate Portal</h1>
                        <p className="text-gray-500 mt-1">Manage your affiliate program, track commissions, and grow your revenue.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            Add Affiliate
                        </button>
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

                {activeTab === 'Dashboard' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">$45,230</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <TrendingUp size={14} className="mr-1" /> 15.2%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Active Affiliates</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">124</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <TrendingUp size={14} className="mr-1" /> 8%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Commissions Paid</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">$12,450</p>
                                    <span className="flex items-center text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded-full">
                                        Last 30 days
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Top Affiliates */}
                            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Top Performing Affiliates</h2>
                                    <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                                                    #{i}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Affiliate Name {i}</p>
                                                    <p className="text-sm text-gray-500">{150 - i * 10} Sales</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-900">${(5000 - i * 500).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Signups */}
                            <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900">Recent Signups</h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="px-6 py-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                                                AS
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">New Affiliate #{i}</p>
                                                <p className="text-xs text-gray-500">Joined 2 hours ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Affiliates' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">All Affiliates</h2>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input type="text" placeholder="Search affiliates..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                                    <Filter size={16} /> Filter
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                                    <Download size={16} /> Export
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Name</th>
                                        <th className="px-6 py-3 font-medium">Email</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium">Commissions</th>
                                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">John Doe {i}</td>
                                            <td className="px-6 py-4">john.doe{i}@example.com</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">$1,2{i}0.00</td>
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

                {activeTab === 'Commissions' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <DollarSign size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Commission Tracking</h2>
                        <p className="text-gray-500 mt-2">View and manage pending and paid commissions.</p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                                View Payouts
                            </button>
                            <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                                Approve Commissions
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Media' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Media Assets</h2>
                                <p className="text-sm text-gray-500">Provide banners and images for your affiliates to use.</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Upload Asset</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="group relative aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-300 transition-colors">
                                    <Image size={32} className="text-gray-300 group-hover:text-blue-400" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                                        <button className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30 backdrop-blur-sm">
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'Campaigns' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg h-fit">
                                        <Megaphone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Default Campaign</h3>
                                        <p className="text-sm text-gray-500 mt-1">Global settings for your main affiliate program.</p>
                                        <div className="flex items-center gap-2 mt-4 p-2 bg-gray-50 rounded border border-gray-200">
                                            <Link size={14} className="text-gray-400" />
                                            <code className="text-xs text-gray-600 flex-1">https://yourdomain.com?aff_id={'{affiliate_id}'}</code>
                                            <button className="text-blue-600 hover:text-blue-700"><Copy size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                                    <CheckCircle2 size={12} /> Active
                                </span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-6 text-sm">
                                <div>
                                    <span className="block text-gray-500 text-xs">Commission Type</span>
                                    <span className="font-medium text-gray-900">Percentage (30%)</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs">Cookie Life</span>
                                    <span className="font-medium text-gray-900">30 Days</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs">Payout Terms</span>
                                    <span className="font-medium text-gray-900">Net 30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AffiliatePortalPage;
