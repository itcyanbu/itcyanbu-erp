import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Filter, Download, MoreVertical,
    Ticket, Clock, User, Edit2, Trash2,
    AlertCircle, CheckCircle2, MessageSquare
} from 'lucide-react';
import { supabase } from '../../services/supabase';

const Tickets = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('crm_tickets')
                .select('*, crm_leads(lead_name)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTickets(data || []);
        } catch (error: any) {
            console.error('Error fetching tickets:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newTicket = {
            ticket_number: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            status: 'Open',
            category: formData.get('category'),
        };

        try {
            const { error } = await supabase.from('crm_tickets').insert([newTicket]);
            if (error) throw error;
            setShowAddModal(false);
            fetchTickets();
        } catch (error: any) {
            alert('Error adding ticket: ' + error.message);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Tickets Management</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Tickets</span>
                    </nav>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#1a3f6b] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a5f8b] transition-colors"
                >
                    <Plus size={20} />
                    New Ticket
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Tickets', count: tickets.length, color: 'text-blue-600', icon: Ticket },
                    { label: 'Open', count: tickets.filter(t => t.status === 'Open').length, color: 'text-orange-600', icon: AlertCircle },
                    { label: 'In Progress', count: tickets.filter(t => t.status === 'In Progress').length, color: 'text-blue-500', icon: MessageSquare },
                    { label: 'Resolved', count: tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length, color: 'text-green-600', icon: CheckCircle2 },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
                            <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
                        </div>
                        <stat.icon size={24} className={stat.color} />
                    </div>
                ))}
            </div>

            {/* Tickets Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Ticket Info</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">Loading tickets...</td>
                                </tr>
                            ) : tickets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No tickets found.</td>
                                </tr>
                            ) : (
                                tickets.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50 transition-colors text-sm">
                                        <td className="px-4 py-4">
                                            <div className="font-semibold text-slate-800">{t.ticket_number}</div>
                                            <div className="text-slate-600 truncate max-w-[200px]">{t.title}</div>
                                        </td>
                                        <td className="px-4 py-4 text-slate-600">
                                            {t.crm_leads?.lead_name || 'Anonymous'}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${t.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                    t.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                        t.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-slate-100 text-slate-700'
                                                }`}>
                                                {t.priority}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1">
                                                <div className={`w-2 h-2 rounded-full ${t.status === 'Open' ? 'bg-red-500' :
                                                        t.status === 'In Progress' ? 'bg-blue-500' :
                                                            'bg-green-500'
                                                    }`}></div>
                                                <span className="text-slate-700 font-medium">{t.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-slate-500">
                                            {new Date(t.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-600">
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Ticket Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-[#1a3f6b] p-4 text-white flex justify-between items-center">
                            <h3 className="text-lg font-bold">Create New Ticket</h3>
                            <button onClick={() => setShowAddModal(false)}><Plus size={24} className="rotate-45" /></button>
                        </div>
                        <form onSubmit={handleAddTicket} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Subject*</label>
                                <input name="title" required className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea name="description" rows={3} className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                                    <select name="priority" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="Low">Low</option>
                                        <option value="Medium" selected>Medium</option>
                                        <option value="High">High</option>
                                        <option value="Critical">Critical</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select name="category" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="Technical">Technical</option>
                                        <option value="Billing">Billing</option>
                                        <option value="Support">Support</option>
                                        <option value="Feedback">Feedback</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-[#1a3f6b] text-white py-3 rounded-lg font-bold hover:bg-[#2a5f8b] transition-colors">
                                Create Ticket
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tickets;
