import React from 'react';
import { TrendingUp, DollarSign, Users, Key, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSupabaseQuery } from '../../hooks/useSupabase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ResellerDashboard = () => {
    // Fetch commission data (fallback to mock if Supabase not configured)
    const { data: commissions, loading } = useSupabaseQuery({
        table: 'commissions',
        select: '*, licenses(client_name, license_type)',
        filter: { column: 'reseller_id', value: 'current_user_id' } // This would be dynamic
    });

    // Mock data for demonstration
    const mockEarningsData = [
        { month: 'Jul', earnings: 12500, clients: 3 },
        { month: 'Aug', earnings: 18000, clients: 5 },
        { month: 'Sep', earnings: 22000, clients: 7 },
        { month: 'Oct', earnings: 28500, clients: 9 },
        { month: 'Nov', earnings: 35000, clients: 12 },
        { month: 'Dec', earnings: 42000, clients: 15 },
    ];

    const mockLicensesData = [
        { month: 'Jul', erp: 2, crm: 1, hrms: 0 },
        { month: 'Aug', erp: 3, crm: 2, hrms: 1 },
        { month: 'Sep', erp: 4, crm: 3, hrms: 2 },
        { month: 'Oct', erp: 5, crm: 4, hrms: 3 },
        { month: 'Nov', erp: 7, crm: 5, hrms: 4 },
        { month: 'Dec', erp: 9, crm: 6, hrms: 5 },
    ];

    const recentSales = [
        { client: 'Tech Solutions Ltd', type: 'ERP', amount: 125000, commission: 12500, date: '2024-12-20' },
        { client: 'Digital Ventures', type: 'CRM', amount: 85000, commission: 8500, date: '2024-12-18' },
        { client: 'Smart Systems Inc', type: 'HRMS', amount: 95000, commission: 9500, date: '2024-12-15' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Reseller Dashboard</h1>
                <p className="text-slate-500 mt-1">Track your sales performance and commissions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign size={28} />
                        <div>
                            <p className="text-sm opacity-90">Total Earnings</p>
                            <h3 className="text-3xl font-bold">₹1,58,000</h3>
                        </div>
                    </div>
                    <p className="text-xs opacity-75 mt-2">+28% from last month</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Users size={28} />
                        <div>
                            <p className="text-sm opacity-90">Active Clients</p>
                            <h3 className="text-3xl font-bold">15</h3>
                        </div>
                    </div>
                    <p className="text-xs opacity-75 mt-2">3 new this month</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Key size={28} />
                        <div>
                            <p className="text-sm opacity-90">Licenses Sold</p>
                            <h3 className="text-3xl font-bold">20</h3>
                        </div>
                    </div>
                    <p className="text-xs opacity-75 mt-2">5 this month</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar size={28} />
                        <div>
                            <p className="text-sm opacity-90">Pending Commission</p>
                            <h3 className="text-3xl font-bold">₹30,500</h3>
                        </div>
                    </div>
                    <p className="text-xs opacity-75 mt-2">To be paid on Jan 1</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Earnings Chart */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly Earnings</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={mockEarningsData}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip />
                            <Area type="monotone" dataKey="earnings" stroke="#10b981" fillOpacity={1} fill="url(#colorEarnings)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* License Distribution */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">License Sales by Type</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockLicensesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="erp" stroke="#3b82f6" strokeWidth={2} name="ERP" />
                            <Line type="monotone" dataKey="crm" stroke="#8b5cf6" strokeWidth={2} name="CRM" />
                            <Line type="monotone" dataKey="hrms" stroke="#f59e0b" strokeWidth={2} name="HRMS" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Sales</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Sale Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Commission</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {recentSales.map((sale, index) => (
                                <tr key={index} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-semibold text-slate-800">{sale.client}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                            {sale.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        ₹{sale.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-600">
                                        ₹{sale.commission.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {new Date(sale.date).toLocaleDateString('en-IN')}
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

export default ResellerDashboard;
