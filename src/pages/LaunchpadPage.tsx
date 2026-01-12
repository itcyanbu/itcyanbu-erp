import { Rocket, Users, Calendar, DollarSign, MessageSquare } from 'lucide-react';

const LaunchpadPage = () => {
    const quickActions = [
        { icon: Users, label: 'Add Contact', color: 'bg-blue-500', description: 'Create a new contact' },
        { icon: Calendar, label: 'Schedule Meeting', color: 'bg-purple-500', description: 'Book an appointment' },
        { icon: MessageSquare, label: 'Send Message', color: 'bg-green-500', description: 'Start a conversation' },
        { icon: DollarSign, label: 'Create Invoice', color: 'bg-orange-500', description: 'Generate new invoice' },
    ];

    const recentActivity = [
        { type: 'contact', name: 'New contact added', time: '5 minutes ago' },
        { type: 'meeting', name: 'Meeting scheduled', time: '1 hour ago' },
        { type: 'message', name: 'Message sent to client', time: '2 hours ago' },
    ];

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <Rocket className="text-ghl-blue" size={28} />
                    <h1 className="text-2xl font-semibold text-gray-900">Launchpad</h1>
                </div>
                <p className="text-gray-500">Your command center for quick actions and insights</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Total Contacts</span>
                                <Users className="text-blue-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">1,234</p>
                            <p className="text-green-600 text-sm mt-1">+12% this month</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Meetings Today</span>
                                <Calendar className="text-purple-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">8</p>
                            <p className="text-gray-500 text-sm mt-1">3 upcoming</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Revenue</span>
                                <DollarSign className="text-green-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">$45.2K</p>
                            <p className="text-green-600 text-sm mt-1">+8% this month</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Messages</span>
                                <MessageSquare className="text-orange-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">156</p>
                            <p className="text-gray-500 text-sm mt-1">12 unread</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    className="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-gray-200 hover:border-ghl-blue hover:bg-blue-50 transition-all group"
                                >
                                    <div className={`${action.color} p-4 rounded-full text-white group-hover:scale-110 transition-transform`}>
                                        <action.icon size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-gray-900">{action.label}</p>
                                        <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-ghl-blue"></div>
                                    <div className="flex-1">
                                        <p className="text-gray-900 font-medium">{activity.name}</p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
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

export default LaunchpadPage;
