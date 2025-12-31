import React, { useState, useEffect } from 'react';
import {
    Plus, Search, FileText, Download, Edit2,
    Trash2, Mail, ExternalLink, Filter, RotateCcw
} from 'lucide-react';
import { supabase } from '../../services/supabase';

const Quotations = () => {
    const [quotations, setQuotations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchQuotations();
    }, []);

    const fetchQuotations = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('crm_quotations')
                .select('*, crm_leads(lead_name, company)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setQuotations(data || []);
        } catch (error: any) {
            console.error('Error fetching quotations:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuotation = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newQuotation = {
            quotation_number: `QTN-${Date.now().toString().slice(-6)}`,
            total_amount: parseFloat(formData.get('total_amount')?.toString() || '0'),
            valid_until: formData.get('valid_until'),
            status: 'Draft',
            notes: formData.get('notes'),
        };

        try {
            const { error } = await supabase.from('crm_quotations').insert([newQuotation]);
            if (error) throw error;
            setShowAddModal(false);
            fetchQuotations();
        } catch (error: any) {
            alert('Error adding quotation: ' + error.message);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Quotations</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Quotations</span>
                    </nav>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#1a3f6b] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a5f8b] transition-colors"
                >
                    <Plus size={20} />
                    New Quotation
                </button>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by number or customer..."
                                className="w-full pl-9 pr-4 py-1.5 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            />
                        </div>
                        <button className="p-1.5 hover:bg-slate-200 rounded text-slate-500 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left">Quote #</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-left">Valid Until</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
                            ) : quotations.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">No quotations found. Start by creating one.</td></tr>
                            ) : (
                                quotations.map((q) => (
                                    <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-blue-600">{q.quotation_number}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-800 font-medium">{q.crm_leads?.lead_name || 'Walk-in'}</div>
                                            <div className="text-xs text-slate-500">{q.crm_leads?.company}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {q.valid_until ? new Date(q.valid_until).toLocaleDateString() : '--'}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800">
                                            ₹{q.total_amount?.toLocaleString() || '0'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${q.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                    q.status === 'Draft' ? 'bg-slate-100 text-slate-600' :
                                                        q.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-red-100 text-red-700'
                                                }`}>
                                                {q.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <button className="text-slate-400 hover:text-blue-600" title="Edit"><Edit2 size={16} /></button>
                                                <button className="text-slate-400 hover:text-slate-600" title="Email"><Mail size={16} /></button>
                                                <button className="text-slate-400 hover:text-green-600" title="View PDF"><ExternalLink size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Quotation Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden text-sm">
                        <div className="bg-[#1a3f6b] p-4 text-white flex justify-between items-center">
                            <h3 className="text-base font-bold uppercase tracking-wider">New Quotation</h3>
                            <button onClick={() => setShowAddModal(false)}><Plus size={24} className="rotate-45" /></button>
                        </div>
                        <form onSubmit={handleAddQuotation} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Total Amount (₹)*</label>
                                <input name="total_amount" type="number" required className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valid Until</label>
                                <input name="valid_until" type="date" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Terms & Notes</label>
                                <textarea name="notes" rows={4} className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-[#1a3f6b] text-white py-3 rounded font-bold hover:bg-[#2a5f8b] transition-colors shadow-lg">
                                Create Quotation
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quotations;
