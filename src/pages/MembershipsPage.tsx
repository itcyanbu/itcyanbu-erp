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
    DollarSign,
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

const MembershipsPage = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [magicLink, setMagicLink] = useState('https://app.itcyanbu.com/v2/preview/magic/token_bt892x_lz01');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(magicLink);
        alert('Magic Link copied to clipboard!');
    };

    const regenerateMagicLink = () => {
        const newToken = Math.random().toString(36).substring(2, 12);
        setMagicLink(`https://app.itcyanbu.com/v2/preview/magic/token_${newToken}`);
    };

    const tabs = [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'Products', label: 'Products', icon: BookOpen },
        { id: 'Offers', label: 'Offers', icon: Tag },
        { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'Certificates', label: 'Certificates', icon: Award },
        { id: 'Communities', label: 'Communities', icon: Users },
        { id: 'Settings', label: 'Settings', icon: Settings },
    ];

    const popularCourses = [
        { id: 1, name: 'Ultimate Marketing Masterclass', members: 1240, revenue: '$124,000' },
        { id: 2, name: 'Beginner SEO Guide', members: 856, revenue: '$42,800' },
        { id: 3, name: 'Social Media Strategy', members: 432, revenue: '$21,600' },
    ];

    const recentActivity = [
        { id: 1, user: 'Sarah Jenkins', action: 'completed lesson', target: 'SEO Basics', time: '2 mins ago' },
        { id: 2, user: 'Mike Ross', action: 'joined community', target: 'Marketing Pros', time: '15 mins ago' },
        { id: 3, user: 'Rachel Green', action: 'purchased course', target: 'Social Media Strategy', time: '1 hour ago' },
        { id: 4, user: 'John Doe', action: 'earned certificate', target: 'Marketing Masterclass', time: '3 hours ago' },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Memberships</h1>
                        <p className="text-gray-500 mt-1">Manage your courses, communities, and member engagement.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            Create Product
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

                {activeTab === 'Dashboard' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                        <DollarSign size={20} />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">$188,400</p>
                                <span className="text-green-500 text-sm font-medium mt-1 inline-flex items-center gap-1">↑ 8.2% vs last month</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-500 text-sm font-medium">Active Members</h3>
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <UserPlus size={20} />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">2,548</p>
                                <span className="text-blue-500 text-sm font-medium mt-1 inline-flex items-center gap-1">↑ 124 new this week</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-500 text-sm font-medium">Course Completions</h3>
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <GraduationCap size={20} />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">856</p>
                                <span className="text-gray-500 text-sm font-medium mt-1">Top course: Marketing Masterclass</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Popular Products */}
                            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Top Performing Products</h2>
                                    <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {popularCourses.map((course) => (
                                        <div key={course.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{course.name}</p>
                                                    <p className="text-sm text-gray-500">{course.members} members</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-900">{course.revenue}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="px-6 py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Products' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Products</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your courses and digital products.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm" />
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
                                    <Plus size={16} />
                                    Create Product
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: 'Marketing Masterclass', lessons: 45, modules: 12, status: 'Published', img: '🎨' },
                                { title: 'SEO For Beginners', lessons: 24, modules: 6, status: 'Published', img: '🔍' },
                                { title: 'Social Media Ads', lessons: 38, modules: 8, status: 'Draft', img: '📱' },
                                { title: 'Business Scaling 101', lessons: 15, modules: 4, status: 'Published', img: '📈' },
                            ].map((product, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all border-b-4 border-b-transparent hover:border-b-blue-600">
                                    <div className="h-44 bg-gray-50 flex items-center justify-center text-5xl group-hover:bg-blue-50 transition-colors">
                                        {product.img}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-gray-900 truncate pr-2">{product.title}</h3>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${product.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {product.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-6 line-clamp-2">The ultimate guide to mastering your craft with professional step-by-step instructions.</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs font-semibold text-gray-400">
                                            <div className="flex items-center gap-4">
                                                <span>{product.modules} Modules</span>
                                                <span>{product.lessons} Lessons</span>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all group min-h-[340px]">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                    <Plus size={28} />
                                </div>
                                <h3 className="font-bold text-gray-900">New Product</h3>
                                <p className="text-sm text-gray-500 mt-2 text-center max-w-[200px]">Start building your next masterpiece.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Offers' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Offers</h2>
                                <p className="text-sm text-gray-500 mt-1">Create deals and bundle your products for sale.</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
                                <Plus size={16} />
                                Create Offer
                            </button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Offer Name</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Included Products</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Price</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { name: 'Full Access Pass - Bundle', products: 3, price: '$497', status: 'Published' },
                                        { name: 'Starter SEO Pack', products: 1, price: '$97', status: 'Published' },
                                        { name: 'Holiday Special Promotion', products: 2, price: '$199', status: 'Draft' },
                                        { name: 'Marketing Pro VIP', products: 5, price: '$997', status: 'Published' },
                                    ].map((offer, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-900">{offer.name}</td>
                                            <td className="px-6 py-4 text-gray-500">{offer.products} Products</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">{offer.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${offer.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {offer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Analytics' && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'New Members', value: '1,284', grow: '+12%', color: 'blue' },
                                { label: 'Active Members', value: '5,420', grow: '+5%', color: 'emerald' },
                                { label: 'Total Sales', value: '$84,200', grow: '+18%', color: 'green' },
                                { label: 'Avg Study Time', value: '42m', grow: '-2%', color: 'orange' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wide">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.grow.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {stat.grow}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <BarChart3 size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Detailed Student Analytics</h3>
                            <p className="text-gray-500 mt-2 max-w-md">Track progress, individual student performance, and engagement metrics across all your published products.</p>
                            <button className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm tracking-wide hover:bg-black transition-all">Generate Full Report</button>
                        </div>
                    </div>
                )}

                {activeTab === 'Communities' && (
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Communities</h2>
                                <p className="text-sm text-gray-500 mt-1">Engage with your students in branded community groups.</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
                                <Plus size={16} />
                                Create Group
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-inner">
                                        👥
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Marketing Insiders</h3>
                                        <p className="text-sm text-gray-500">2.4k Members • 15 Posts today</p>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 h-8">
                                        <MessageCircle size={16} className="text-blue-500" />
                                        <span>Active discussion on 2024 Trends</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 h-8">
                                        <UserPlus size={16} className="text-emerald-500" />
                                        <span>42 new members joined today</span>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 bg-gray-50 text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors border border-gray-100">Open Community</button>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Users size={120} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Build New Community</h3>
                                <p className="text-sm text-gray-500 text-center mb-6">Create a safe space for your audience to connect, share, and grow.</p>
                                <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50">Configure Group</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Certificates' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Certificates</h2>
                                <p className="text-sm text-gray-500 mt-1">Design and automate course completion rewards.</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
                                <ShieldCheck size={16} />
                                New Certificate
                            </button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold uppercase text-xs">Certificate Name</th>
                                        <th className="px-6 py-4 font-semibold uppercase text-xs">Linked Product</th>
                                        <th className="px-6 py-4 font-semibold uppercase text-xs">Issued Count</th>
                                        <th className="px-6 py-4 font-semibold uppercase text-xs text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { name: 'Marketing Professional Certification', product: 'Marketing Masterclass', count: 156 },
                                        { name: 'SEO Fundamentals Badge', product: 'SEO For Beginners', count: 84 },
                                    ].map((cert, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-900">{cert.name}</td>
                                            <td className="px-6 py-4 text-gray-500">{cert.product}</td>
                                            <td className="px-6 py-4 text-gray-900 font-semibold">{cert.count}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-blue-600">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
