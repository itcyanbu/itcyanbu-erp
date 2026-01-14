import { BarChart3, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const DashboardPage = () => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="text-ghl-blue" size={28} />
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                </div>
                <p className="text-gray-500">Analytics and performance metrics</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                                <DollarSign className="text-green-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">$124,500</p>
                            <div className="flex items-center gap-2 mt-2">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-sm text-green-600 font-medium">+15.3%</span>
                                <span className="text-sm text-gray-500">vs last month</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500">Active Clients</h3>
                                <Users className="text-blue-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">1,234</p>
                            <div className="flex items-center gap-2 mt-2">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-sm text-green-600 font-medium">+8.2%</span>
                                <span className="text-sm text-gray-500">vs last month</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
                                <Activity className="text-purple-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">24.5%</p>
                            <div className="flex items-center gap-2 mt-2">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-sm text-green-600 font-medium">+3.1%</span>
                                <span className="text-sm text-gray-500">vs last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h2>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="text-center">
                                <BarChart3 className="mx-auto text-gray-400 mb-2" size={48} />
                                <p className="text-gray-500">Chart visualization would appear here</p>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Campaigns</h3>
                            <div className="space-y-3">
                                {['Email Campaign A', 'Social Media Ads', 'Content Marketing'].map((campaign, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-900">{campaign}</span>
                                        <span className="text-green-600 font-medium">{(85 - i * 10)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Conversions</h3>
                            <div className="space-y-3">
                                {['Lead to Customer', 'Trial to Paid', 'Prospect to Lead'].map((conversion, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-900">{conversion}</span>
                                        <span className="text-blue-600 font-medium">{(42 + i * 5)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
