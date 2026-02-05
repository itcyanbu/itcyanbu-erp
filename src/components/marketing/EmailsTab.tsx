import { Mail, Send, Eye, MousePointerClick, MoreHorizontal } from 'lucide-react';

const EmailsTab = () => {
    const campaigns = [
        { id: 1, name: 'February Newsletter', status: 'Sent', sent: '1.2k', openRate: '45%', clickRate: '12%', date: 'Feb 1, 2026' },
        { id: 2, name: 'Product Launch Announcement', status: 'Draft', sent: '-', openRate: '-', clickRate: '-', date: 'Last edited 2h ago' },
        { id: 3, name: 'Welcome Series - Step 1', status: 'Active', sent: '8.5k', openRate: '62%', clickRate: '24%', date: 'Automated' },
        { id: 4, name: 'Abandoned Cart Recovery', status: 'Active', sent: '342', openRate: '38%', clickRate: '15%', date: 'Automated' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Emails Sent', value: '12.5k', icon: Send, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Avg Open Rate', value: '42%', icon: Eye, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Avg Click Rate', value: '15%', icon: MousePointerClick, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Bounced', value: '0.8%', icon: Mail, color: 'text-red-500', bg: 'bg-red-50' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Campaign Name</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Sent</th>
                                <th className="px-6 py-3 font-semibold">Open Rate</th>
                                <th className="px-6 py-3 font-semibold">Click Rate</th>
                                <th className="px-6 py-3 font-semibold">Date</th>
                                <th className="px-6 py-3 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-blue-600 cursor-pointer">
                                        {campaign.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.status === 'Sent' ? 'bg-green-100 text-green-700' :
                                            campaign.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{campaign.sent}</td>
                                    <td className="px-6 py-4 text-gray-600">{campaign.openRate}</td>
                                    <td className="px-6 py-4 text-gray-600">{campaign.clickRate}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">{campaign.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50 transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmailsTab;
