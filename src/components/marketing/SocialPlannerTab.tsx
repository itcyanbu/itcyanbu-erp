import { Facebook, Instagram, Linkedin, Twitter, Calendar as CalendarIcon, MoreVertical, LayoutGrid, Plus } from 'lucide-react';

interface SocialPlannerTabProps {
    onCreate?: () => void;
}

const SocialPlannerTab = ({ onCreate }: SocialPlannerTabProps) => {
    const socialAccounts = [
        { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50', status: 'Connected' },
        { name: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50', status: 'Connected' },
        { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50', status: 'Connect' },
        { name: 'X (Twitter)', icon: Twitter, color: 'text-black', bg: 'bg-gray-50', status: 'Connect' },
    ];

    const scheduledPosts = [
        { id: 1, content: 'Exciting news coming soon! Stay tuned. #Launch', platform: 'Facebook', date: 'Tomorrow, 10:00 AM', image: true },
        { id: 2, content: 'Check out our latest blog post on automation.', platform: 'LinkedIn', date: 'Feb 12, 2:00 PM', image: false },
        { id: 3, content: 'Weekend vibes! 🌴', platform: 'Instagram', date: 'Feb 14, 9:00 AM', image: true },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
                    <span className="text-green-500 text-sm font-medium mt-1 inline-flex items-center gap-1">↑ 12% vs last month</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-gray-500 text-sm font-medium">Scheduled</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">15</p>
                    <span className="text-blue-500 text-sm font-medium mt-1 inline-flex items-center gap-1">Next post in 2h</span>
                </div>
                {/* Action Card for quick create */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <button
                        onClick={onCreate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm shadow-blue-200 transition-all transform hover:scale-105"
                    >
                        <Plus size={16} />
                        Create New Post
                    </button>
                    <p className="text-xs text-blue-600 mt-2">Schedule content for your platforms</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Connect Accounts */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <UsersIcon size={20} className="text-gray-400" />
                        Accounts
                    </h2>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                        {socialAccounts.map((account) => (
                            <div key={account.name} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${account.bg} ${account.color}`}>
                                        <account.icon size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{account.name}</div>
                                        <div className={`text-xs ${account.status === 'Connected' ? 'text-green-600' : 'text-gray-400'}`}>
                                            {account.status}
                                        </div>
                                    </div>
                                </div>
                                {account.status === 'Connect' ? (
                                    <button className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-black hover:text-white transition-colors">
                                        Connect
                                    </button>
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scheduled Posts */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <CalendarIcon size={20} className="text-gray-400" />
                            Upcoming Posts
                        </h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Calendar</button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {scheduledPosts.map((post) => (
                            <div key={post.id} className="p-5 border-b last:border-0 border-gray-100 hover:bg-gray-50 transition-colors flex gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${post.image ? 'bg-gray-200' : 'bg-blue-50 text-blue-500'}`}>
                                    {post.image ? <img src={`https://source.unsplash.com/random/100x100?sig=${post.id}`} alt="Post" className="w-full h-full object-cover rounded-lg" /> : <LayoutGrid size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">{post.platform}</span>
                                            <span className="text-xs text-gray-400">• {post.date}</span>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                                </div>
                            </div>
                        ))}
                        <div className="p-4 bg-gray-50 text-center">
                            <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">
                                + Schedule a new post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UsersIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

export default SocialPlannerTab;
