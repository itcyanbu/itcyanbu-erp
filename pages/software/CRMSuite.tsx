import React, { useState } from 'react';
import { Users, Calendar, FileText, Download, RotateCcw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CRMSuite = () => {
    const [startDate, setStartDate] = useState('2025-12-24');
    const [endDate, setEndDate] = useState('2025-12-29');
    const [filterType, setFilterType] = useState('All');

    // Mock data for lead categories
    const leadCategories = [
        { name: 'New Leads', count: 0, color: 'bg-blue-50 hover:bg-blue-100' },
        { name: 'Follow Ups', count: 0, color: 'bg-green-50 hover:bg-green-100' },
        { name: 'Missed Follow Ups', count: 0, color: 'bg-red-50 hover:bg-red-100' },
        { name: 'Delayed Followups', count: 0, color: 'bg-orange-50 hover:bg-orange-100' },
        { name: 'Not Interested', count: 0, color: 'bg-gray-50 hover:bg-gray-100' },
        { name: 'Closed Leads', count: 0, color: 'bg-purple-50 hover:bg-purple-100' },
        { name: 'Suspect Leads', count: 0, color: 'bg-yellow-50 hover:bg-yellow-100' },
        { name: 'Prospects Lead', count: 0, color: 'bg-teal-50 hover:bg-teal-100' },
        { name: 'Assigned To Others', count: 0, color: 'bg-indigo-50 hover:bg-indigo-100' },
    ];

    // Mock data for Daily Lead Summary chart
    const chartData = [
        { date: '25/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '26/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '27/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '28/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '29/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
    ];

    const handleFilter = () => {
        console.log('Filtering from', startDate, 'to', endDate);
    };

    const handleReset = () => {
        setStartDate('2025-12-24');
        setEndDate('2025-12-29');
        setFilterType('All');
    };

    const handleExportExcel = () => {
        alert('Exporting to Excel...');
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
                <nav className="text-sm text-slate-500">
                    <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
                </nav>
            </div>

            {/* Lead Report Section */}
            <div className="bg-white rounded-lg border border-slate-200 mb-6">
                <div className="bg-blue-50 px-6 py-3 border-b border-slate-200">
                    <h2 className="font-semibold text-slate-700">Lead Report</h2>
                </div>

                {/* Filters */}
                <div className="p-6 border-b border-slate-200">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>All</option>
                                <option>New Leads</option>
                                <option>Follow Ups</option>
                                <option>Closed Leads</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            onClick={handleFilter}
                            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-medium"
                        >
                            Filter
                        </button>

                        <button
                            onClick={handleReset}
                            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Lead Categories Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {leadCategories.map((category, index) => (
                            <div
                                key={index}
                                className={`${category.color} border border-slate-200 rounded-lg p-4 cursor-pointer transition-colors`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-700">{category.name}</span>
                                    <span className="text-2xl font-bold text-blue-600">{category.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-6">
                        <div className="bg-slate-50 p-4 rounded-lg text-center text-slate-500">
                            No data to display.
                        </div>
                    </div>

                    <div className="text-center mb-4">
                        <button
                            onClick={handleExportExcel}
                            className="px-6 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-500 font-medium inline-flex items-center gap-2"
                        >
                            <Download size={18} />
                            Export to Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Daily Lead Summary Chart */}
            <div className="bg-white rounded-lg border border-slate-200 mb-6">
                <div className="px-6 py-4 border-b border-slate-200">
                    <h2 className="font-semibold text-slate-700">Daily Lead Summary</h2>
                </div>
                <div className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="New Leads" fill="#3b82f6" />
                            <Bar dataKey="Follow-Ups" fill="#10b981" />
                            <Bar dataKey="Missed Follow-Ups" fill="#ef4444" />
                            <Bar dataKey="Closed" fill="#f59e0b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Today Leads and Today Follow Ups Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today Leads */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="bg-blue-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2">
                        <FileText size={18} />
                        <h3 className="font-semibold text-slate-700">Today Leads</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lead Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Phone</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Created by</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Follow Ups Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Assign By</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lead Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-sm">
                                        ** No Record Found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Today Follow Ups */}
                <div className="bg-white rounded-lg border border-slate-200">
                    <div className="bg-blue-50 px-6 py-3 border-b border-slate-200 flex items-center gap-2">
                        <Calendar size={18} />
                        <h3 className="font-semibold text-slate-700">Today Follow Ups</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lead Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Phone</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Created by</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Follow Ups Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Assign By</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Lead Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-sm">
                                        ** No Record Found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMSuite;
