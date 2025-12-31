import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Plus, Search, Box, Tag, DollarSign,
    Edit2, Trash2, Filter, Package
} from 'lucide-react';
import { supabase } from '../../services/supabase';

const Master = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const location = useLocation();

    // Get the subview name from URL (e.g. /crm/master/city -> city)
    const subPath = location.pathname.split('/').pop()?.toLowerCase() || 'products';

    const getMasterConfig = (type: string) => {
        const configs: Record<string, any> = {
            city: { title: 'City Master', columns: ['City Name', 'State', 'Country'], fields: ['name', 'state', 'country'] },
            area: { title: 'Area Master', columns: ['Area Name', 'City', 'Pincode'], fields: ['name', 'city', 'pincode'] },
            industry: { title: 'Industry Master', columns: ['Industry Name', 'Description'], fields: ['name', 'description'] },
            sources: { title: 'Lead Sources', columns: ['Source Name', 'Type'], fields: ['name', 'type'] },
            category: { title: 'Categories', columns: ['Category Name', 'Code'], fields: ['name', 'code'] },
            'service-type': { title: 'Service Types', columns: ['Service Name', 'Rate'], fields: ['name', 'rate'] },
            'follow-up-status': { title: 'Follow-up Status', columns: ['Status Name', 'Color Code'], fields: ['name', 'color'] },
            'expense-type': { title: 'Expense Types', columns: ['Expense Name', 'Category'], fields: ['name', 'category'] },
            department: { title: 'Departments', columns: ['Dept Name', 'Head'], fields: ['name', 'head'] },
            designations: { title: 'Designations', columns: ['Designation Name', 'Level'], fields: ['name', 'level'] },
            'lead-status': { title: 'Lead Status', columns: ['Status Name', 'Is Final'], fields: ['name', 'is_final'] },
            currency: { title: 'Currencies', columns: ['Currency Name', 'Symbol', 'Rate'], fields: ['name', 'symbol', 'rate'] },
            products: { title: 'Products & Services', columns: ['Product Name', 'SKU', 'Price'], fields: ['name', 'sku', 'price'] },
            email: { title: 'Email Templates', columns: ['Template Name', 'Subject'], fields: ['name', 'subject'] },
        };
        return configs[type] || configs.products;
    };

    const config = getMasterConfig(subPath);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const tableName = `crm_${subPath.replace(/-/g, '_')}`;
                const { data: dbData, error } = await supabase
                    .from(tableName)
                    .select('*')
                    .order('name', { ascending: true });

                if (error) {
                    console.warn(`Table ${tableName} not found`);
                    setData([]);
                } else {
                    setData(dbData || []);
                }
            } catch (error: any) {
                console.error('Data Fetch Error:', error.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [subPath]);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">{config.title}</h1>
                    <nav className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span>/</span>
                        <span className="hover:text-blue-600 cursor-pointer">Master</span>
                        <span>/</span>
                        <span className="text-blue-600 font-medium">{config.title}</span>
                    </nav>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#112D4E] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1a3f6b] transition-all shadow-md font-semibold"
                >
                    <Plus size={20} />
                    Add New
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                    <div className="relative w-72">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder={`Search ${config.title.toLowerCase()}...`}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#F8FAFC] text-slate-600 font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left w-12">#</th>
                                {config.columns.map((col: string, i: number) => (
                                    <th key={i} className="px-6 py-4 text-left">{col}</th>
                                ))}
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={config.columns.length + 2} className="px-6 py-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Loading master data...</span>
                                    </div>
                                </td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan={config.columns.length + 2} className="px-6 py-12 text-center text-slate-400 italic">
                                    No records found for {config.title}.
                                </td></tr>
                            ) : (
                                data.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-slate-500">{idx + 1}</td>
                                        {config.fields.map((field: string, i: number) => (
                                            <td key={i} className="px-6 py-4">
                                                <span className={i === 0 ? "font-semibold text-slate-800" : "text-slate-600"}>
                                                    {field === 'price' || field === 'rate' ? `₹${item[field]?.toLocaleString()}` : item[field] || '--'}
                                                </span>
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"><Edit2 size={16} /></button>
                                                <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div>Showing {data.length} records</div>
                    <div className="flex gap-1">
                        <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>

            {/* Modal placeholder (implementation truncated for brevity) */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-[#112D4E] p-4 text-white flex justify-between items-center">
                            <h3 className="text-lg font-bold">Add New {config.title}</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-white hover:text-gray-200 transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4">Form implementation for {config.title} would go here.</p>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="w-full bg-[#112D4E] text-white py-2 rounded font-bold"
                            >Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Master;
