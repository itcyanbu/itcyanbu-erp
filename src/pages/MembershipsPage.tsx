import { useState } from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Award,
    BarChart3,
    Plus,
    MoreHorizontal,
    GraduationCap,
    UserPlus,
    Tag,
    Settings,
    ShieldCheck,
    Globe,
    MessageCircle,
    Wand2,
    Copy,
    RefreshCw
} from 'lucide-react';

const TABS = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Products', label: 'Products', icon: BookOpen },
    { id: 'Offers', label: 'Offers', icon: Tag },
    { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'Certificates', label: 'Certificates', icon: Award },
    { id: 'Communities', label: 'Communities', icon: Users },
    { id: 'Settings', label: 'Settings', icon: Settings },
];

const MembershipsPage = () => {
    const [activeTab, setActiveTab] = (useState as any)('Dashboard');
    const [magicLink, setMagicLink] = useState('https://app.itcyanbu.com/v2/preview/magic/token_bt892x_lz01');

    const handleTabChange = (tabId: string) => {
        console.log('Changing tab to:', tabId);
        setActiveTab(tabId);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(magicLink);
        alert('Magic Link copied to clipboard!');
    };

    const regenerateMagicLink = () => {
        const newToken = Math.random().toString(36).substring(2, 12);
        setMagicLink(`https://app.itcyanbu.com/v2/preview/magic/token_${newToken}`);
    };

    const recentActivity = [
        { id: 1, user: 'Sarah Jenkins', action: 'completed lesson', target: 'SEO Basics', time: '2 mins ago' },
        { id: 2, user: 'Mike Ross', action: 'joined community', target: 'Marketing Pros', time: '15 mins ago' },
        { id: 3, user: 'Rachel Green', action: 'purchased course', target: 'Social Media Strategy', time: '1 hour ago' },
        { id: 4, user: 'John Doe', action: 'earned certificate', target: 'Marketing Masterclass', time: '3 hours ago' },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0 relative z-30">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Memberships</h1>
                        <p className="text-gray-500 mt-1">Manage your courses, communities, and member engagement.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer relative z-40 ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon size={16} className="shrink-0" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">

                {activeTab === 'Dashboard' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Opt-ins</p>
                                <p className="text-3xl font-black text-gray-900">4,124</p>
                                <div className="mt-4 flex items-center gap-2 text-xs">
                                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">+12%</span>
                                    <span className="text-gray-400">vs last month</span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50/50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Revenue</p>
                                <p className="text-3xl font-black text-gray-900">$188,400</p>
                                <div className="mt-4 flex items-center gap-2 text-xs">
                                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">+$12.4k</span>
                                    <span className="text-gray-400">new this week</span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Active Members</p>
                                <p className="text-3xl font-black text-gray-900">2,548</p>
                                <div className="mt-4 flex items-center gap-2 text-xs">
                                    <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">High</span>
                                    <span className="text-gray-400">Engagement</span>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Completions</p>
                                <p className="text-3xl font-black text-gray-900">856</p>
                                <div className="mt-4 flex items-center gap-2 text-xs">
                                    <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">↑ 8%</span>
                                    <span className="text-gray-400">completion rate</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Performance Chart Placeholder */}
                            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold text-gray-900">Member Growth</h2>
                                    <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option>Last 30 Days</option>
                                        <option>Last 3 Months</option>
                                        <option>Overall</option>
                                    </select>
                                </div>
                                <div className="h-64 flex flex-col justify-end gap-1">
                                    <div className="flex items-end gap-3 h-full px-4">
                                        {[40, 65, 45, 80, 55, 90, 75, 40, 60, 85, 30, 95].map((val, i) => (
                                            <div key={i} className="flex-1 bg-blue-100 rounded-t-sm relative group cursor-pointer" style={{ height: `${val}%` }}>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    {val * 10} Members
                                                </div>
                                                <div className="w-full h-full bg-blue-600 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between px-4 pt-4 border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                                        <span>Jan</span>
                                        <span>Mar</span>
                                        <span>Jun</span>
                                        <span>Sep</span>
                                        <span>Dec</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Member Activity */}
                            <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                        <Users size={18} className="text-gray-400" />
                                        Recent Activity
                                    </h2>
                                </div>
                                <div className="flex-1 overflow-y-auto max-h-[400px] divide-y divide-gray-100 px-6">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="py-4 last:border-0">
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                                                    {activity.user.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm text-gray-900 leading-tight">
                                                        <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-semibold text-blue-600">{activity.target}</span>
                                                    </p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-wider">{activity.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-gray-100">
                                    <button className="w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-50">View All Activity</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Products' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">COURSE PRODUCTS</h2>
                                <p className="text-sm text-gray-500 mt-1">Design and build your signature training programs.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <input type="text" placeholder="Search courses..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm" />
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2">
                                    <Plus size={18} />
                                    Create Product
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: 'Ultimate Marketing Masterclass', lessons: 45, modules: 12, status: 'Published', img: '🎨', color: 'bg-indigo-600' },
                                { title: 'SEO For Growth (Beginner)', lessons: 24, modules: 6, status: 'Published', img: '🔍', color: 'bg-emerald-600' },
                                { title: 'Social Media Advertising 2024', lessons: 38, modules: 8, status: 'Draft', img: '📱', color: 'bg-rose-600' },
                                { title: 'Scaling Agency Operations', lessons: 15, modules: 4, status: 'Published', img: '📈', color: 'bg-amber-600' },
                                { title: 'Copywriting That Converts', lessons: 12, modules: 3, status: 'Draft', img: '✍️', color: 'bg-blue-600' },
                            ].map((product, i) => (
                                <div key={i} className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500 border-b-8 border-b-transparent hover:border-b-blue-600">
                                    <div className={`h-48 ${product.color} flex items-center justify-center text-6xl relative`}>
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                        <span className="relative z-10 filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">{product.img}</span>
                                        <div className="absolute top-6 right-6 h-10 w-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                            <Settings size={20} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${product.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {product.status}
                                            </span>
                                            <button className="text-gray-400 hover:text-gray-900 transition-colors">
                                                <MoreHorizontal size={24} />
                                            </button>
                                        </div>
                                        <h3 className="font-black text-gray-900 text-lg mb-2 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{product.title}</h3>
                                        <p className="text-sm text-gray-500 mb-8 line-clamp-2 leading-relaxed font-medium">Empower your students with professional-grade curriculum designed for results.</p>

                                        <div className="grid grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                                            <div className="bg-gray-50 p-3 rounded-2xl">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">Modules</p>
                                                <p className="text-xl font-black text-gray-900 text-center">{product.modules}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-2xl">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">Lessons</p>
                                                <p className="text-xl font-black text-gray-900 text-center">{product.lessons}</p>
                                            </div>
                                        </div>

                                        <div className="pt-6 flex items-center justify-between">
                                            <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                                                <BookOpen size={14} />
                                                Edit Content
                                            </button>
                                            <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Preview Site</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-white hover:border-blue-400 hover:shadow-2xl transition-all duration-500 group min-h-[420px]">
                                <div className="w-20 h-20 bg-white border border-gray-100 text-blue-600 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500 shadow-xl shadow-blue-50/50">
                                    <Plus size={40} />
                                </div>
                                <h3 className="font-black text-gray-900 uppercase tracking-tight text-xl">New Product</h3>
                                <p className="text-sm text-gray-500 mt-2 text-center max-w-[240px] leading-relaxed font-medium">What amazing value will you provide to your audience today?</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Offers' && (
                    <div className="max-w-6xl mx-auto space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">COURSE OFFERS</h2>
                                <p className="text-sm text-gray-500 mt-1">Package your products into bundles and set your pricing.</p>
                            </div>
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2">
                                <Plus size={18} />
                                Create New Offer
                            </button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                        <th className="px-10 py-6">Offer Details</th>
                                        <th className="px-10 py-6">Linked Products</th>
                                        <th className="px-10 py-6">Pricing Structure</th>
                                        <th className="px-10 py-6">Status</th>
                                        <th className="px-10 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { name: 'Full Access Life Bundle', products: 4, price: '$997', type: 'One-Time', status: 'Published' },
                                        { name: 'SEO Basic Training Pack', products: 1, price: '$197', type: 'Subscription', status: 'Published' },
                                        { name: 'Marketing Pro Subscription', products: 6, price: '$49/mo', type: 'Recurring', status: 'Published' },
                                        { name: 'Agency Scaling Mastermind', products: 2, price: '$2,497', type: 'One-Time', status: 'Draft' },
                                    ].map((offer, i) => (
                                        <tr key={i} className="hover:bg-blue-50/20 transition-colors group">
                                            <td className="px-10 py-6">
                                                <p className="font-black text-gray-900 text-base uppercase tracking-tight group-hover:text-blue-600 transition-colors">{offer.name}</p>
                                                <p className="text-xs text-gray-400 mt-1 font-medium">Auto-generated checkout page active</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-2">
                                                        {[...Array(Math.min(3, offer.products))].map((_, j) => (
                                                            <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black">
                                                                {j === 0 ? '🎨' : j === 1 ? '🔍' : '📈'}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600">+{offer.products} Items</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <p className="font-black text-gray-900 text-base leading-none">{offer.price}</p>
                                                <p className="text-[10px] text-gray-400 font-black uppercase mt-1 tracking-widest">{offer.type}</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${offer.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {offer.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-white border border-transparent hover:border-blue-100 transition-all">
                                                    <Settings size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-10 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 tracking-wide">Viewing 4 active offers</p>
                                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Manage All Offers</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Analytics' && (
                    <div className="max-w-6xl mx-auto space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Performance Tracking</h2>
                                <p className="text-sm text-gray-500 mt-1">Monitor how your students are progressing through your content.</p>
                            </div>
                            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black shadow-xl shadow-gray-200 transition-all">Export Data</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Course Progress', value: '64.2%', grow: '+5.4%', color: 'blue', icon: BookOpen },
                                { label: 'Quiz Avg Score', value: '82/100', grow: '+2.1%', color: 'emerald', icon: Award },
                                { label: 'Video Watch Time', value: '14,280m', grow: '+15%', color: 'rose', icon: BarChart3 },
                                { label: 'Member Retention', value: '89.4%', grow: '+1.2%', color: 'indigo', icon: Users },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <stat.icon size={48} />
                                    </div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest leading-none">{stat.label}</p>
                                    <div className="flex items-end justify-between relative z-10">
                                        <p className="text-3xl font-black text-gray-900 leading-none">{stat.value}</p>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${stat.grow.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {stat.grow}
                                        </span>
                                    </div>
                                    <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full bg-blue-600 transition-all duration-1000`} style={{ width: i === 0 ? '64%' : i === 1 ? '82%' : i === 2 ? '45%' : '89%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <h3 className="font-black text-gray-900 uppercase tracking-tight">Student Engagement Leaders</h3>
                                <div className="flex gap-4">
                                    <button className="text-xs font-black text-blue-600 uppercase tracking-widest">Filter By Product</button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { name: 'Alice Thompson', email: 'alice@example.com', product: 'Marketing Masterclass', progress: 92, score: 95 },
                                    { name: 'Robert Fox', email: 'robert@fox.io', product: 'SEO For Beginners', progress: 45, score: 78 },
                                    { name: 'Dianne Russell', email: 'dianne@russ.com', product: 'Social Media Advertising', progress: 68, score: 88 },
                                    { name: 'Cameron Williamson', email: 'cam@will.io', product: 'Marketing Masterclass', progress: 24, score: 82 },
                                ].map((student, i) => (
                                    <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-blue-50/30 transition-colors group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 uppercase tracking-tight text-base leading-none">{student.name}</p>
                                                <p className="text-xs text-gray-400 mt-1 font-medium">{student.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-16">
                                            <div className="w-48">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</span>
                                                    <span className="text-[10px] font-black text-gray-900">{student.progress}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${student.progress}%` }} />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg Score</p>
                                                <p className="text-lg font-black text-gray-900 leading-none">{student.score}/100</p>
                                            </div>
                                            <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-gray-50/50 text-center border-t border-gray-100">
                                <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Load More Student Insights</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Communities' && (
                    <div className="max-w-5xl mx-auto space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Communities & Groups</h2>
                                <p className="text-sm text-gray-500 mt-1">Foster student engagement with branded discussion areas.</p>
                            </div>
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2">
                                <Plus size={18} />
                                Create New Group
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                { name: 'Marketing Insiders VIP', members: '2.4k', activity: '15 posts today', icon: '🔥', color: 'bg-orange-500' },
                                { name: 'SEO Hackers Lab', members: '856', activity: '8 posts today', icon: '⚙️', color: 'bg-blue-500' },
                                { name: 'Agency Scaling Support', members: '1.2k', activity: '24 posts today', icon: '🚀', color: 'bg-emerald-500' },
                            ].map((group, i) => (
                                <div key={i} className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm p-10 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${group.color} opacity-5 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-700`} />
                                    <div className="flex items-center gap-6 mb-8 relative z-10">
                                        <div className={`w-16 h-16 ${group.color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-gray-200 group-hover:rotate-[15deg] transition-all duration-500`}>
                                            {group.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900 text-xl uppercase tracking-tight">{group.name}</h3>
                                            <p className="text-sm font-bold text-gray-400 mt-1">{group.members} Members • <span className="text-emerald-500">{group.activity}</span></p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 mb-10 relative z-10">
                                        <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600">
                                                <MessageCircle size={16} />
                                            </div>
                                            <span>Active discussion on 2024 Trends</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-emerald-600">
                                                <UserPlus size={16} />
                                            </div>
                                            <span>42 new members joined today</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 relative z-10">
                                        <button className="flex-1 py-3.5 bg-gray-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200">Open Community</button>
                                        <button className="p-3.5 bg-white border border-gray-200 text-gray-400 rounded-2xl hover:text-gray-900 hover:border-gray-500 transition-all">
                                            <Settings size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-indigo-600 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-indigo-700 transition-all duration-500 shadow-2xl shadow-indigo-100">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <Plus size={40} />
                                </div>
                                <h3 className="font-black text-white uppercase tracking-tight text-2xl mb-3">Launch A Group</h3>
                                <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[240px]">Create an exclusive space for your students to network and grow together.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Certificates' && (
                    <div className="max-w-6xl mx-auto space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Student Rewards</h2>
                                <p className="text-sm text-gray-500 mt-1">Automate course completion certificates and digital badges.</p>
                            </div>
                            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2">
                                <Plus size={18} />
                                New Certificate Template
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {[
                                { name: 'Expert Marketer Certification', product: 'Marketing Masterclass', issued: 156, color: 'from-blue-600 to-indigo-700' },
                                { name: 'SEO Fundamentals Badge', product: 'SEO For Beginners', issued: 84, color: 'from-emerald-600 to-teal-700' },
                            ].map((cert, i) => (
                                <div key={i} className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col">
                                    <div className={`h-64 bg-gradient-to-br ${cert.color} p-8 flex flex-col items-center justify-center text-center relative`}>
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:20px_20px]" />
                                        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-xl relative z-10 w-full max-w-[280px] shadow-2xl">
                                            <Award size={48} className="text-white mx-auto mb-4" />
                                            <h4 className="text-white font-black text-xs uppercase tracking-widest">Certificate of Completion</h4>
                                            <div className="w-12 h-0.5 bg-white/50 mx-auto my-3" />
                                            <p className="text-[10px] text-white/80 font-bold">Awarded to</p>
                                            <p className="text-sm text-white font-black uppercase tracking-tight">Johnathan Doe</p>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-white flex-1">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="font-black text-gray-900 uppercase tracking-tight text-lg">{cert.name}</h3>
                                                <p className="text-xs font-bold text-gray-400 mt-1">Linked to: <span className="text-blue-600 italic">{cert.product}</span></p>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-2 rounded-2xl text-center">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Issued</p>
                                                <p className="text-xl font-black text-gray-900 mt-1">{cert.issued}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="flex-1 py-3.5 bg-gray-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-black transition-all">Edit Design</button>
                                            <button className="p-3.5 bg-white border border-gray-200 text-gray-400 rounded-2xl hover:text-gray-900 hover:border-gray-500 transition-all">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 group cursor-pointer hover:bg-white hover:border-indigo-400 transition-all duration-500 shadow-sm hover:shadow-2xl min-h-[480px]">
                                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-indigo-100/50">
                                    <ShieldCheck size={40} />
                                </div>
                                <h3 className="font-black text-gray-900 uppercase tracking-tight text-xl">Create Template</h3>
                                <p className="text-sm text-gray-500 mt-3 text-center max-w-[280px] leading-relaxed font-medium">Motivate your students with professional rewards for their hard work.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Settings' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Membership Settings</h2>
                                <p className="text-sm text-gray-500 mt-1">Global configuration for your membership sites and client portal.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                        <Globe size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1">Custom Domain</h3>
                                        <p className="text-sm text-gray-500 mb-6">Point your membership portal to your own domain name.</p>
                                        <div className="flex gap-4">
                                            <input type="text" placeholder="courses.yourdomain.com" className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                            <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-all">Connect</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                        <GraduationCap size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1">Company Branding</h3>
                                        <p className="text-sm text-gray-500 mb-6">Upload logos and favicons to be used across all products.</p>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="h-32 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                                <Plus size={20} className="text-gray-300 mb-2" />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Upload Logo</span>
                                            </div>
                                            <div className="h-32 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                                <Plus size={20} className="text-gray-300 mb-2" />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Upload Favicon</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1">Email Settings</h3>
                                        <p className="text-sm text-gray-500 mb-4">Configure notification emails for student welcome and course progress.</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-5 bg-blue-600 rounded-full relative shadow-inner">
                                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">Enable Welcome Emails</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                        <Wand2 size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-gray-900">Site Details & Magic Links</h3>
                                            <a
                                                href="https://help.gohighlevel.com/support/solutions/articles/48001207804-magic-links-in-memberships-courses-"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-6">Magic links allow one-click login for members without needing a username or password.</p>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">Default Magic Link (SSO)</label>
                                                <div className="flex gap-2">
                                                    <div className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-600 overflow-hidden truncate">
                                                        {magicLink}
                                                    </div>
                                                    <button
                                                        onClick={copyToClipboard}
                                                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
                                                        title="Copy Link"
                                                    >
                                                        <Copy size={18} />
                                                    </button>
                                                    <button
                                                        onClick={regenerateMagicLink}
                                                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
                                                        title="Regenerate Link"
                                                    >
                                                        <RefreshCw size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                                    <h4 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                                                        <Users size={16} />
                                                        User's Magic Link
                                                    </h4>
                                                    <p className="text-xs text-blue-700 leading-relaxed">
                                                        Best for internal staff or location users. Use this as a Custom Menu Link in the sidebar for quick staff access.
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                                    <h4 className="text-sm font-bold text-emerald-900 mb-1 flex items-center gap-2">
                                                        <GraduationCap size={16} />
                                                        Learner's Magic Link
                                                    </h4>
                                                    <p className="text-xs text-emerald-700 leading-relaxed">
                                                        Best for students. Send this via Workflows or Email Campaigns using the <span className="font-mono font-bold">{"{{ membership.login_url }}"}</span> custom value.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                                                <ShieldCheck size={20} className="text-amber-600 shrink-0" />
                                                <p className="text-xs text-amber-800 leading-relaxed">
                                                    <span className="font-bold">Security Note:</span> Magic links should only be shared with trusted contacts. Anyone with the link can access the course material assigned to that specific contact.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembershipsPage;
