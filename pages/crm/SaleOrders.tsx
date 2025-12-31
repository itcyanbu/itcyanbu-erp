import React, { useState, useEffect } from 'react';
import {
    Plus, Search, ShoppingBag, Package,
    Truck, CheckCircle2, Clock, MoreVertical,
    Filter, Download
} from 'lucide-react';
import { supabase } from '../../services/supabase';

const SaleOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('crm_sale_orders')
                .select('*, crm_leads(lead_name, company)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error: any) {
            console.error('Error fetching orders:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newOrder = {
            order_number: `ORD-${Date.now().toString().slice(-6)}`,
            total_amount: parseFloat(formData.get('total_amount')?.toString() || '0'),
            delivery_date: formData.get('delivery_date'),
            status: 'Pending',
        };

        try {
            const { error } = await supabase.from('crm_sale_orders').insert([newOrder]);
            if (error) throw error;
            setShowAddModal(false);
            fetchOrders();
        } catch (error: any) {
            alert('Error adding order: ' + error.message);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Sale Orders</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Orders</span>
                    </nav>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#1a3f6b] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a5f8b] transition-colors"
                >
                    <Plus size={20} />
                    New Order
                </button>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[
                    { label: 'Total Orders', count: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Pending', count: orders.filter(o => o.status === 'Pending').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Processing', count: orders.filter(o => o.status === 'Processing').length, icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Delivered', count: orders.filter(o => o.status === 'Completed').length, icon: Truck, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                            <div className="text-2xl font-bold text-slate-800">{stat.count}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left">Order #</th>
                                <th className="px-6 py-4 text-left">Customer</th>
                                <th className="px-6 py-4 text-left">Delivery Date</th>
                                <th className="px-6 py-4 text-left">Amount</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading orders...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">No orders found. Create your first sale order!</td></tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-[#1a3f6b]">{order.order_number}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-800 font-semibold">{order.crm_leads?.lead_name}</div>
                                            <div className="text-[10px] text-slate-500 uppercase">{order.crm_leads?.company}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'Unscheduled'}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900">
                                            ₹{order.total_amount?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Pending' ? 'bg-orange-500' :
                                                        order.status === 'Processing' ? 'bg-indigo-500' :
                                                            'bg-green-500'
                                                    }`}></div>
                                                <span className="font-medium text-slate-700">{order.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Order Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-[#1a3f6b] p-5 text-white flex justify-between items-center">
                            <h3 className="text-lg font-bold">Create Sale Order</h3>
                            <button onClick={() => setShowAddModal(false)} className="hover:rotate-90 transition-transform"><Plus size={28} className="rotate-45" /></button>
                        </div>
                        <form onSubmit={handleAddOrder} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Total Amount (₹)*</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input name="total_amount" type="number" required className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1a3f6b] outline-none" placeholder="0.00" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Expected Delivery Date</label>
                                <input name="delivery_date" type="date" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1a3f6b] outline-none" />
                            </div>
                            <button type="submit" className="w-full bg-[#1a3f6b] text-white py-3.5 rounded-xl font-bold hover:bg-[#2a5f8b] transition-all hover:shadow-lg active:scale-[0.98]">
                                Generate Sale Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SaleOrders;
