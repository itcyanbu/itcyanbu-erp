import React, { useState } from 'react';
import { Users, Calendar, FileText, Download, Mail } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CRMDashboard = () => {
    const [startDate, setStartDate] = useState('26/12/2025');
    const [endDate, setEndDate] = useState('31/12/2025');
    const [filterType, setFilterType] = useState('All');

    const leadCategories = [
        { name: 'New Leads', count: 0 },
        { name: 'Follow Ups', count: 0 },
        { name: 'Missed Follow Ups', count: 0 },
        { name: 'Delayed Followups', count: 0 },
        { name: 'Not Interested', count: 0 },
        { name: 'Closed Leads', count: 0 },
        { name: 'Suspect Leads', count: 0 },
        { name: 'Prospects Lead', count: 0 },
        { name: 'Assigned To Others', count: 0 },
    ];

    const chartData = [
        { date: '27/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '28/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '29/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '30/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
        { date: '31/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
    ];

    return (
        <div className="p-4 bg-[#F8FAFC] min-h-screen">
            {/* Dashboard Header Tab */}
            <div className="mb-4">
                <div className="inline-block bg-[#112D4E] text-white px-8 py-2 rounded-t-lg rounded-b-none text-sm font-bold shadow-sm">
                    Dashboard
                </div>
                <div className="h-[2px] bg-[#112D4E] w-full -mt-[2px]"></div>
            </div>

            {/* Lead Report Container */}
            <div className="bg-white rounded shadow-sm border border-slate-200 mb-8 mt-2 overflow-hidden">
                <div className="bg-[#EBF5FB] px-4 py-2.5 border-b border-[#D4E6F1]">
                    <h2 className="text-slate-600 text-sm font-bold">Lead Report</h2>
                </div>

                {/* Filters Row */}
                <div className="p-4 bg-white">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="relative min-w-[220px]">
                            <select
                                className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-1.5 outline-none appearance-none pr-8 text-slate-700"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option>All</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-[#F1F1F1] border border-slate-300 px-3 py-1.5 rounded text-sm w-36 outline-none text-center text-slate-700"
                        />
                        <input
                            type="text"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-[#F1F1F1] border border-slate-300 px-3 py-1.5 rounded text-sm w-36 outline-none text-center text-slate-700"
                        />
                        <button className="bg-[#5CB85C] text-white px-8 py-1.5 rounded text-sm font-bold shadow-sm hover:bg-[#4cae4c] transition-colors">Filter</button>
                        <button className="bg-[#D9534F] text-white px-8 py-1.5 rounded text-sm font-bold shadow-sm hover:bg-[#d43f3a] transition-colors">Reset</button>
                    </div>
                </div>

                {/* Status Table & Chart Split */}
                <div className="flex flex-col lg:flex-row p-4 gap-6 bg-white border-t border-slate-50">
                    <div className="flex-1">
                        <div className="rounded border border-[#D4E6F1] overflow-hidden">
                            <table className="w-full text-sm border-collapse">
                                <tbody>
                                    {leadCategories.map((cat, idx) => (
                                        <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FBFC]'} border-b border-[#E6F4F9] last:border-0`}>
                                            <td className="px-4 py-2.5 font-bold text-slate-700">{cat.name}</td>
                                            <td className="px-4 py-2.5 text-center font-bold text-blue-600 border-l border-[#E6F4F9] w-[80px]">{cat.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex-[1.5] border border-slate-100 flex items-center justify-center min-h-[350px] rounded bg-white relative shadow-inner">
                        <span className="text-slate-400 text-xs font-medium">No data to display.</span>
                        {/* Right side collapse indicator */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#F1F4F9] border border-slate-200 rounded-l p-1 cursor-pointer hover:bg-slate-100">
                            <div className="text-[10px] transform rotate-90 text-slate-500 font-bold tracking-widest">&gt;.&lt;</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered Export Button */}
            <div className="flex justify-center mb-8">
                <button className="bg-[#5BC0DE] hover:bg-[#46B8DA] text-white px-8 py-1.5 rounded text-xs font-bold shadow-sm transition-colors uppercase tracking-wider">
                    Export to Excel
                </button>
            </div>

            {/* Daily Lead Summary Chart */}
            <div className="bg-white rounded border border-slate-200 mb-8 p-6 shadow-sm">
                <h3 className="text-center font-bold text-slate-600 mb-8">Daily Lead Summary</h3>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barGap={8}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="date" fontSize={11} stroke="#64748b" tickMargin={10} />
                            <YAxis axisLine={false} tickLine={false} fontSize={11} stroke="#64748b" domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]} />
                            <Tooltip cursor={{ fill: '#F1F5F9' }} />
                            <Legend align="center" verticalAlign="bottom" iconType="rect" iconSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '30px' }} />
                            <Bar dataKey="New Leads" fill="#D1D5DB" barSize={35} />
                            <Bar dataKey="Follow-Ups" fill="#9CA3AF" barSize={35} />
                            <Bar dataKey="Missed Follow-Ups" fill="#F87171" barSize={35} />
                            <Bar dataKey="Closed" fill="#FBBF24" barSize={35} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-center mt-4 text-[10px] text-slate-400">
                    Dates
                </div>
                <div className="mt-6 text-[10px] text-slate-400 flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                    FusionCharts Trial
                </div>
            </div>

            {/* Bottom Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Today Leads */}
                <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-[#EBF5FB] px-4 py-2.5 border-b border-[#D4E6F1] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-[#112D4E]" />
                            <h4 className="font-bold text-xs text-[#112D4E] uppercase tracking-tight">Today Leads</h4>
                        </div>
                        <div className="bg-white border border-slate-200 rounded p-0.5 text-[8px] text-slate-400">
                            &gt;.&lt;
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] whitespace-nowrap">
                            <thead className="bg-[#E6F4F9]">
                                <tr>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Lead Name</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Phone</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Email</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Created by</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Follow Ups Date</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Assign By</th>
                                    <th className="px-3 py-3 text-center text-[#112D4E] font-bold">Lead Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-slate-700 font-medium italic">
                                        ** No Record Found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end p-1 border-t border-slate-100">
                        <div className="bg-[#EBF5FB] border border-[#D4E6F1] rounded p-0.5 text-[8px] text-[#112D4E]">
                            &gt;.&lt;
                        </div>
                    </div>
                </div>

                {/* Today Follow Ups */}
                <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-[#EBF5FB] px-4 py-2.5 border-b border-[#D4E6F1] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-[#112D4E]" />
                            <h4 className="font-bold text-xs text-[#112D4E] uppercase tracking-tight">Today Follow Ups</h4>
                        </div>
                        <div className="bg-white border border-slate-200 rounded p-0.5 text-[8px] text-slate-400">
                            &gt;.&lt;
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] whitespace-nowrap">
                            <thead className="bg-[#E6F4F9]">
                                <tr>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Lead Name</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Phone</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Email</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Created by</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Follow Ups Date</th>
                                    <th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Assign By</th>
                                    <th className="px-3 py-3 text-center text-[#112D4E] font-bold">Lead Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-slate-700 font-medium italic">
                                        ** No Record Found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end p-1 border-t border-slate-100">
                        <div className="bg-[#EBF5FB] border border-[#D4E6F1] rounded p-0.5 text-[8px] text-[#112D4E]">
                            &gt;.&lt;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMDashboard;
