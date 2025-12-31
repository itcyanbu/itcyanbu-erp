import React, { useState, useMemo, useEffect } from 'react';
import { Download, Search, Filter, Calendar, TrendingUp, Users, Key, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supabase';

interface ReportData {
    id: string;
    type: 'reseller' | 'license' | 'revenue';
    name: string;
    email: string;
    status: string;
    date: string;
    amount?: number;
    licenseType?: string;
}

const ReportsCenter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'reseller' | 'license' | 'revenue'>('all');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [loading, setLoading] = useState(true);
    const [reportsData, setReportsData] = useState<ReportData[]>([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const allData: ReportData[] = [];

            // 1. Fetch Resellers
            const { data: resellers } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'reseller');

            if (resellers) {
                resellers.forEach(r => allData.push({
                    id: r.id,
                    type: 'reseller',
                    name: r.full_name || 'Unnamed Reseller',
                    email: r.email,
                    status: 'Active',
                    date: r.created_at
                }));
            }

            // 2. Fetch Licenses
            const { data: licenses } = await supabase
                .from('licenses')
                .select('*, profiles(full_name, email)');

            if (licenses) {
                licenses.forEach(l => {
                    allData.push({
                        id: l.id,
                        type: 'license',
                        name: l.profiles?.full_name || 'Unknown User',
                        email: l.profiles?.email || 'N/A',
                        status: l.status,
                        date: l.created_at,
                        licenseType: l.software_type,
                        amount: l.price || 0
                    });

                    // Also count as revenue if active
                    if (l.status === 'active') {
                        allData.push({
                            id: `rev-${l.id}`,
                            type: 'revenue',
                            name: `License: ${l.software_type}`,
                            email: l.profiles?.email || 'N/A',
                            status: 'Paid',
                            date: l.created_at,
                            amount: l.price || 0
                        });
                    }
                });
            }

            setReportsData(allData);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredData = useMemo(() => {
        return reportsData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || item.type === filterType;

            let matchesDate = true;
            if (dateRange.from && dateRange.to) {
                const itemDate = new Date(item.date);
                const fromDate = new Date(dateRange.from);
                const toDate = new Date(dateRange.to);
                matchesDate = itemDate >= fromDate && itemDate <= toDate;
            }

            return matchesSearch && matchesType && matchesDate;
        });
    }, [searchTerm, filterType, dateRange, reportsData]);

    const exportToCSV = () => {
        const headers = ['Type', 'Name', 'Email', 'Status', 'Date', 'Amount/Type'];
        const rows = filteredData.map(item => [
            item.type,
            item.name,
            item.email,
            item.status,
            item.date,
            item.amount ? `₹${item.amount.toLocaleString()}` : item.licenseType || 'N/A'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reports-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'reseller':
                return <Users size={16} className="text-blue-600" />;
            case 'license':
                return <Key size={16} className="text-purple-600" />;
            case 'revenue':
                return <TrendingUp size={16} className="text-green-600" />;
            default:
                return null;
        }
    };

    const getTypeBadge = (type: string) => {
        const colors = {
            reseller: 'bg-blue-100 text-blue-700',
            license: 'bg-purple-100 text-purple-700',
            revenue: 'bg-green-100 text-green-700'
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
    };

    const stats = useMemo(() => ({
        totalResellers: reportsData.filter(d => d.type === 'reseller').length,
        totalLicenses: reportsData.filter(d => d.type === 'license').length,
        totalRevenue: reportsData.filter(d => d.type === 'revenue').reduce((sum, d) => sum + (d.amount || 0), 0)
    }), [reportsData]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Generating business reports...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Reports Center</h1>
                <p className="text-slate-500 mt-1">View, filter, and export comprehensive business reports</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Users size={24} />
                        <h3 className="text-sm font-semibold opacity-90">Total Resellers</h3>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalResellers}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Key size={24} />
                        <h3 className="text-sm font-semibold opacity-90">Active Licenses</h3>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalLicenses}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp size={24} />
                        <h3 className="text-sm font-semibold opacity-90">Total Revenue</h3>
                    </div>
                    <p className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by Type</label>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as any)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="all">All Types</option>
                                <option value="reseller">Resellers</option>
                                <option value="license">Licenses</option>
                                <option value="revenue">Revenue</option>
                            </select>
                        </div>
                    </div>

                    {/* Export Button */}
                    <div className="flex items-end">
                        <button
                            onClick={exportToCSV}
                            className="w-full flex items-center justify-center gap-2 bg-[#112D4E] text-white px-4 py-2 rounded-lg hover:bg-[#1a3f6b] transition-colors font-semibold"
                        >
                            <Download size={18} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">From Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="date"
                                value={dateRange.from}
                                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">To Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="date"
                                value={dateRange.to}
                                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-slate-800">{filteredData.length}</span> of {reportsData.length} records
                </p>
                {(searchTerm || filterType !== 'all' || dateRange.from || dateRange.to) && (
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setFilterType('all');
                            setDateRange({ from: '', to: '' });
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No records found matching your criteria
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(item.type)}
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadge(item.type)}`}>
                                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-800">{item.name}</p>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{item.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Active' || item.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                item.status === 'Pending KYC' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(item.date).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">
                                            {item.amount ? `₹${item.amount.toLocaleString()}` : item.licenseType || 'N/A'}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsCenter;
