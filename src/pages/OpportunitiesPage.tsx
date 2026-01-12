import { Briefcase, TrendingUp, DollarSign } from 'lucide-react';

const OpportunitiesPage = () => {
    const opportunities = [
        { name: 'Enterprise Deal - Acme Corp', value: '$50,000', stage: 'Negotiation', probability: 75 },
        { name: 'Mid-Market - Tech Solutions', value: '$25,000', stage: 'Proposal', probability: 60 },
        { name: 'SMB - Local Business', value: '$10,000', stage: 'Qualification', probability: 40 },
    ];

    const stages = ['Lead', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'];

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="text-ghl-blue" size={28} />
                    <h1 className="text-2xl font-semibold text-gray-900">Opportunities</h1>
                </div>
                <p className="text-gray-500">Track your sales pipeline and deals</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Pipeline Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Total Pipeline Value</span>
                                <DollarSign className="text-green-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">$85,000</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Active Deals</span>
                                <Briefcase className="text-blue-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">12</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Win Rate</span>
                                <TrendingUp className="text-purple-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">68%</p>
                        </div>
                    </div>

                    {/* Pipeline Stages */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales Pipeline</h2>
                        <div className="grid grid-cols-5 gap-4">
                            {stages.map((stage, i) => (
                                <div key={i} className="text-center">
                                    <div className="bg-gray-100 rounded-lg p-4 mb-2 min-h-[120px] border-2 border-dashed border-gray-300">
                                        <p className="text-sm font-medium text-gray-700">{stage}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{Math.floor(Math.random() * 5) + 1} deals</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Opportunities List */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Opportunities</h2>
                        <div className="space-y-3">
                            {opportunities.map((opp, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-ghl-blue transition-colors cursor-pointer">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-1">{opp.name}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="font-semibold text-green-600">{opp.value}</span>
                                            <span>•</span>
                                            <span>{opp.stage}</span>
                                            <span>•</span>
                                            <span>{opp.probability}% probability</span>
                                        </div>
                                    </div>
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                        <div className="bg-ghl-blue h-2 rounded-full" style={{ width: `${opp.probability}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpportunitiesPage;
