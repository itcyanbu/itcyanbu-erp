import { useState } from 'react';
import {
    Grid,
    Box,
    Download,
    Settings,
    Search,
    Star,
    CheckCircle2,
    Zap,
    MessageSquare,
    BarChart3,
    Globe
} from 'lucide-react';

const AppMarketplacePage = () => {
    const [activeTab, setActiveTab] = useState('Discover');

    const tabs = [
        { id: 'Discover', label: 'Discover', icon: Grid },
        { id: 'System Apps', label: 'System Apps', icon: Box },
        { id: 'My Apps', label: 'My Apps', icon: Download },
        { id: 'Manage Apps', label: 'Manage Apps', icon: Settings },
    ];

    const featuredApps = [
        { id: 1, name: 'MailChimp Integration', category: 'Marketing', rating: 4.8, installs: '10k+', icon: <Globe className="text-yellow-500" /> },
        { id: 2, name: 'Slack Notifications', category: 'Communication', rating: 4.9, installs: '25k+', icon: <MessageSquare className="text-purple-500" /> },
        { id: 3, name: 'Stripe Payments', category: 'Finance', rating: 5.0, installs: '50k+', icon: <Zap className="text-blue-500" /> },
        { id: 4, name: 'Google Sheets Sync', category: 'Productivity', rating: 4.7, installs: '15k+', icon: <BarChart3 className="text-green-500" /> },
    ];

    const categories = [
        'All Categories', 'Marketing', 'Sales', 'Communication', 'Productivity', 'Finance', 'Reporting'
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">App Marketplace</h1>
                        <p className="text-gray-500 mt-1">Discover and install apps to supercharge your business.</p>
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

                {activeTab === 'Discover' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
                            <div className="relative w-full md:w-[450px] group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for apps..."
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-[1.25rem] text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm hover:shadow-md placeholder:text-gray-400 font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 no-scrollbar">
                                {categories.map((cat, i) => (
                                    <button
                                        key={i}
                                        className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${i === 0
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                                : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200 shadow-sm'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Apps Banner */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
                            <div className="max-w-xl">
                                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">Featured App</span>
                                <h2 className="text-3xl font-bold mt-4 mb-2">Connect seamlessly with QuickBooks</h2>
                                <p className="text-blue-100 mb-6">Automate your accounting and keep your financial data in sync with our new native integration.</p>
                                <button className="px-6 py-2.5 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                                    Learn More
                                </button>
                            </div>
                            <div className="hidden md:flex gap-4">
                                {/* Abstract graphical elements or app mockups could go here */}
                                <div className="w-24 h-24 bg-white/10 rounded-xl backdrop-blur-sm transform rotate-12"></div>
                                <div className="w-24 h-24 bg-white/10 rounded-xl backdrop-blur-sm transform -rotate-6"></div>
                            </div>
                        </div>

                        {/* Popular Apps Grid */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Popular Apps</h2>
                                <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {featuredApps.map((app) => (
                                    <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-xl">
                                                {app.icon}
                                            </div>
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">{app.category}</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{app.name}</h3>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-current" /> {app.rating}</span>
                                            <span className="flex items-center gap-1"><Download size={12} /> {app.installs}</span>
                                        </div>
                                        <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                                            Install
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* New Releases */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">New Releases</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">New App Name #{i}</h4>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">A short description of what this app does and how it helps users.</p>
                                            <span className="inline-block mt-2 text-xs font-medium text-green-600">Free</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'System Apps' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-gray-900">System Applications</h2>
                            <p className="text-gray-500 mt-2">Core integrations built and maintained by our team.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {['Conversations', 'Calendars', 'Contacts', 'Opportunities', 'Payments'].map((app, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{app}</h4>
                                            <p className="text-xs text-gray-500">Core Feature</p>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium">Installed</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'My Apps' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Download size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">No Third-Party Apps Installed</h2>
                        <p className="text-gray-500 mt-2">You haven't installed any external applications yet.</p>
                        <button className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => setActiveTab('Discover')}>
                            Browse Marketplace
                        </button>
                    </div>
                )}

                {activeTab === 'Manage Apps' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Settings size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">App Settings</h2>
                        <p className="text-gray-500 mt-2">Configure permissions and settings for installed applications.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppMarketplacePage;
