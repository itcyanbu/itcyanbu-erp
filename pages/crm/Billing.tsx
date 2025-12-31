import React from 'react';
import {
    CreditCard, IndianRupee, PieChart,
    ArrowUpRight, ArrowDownRight, Printer,
    Download, Filter, Search, FileText
} from 'lucide-react';

const Billing = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Billing & Accounting</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Billing</span>
                    </nav>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors font-semibold">
                        <Printer size={18} />
                        Print Reports
                    </button>
                    <button className="bg-[#1a3f6b] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a5f8b] transition-colors font-semibold">
                        <IndianRupee size={18} />
                        Add Payment
                    </button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
                    <div className="relative z-10">
                        <div className="text-slate-500 text-sm font-bold mb-2">TOTAL INCOME</div>
                        <div className="text-3xl font-black text-slate-800">₹0.00</div>
                        <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
                            <ArrowUpRight size={14} />
                            +0% from last month
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 z-0"></div>
                    <div className="relative z-10">
                        <div className="text-slate-500 text-sm font-bold mb-2">TOTAL EXPENSES</div>
                        <div className="text-3xl font-black text-slate-800">₹0.00</div>
                        <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-2">
                            <ArrowDownRight size={14} />
                            -0% from last month
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a3f6b] p-6 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 z-0"></div>
                    <div className="relative z-10 text-white">
                        <div className="text-blue-200 text-sm font-bold mb-2">OUTSTANDING BALANCE</div>
                        <div className="text-3xl font-black">₹0.00</div>
                        <div className="text-blue-300 text-xs mt-2">12 Pending Invoices</div>
                    </div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">Recent Invoices</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Search Invoices..." className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left">Invoice ID</th>
                                <th className="px-6 py-4 text-left">Customer</th>
                                <th className="px-6 py-4 text-left">Date</th>
                                <th className="px-6 py-4 text-left">Amount</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText size={48} className="text-slate-200" />
                                        <span>No invoices generated yet.</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Accounting Tools */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                {[
                    { label: 'Bank Acc.', icon: CreditCard, color: 'text-blue-600' },
                    { label: 'Taxes', icon: IndianRupee, color: 'text-orange-600' },
                    { label: 'Reports', icon: PieChart, color: 'text-indigo-600' },
                    { label: 'Statement', icon: Download, color: 'text-green-600' },
                ].map((tool, i) => (
                    <button key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-all active:scale-95 group">
                        <div className={`${tool.color} bg-slate-50 p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                            <tool.icon size={20} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{tool.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Billing;
