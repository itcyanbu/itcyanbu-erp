import React from 'react';
import { Users, FileCheck, Key, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';
import RevenueChart from '../../components/charts/RevenueChart';
import UserGrowthChart from '../../components/charts/UserGrowthChart';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useSupabaseStats } from '../../hooks/useSupabase';

const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-slate-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
                {change && (
                    <p className={`text-sm mt-2 flex items-center gap-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp size={14} />
                        {change > 0 ? '+' : ''}{change}% from last month
                    </p>
                )}
            </div>
            <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    </div>
);

const SuperAdminHome = () => {
    // Fetch real data from Supabase
    const { stats, loading, error } = useSupabaseStats();

    // Mock data for charts (will be replaced with real data later)
    const revenueData = [
        { month: 'Jul', amount: 45000 },
        { month: 'Aug', amount: 52000 },
        { month: 'Sep', amount: 48000 },
        { month: 'Oct', amount: 61000 },
        { month: 'Nov', amount: 72000 },
        { month: 'Dec', amount: 85000 },
    ];

    const userGrowthData = [
        { month: 'Jul', resellers: 12, users: 45 },
        { month: 'Aug', resellers: 18, users: 68 },
        { month: 'Sep', resellers: 24, users: 92 },
        { month: 'Oct', resellers: 31, users: 124 },
        { month: 'Nov', resellers: 42, users: 167 },
        { month: 'Dec', resellers: 56, users: 203 },
    ];

    const recentActivity = [
        { name: 'Tech Solutions Ltd', status: 'KYC Approved', time: '2 hours ago', type: 'success' },
        { name: 'Digital Ventures', status: 'Documents Pending', time: '5 hours ago', type: 'warning' },
        { name: 'Smart Systems Inc', status: 'New Registration', time: '1 day ago', type: 'info' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="text-red-500" size={24} />
                    <h3 className="font-bold text-red-800">Failed to Load Dashboard</h3>
                </div>
                <p className="text-sm text-red-600">
                    {error.message || 'Unable to connect to database. Please ensure Supabase is configured.'}
                </p>
                <p className="text-xs text-red-500 mt-2">
                    If running in demo mode, this is expected. Configure Supabase to see real data.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your business.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Users}
                    title="Total Resellers"
                    value={stats.totalResellers}
                    change={null}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={FileCheck}
                    title="Pending KYC"
                    value={stats.pendingKYC}
                    change={null}
                    color="bg-amber-500"
                />
                <StatCard
                    icon={Key}
                    title="Active Licenses"
                    value={stats.activeLicenses}
                    change={null}
                    color="bg-green-500"
                />
                <StatCard
                    icon={TrendingUp}
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    change={null}
                    color="bg-purple-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <RevenueChart data={revenueData} />
                <UserGrowthChart data={userGrowthData} />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' :
                                    activity.type === 'warning' ? 'bg-amber-500' :
                                        'bg-blue-500'
                                    }`} />
                                <div>
                                    <p className="font-semibold text-slate-800">{activity.name}</p>
                                    <p className="text-sm text-slate-500">{activity.status}</p>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Status */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Database Status
                    </h4>
                    <p className="text-sm text-green-600 mt-1">All systems operational</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        Email Service
                    </h4>
                    <p className="text-sm text-blue-600 mt-1">Running smoothly</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Storage
                    </h4>
                    <p className="text-sm text-purple-600 mt-1">78% capacity</p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminHome;
