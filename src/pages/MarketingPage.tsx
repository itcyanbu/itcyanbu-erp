import { useState } from 'react';
import {
    LayoutGrid,
    Mail,
    FileText,
    Link,
    Users,
    Plus,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    Search,
    Filter
} from 'lucide-react';

const MarketingPage = () => {
    const [activeTab, setActiveTab] = useState('Social Planner');

    const tabs = [
        { id: 'Social Planner', label: 'Social Planner', icon: LayoutGrid },
        { id: 'Emails', label: 'Emails', icon: Mail },
        { id: 'Templates', label: 'Templates', icon: FileText },
        { id: 'Trigger Links', label: 'Trigger Links', icon: Link },
        { id: 'Affiliate Manager', label: 'Affiliate Manager', icon: Users },
    ];

    const socialAccounts = [
        { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
        { name: 'Google Business Profile', icon: LayoutGrid, color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50' },
        { name: 'X (Twitter)', icon: Twitter, color: 'text-black', bg: 'bg-gray-50' },
        { name: 'TikTok', icon: LayoutGrid, color: 'text-black', bg: 'bg-gray-50' }, // Lucide doesn't have TikTok yet
        { name: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
                        <p className="text-gray-500 mt-1">Manage your social media, emails, and affiliate campaigns.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            Create New
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === tab.id
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

                {activeTab === 'Social Planner' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
                                <span className="text-green-500 text-sm font-medium mt-1 inline-flex items-center gap-1">↑ 12% vs last month</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Scheduled</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">15</p>
                                <span className="text-blue-500 text-sm font-medium mt-1 inline-flex items-center gap-1">Next post in 2h</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Failed</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
                                <span className="text-red-500 text-sm font-medium mt-1 inline-flex items-center gap-1">Needs attention</span>
                            </div>
                        </div>

                        {/* Recent Posts & Connect Accounts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Connect Accounts */}
                            <div className="lg:col-span-1 space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900">Connect Accounts</h2>
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                                    {socialAccounts.map((account) => (
                                        <div key={account.name} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${account.bg} ${account.color}`}>
                                                    <account.icon size={20} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{account.name}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                <Plus size={16} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Posts / Calendar Placeholder */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Recent & Scheduled Posts</h2>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                            <Search size={18} />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                            <Filter size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <LayoutGrid size={32} />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">No scheduled posts</h3>
                                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">Get started by connecting your social accounts and scheduling your first post.</p>
                                    <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                        Create Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Emails' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Email Marketing</h2>
                        <p className="text-gray-500 mt-2">Create and manage your email campaigns, templates, and automation.</p>
                        <button className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Create First Campaign
                        </button>
                    </div>
                )}

                {activeTab === 'Templates' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Message Templates</h2>
                            <div className="flex gap-3">
                                <input type="text" placeholder="Search templates..." className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">Add Template</button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Name</th>
                                        <th className="px-6 py-3 font-medium">Type</th>
                                        <th className="px-6 py-3 font-medium">Last Updated</th>
                                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">Welcome Email #{i}</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">Email</span></td>
                                            <td className="px-6 py-4">Oct 24, 2024</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-blue-600 font-medium">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Trigger Links' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Trigger Links</h2>
                                <p className="text-sm text-gray-500">Track clicks and fire automations when links are clicked.</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Link</button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Link size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No trigger links yet</h3>
                            <p className="text-gray-500 mt-2">Create a trigger link to start tracking user engagement.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Affiliate Manager' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[
                                { label: 'Affiliates', value: '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                                { label: 'Leads', value: '0', icon: Filter, color: 'text-purple-600', bg: 'bg-purple-100' },
                                { label: 'Sales', value: '$0.00', icon: LayoutGrid, color: 'text-green-600', bg: 'bg-green-100' },
                                { label: 'Commissions', value: '$0.00', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketingPage;
