import { useState } from 'react';
import {
    BarChart3,
    PieChart,
    TrendingUp,
    Phone,
    Calendar,
    Search,
    Filter,
    Download,
    ArrowUp,
    ArrowDown,
    MousePointer,
    Target
} from 'lucide-react';

const ReportingPage = () => {
    const [activeTab, setActiveTab] = useState('Google Ads');

    const tabs = [
        { id: 'Google Ads', label: 'Google Ads', icon: BarChart3 },
        { id: 'Facebook Ads', label: 'Facebook Ads', icon: PieChart },
        { id: 'Attribution', label: 'Attribution', icon: TrendingUp },
        { id: 'Call Reporting', label: 'Call Reporting', icon: Phone },
        { id: 'Appointment Reporting', label: 'Appointment Reporting', icon: Calendar },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Reporting</h1>
                        <p className="text-gray-500 mt-1">Track your ads, calls, and conversion performance.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Calendar size={16} />
                            Last 30 Days
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Download size={16} />
                            Export
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

                {activeTab === 'Google Ads' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                <BarChart3 size={20} />
                            </div>
                            <p className="text-sm text-blue-800">Your Google Ads account is connected. Data is syncing in real-time.</p>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Impressions</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">12.5k</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <ArrowUp size={14} className="mr-1" /> 8.2%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Clicks</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">842</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <ArrowUp size={14} className="mr-1" /> 12.5%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Conversions</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">45</p>
                                    <span className="flex items-center text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
                                        <ArrowDown size={14} className="mr-1" /> 2.1%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Cost / Conv.</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-3xl font-bold text-gray-900">$24.50</p>
                                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        <ArrowDown size={14} className="mr-1" /> 5.4%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Placeholder */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80 flex flex-col items-center justify-center text-gray-400">
                            <BarChart3 size={48} className="mb-4 opacity-20" />
                            <p>Performance Chart Visualization</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Facebook Ads' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                                <PieChart size={20} />
                            </div>
                            <p className="text-sm text-indigo-800">Your Facebook Ads account is connected. Data is syncing in real-time.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Reusing similar stats cards structure */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Reach</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">45.2k</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Link Clicks</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">1,204</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Leads</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-gray-500 text-sm font-medium">Amount Spent</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">$2,450</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Attribution' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Conversion Sources</h2>
                            <div className="flex gap-2">
                                <button className="text-gray-400 hover:text-gray-600"><Search size={18} /></button>
                                <button className="text-gray-400 hover:text-gray-600"><Filter size={18} /></button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Source</th>
                                        <th className="px-6 py-3 font-medium">Leads</th>
                                        <th className="px-6 py-3 font-medium">Sales</th>
                                        <th className="px-6 py-3 font-medium">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                            <MousePointer size={16} className="text-blue-500" /> Google PPC
                                        </td>
                                        <td className="px-6 py-4">156</td>
                                        <td className="px-6 py-4">24</td>
                                        <td className="px-6 py-4 font-medium text-green-600">$12,400</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                            <Target size={16} className="text-indigo-500" /> Facebook Ads
                                        </td>
                                        <td className="px-6 py-4">342</td>
                                        <td className="px-6 py-4">45</td>
                                        <td className="px-6 py-4 font-medium text-green-600">$8,250</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                            <Search size={16} className="text-orange-500" /> Organic Search
                                        </td>
                                        <td className="px-6 py-4">89</td>
                                        <td className="px-6 py-4">12</td>
                                        <td className="px-6 py-4 font-medium text-green-600">$4,100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Call Reporting' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Phone size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Call Reporting</h2>
                        <p className="text-gray-500 mt-2">Analyze inbound and outbound call metrics, duration, and outcomes.</p>
                        <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg mx-auto">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-500">Inbound Calls</p>
                                <p className="text-xl font-bold text-gray-900">142</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-500">Missed Calls</p>
                                <p className="text-xl font-bold text-red-600">12</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Appointment Reporting' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Appointment Reporting</h2>
                        <p className="text-gray-500 mt-2">Track booked, confirmed, and cancelled appointments over time.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportingPage;
