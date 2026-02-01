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
    UserPlus
} from 'lucide-react';

const MembershipsPage = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const tabs = [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'Courses', label: 'Courses', icon: BookOpen },
        { id: 'Communities', label: 'Communities', icon: Users },
        { id: 'Certificates', label: 'Certificates', icon: Award },
        { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
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

                {activeTab === 'Courses' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
                            <div className="flex gap-3">
                                <input type="text" placeholder="Search products..." className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                                    <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                                        <BookOpen size={48} />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-semibold text-gray-900 mb-1">Course Title #{i}</h3>
                                        <p className="text-sm text-gray-500 mb-4">Learn the fundamentals of marketing automation in this comprehensive guide.</p>
                                        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                                            <span>12 Modules</span>
                                            <span>45 Lessons</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                    <Plus size={24} />
                                </div>
                                <h3 className="font-medium text-gray-900">Create New Product</h3>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Communities' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Communities</h2>
                        <p className="text-gray-500 mt-2">Build engaging communities around your brand and products.</p>
                        <button className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Create Group
                        </button>
                    </div>
                )}

                {activeTab === 'Certificates' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Certificates</h2>
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">New Certificate</button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Name</th>
                                        <th className="px-6 py-3 font-medium">Associated Product</th>
                                        <th className="px-6 py-3 font-medium">Issued</th>
                                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[1, 2].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">Completion Certificate #{i}</td>
                                            <td className="px-6 py-4">Marketing Masterclass</td>
                                            <td className="px-6 py-4">156</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-blue-600 font-medium">
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
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BarChart3 size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Membership Analytics</h2>
                        <p className="text-gray-500 mt-2">Deep dive into course completion rates, student progress, and revenue data.</p>
                        <button className="mt-8 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            View Reports
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembershipsPage;
