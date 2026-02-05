import { Users, Filter, LayoutGrid, FileText, ChevronUp, DollarSign, UserCheck, Wallet } from 'lucide-react';

const AffiliateManagerTab = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Affiliates', value: '142', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+5 this week' },
                    { label: 'Total Leads', value: '3,504', icon: Filter, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+120 this week' },
                    { label: 'Total Sales', value: '$45,230', icon: LayoutGrid, color: 'text-green-600', bg: 'bg-green-100', trend: '+$1,200 this week' },
                    { label: 'Unpaid Comms', value: '$3,850', icon: Wallet, color: 'text-orange-600', bg: 'bg-orange-100', trend: 'Due soon' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between z-10">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="z-10 mt-auto flex items-center gap-1 text-xs font-medium text-green-600">
                            <ChevronUp size={12} />
                            {stat.trend}
                        </div>
                        {/* Decorative circle */}
                        <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 ${stat.bg.replace('100', '500')}`} />
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Affiliates List */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Top Performing Affiliates</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                                        <img src={`https://source.unsplash.com/random/100x100?face&sig=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Affiliate User {i}</p>
                                        <p className="text-xs text-gray-500">Joined Jan 2026</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">$1,2{i}0.00</p>
                                    <p className="text-xs text-gray-500">Revenue</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Campaigns */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-3">
                                <UserCheck size={18} className="text-blue-600" />
                                Approve New Affiliates
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-3">
                                <DollarSign size={18} className="text-green-600" />
                                Payout Commission
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-3">
                                <FileText size={18} className="text-orange-600" />
                                Campaign Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateManagerTab;
