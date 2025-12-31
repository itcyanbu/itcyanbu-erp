import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Plus, Search, Filter, Download, MoreVertical,
    Phone, Mail, Building, Clock, User, Edit2, Trash2,
    Lock, Share2, Upload, RotateCcw, CirclePlus, Bold, Italic, Underline,
    ListOrdered, Type, AlignLeft, AlignCenter, AlignRight, FileJson, Link as LinkIcon,
    Image as ImageIcon, Video, ChevronDown, List, X, FileText, FileArchive,
    FileSpreadsheet, FolderPlus, LayoutGrid, ListTodo, FileBarChart
} from 'lucide-react';
import { supabase } from '../../services/supabase';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Leads = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [masterModal, setMasterModal] = useState<{ type: string, title: string } | null>(null);
    const [newMasterValue, setNewMasterValue] = useState('');
    const [leadFile, setLeadFile] = useState<string>('No file chosen');
    const [fbFile, setFbFile] = useState<string>('No file chosen');
    const location = useLocation();

    const subPath = location.pathname.split('/').pop()?.toLowerCase() || 'list';

    const getLeadsConfig = (type: string) => {
        const configs: Record<string, any> = {
            list: { title: 'Lead Management', filter: 'active' },
            'transfer-lead': { title: 'Transfer Leads', filter: 'transfer' },
            'blocked-lead': { title: 'Blocked Leads', filter: 'blocked' },
            'assign-bulk': { title: 'Bulk Assignment', filter: 'bulk' },
            'bulk-excel': { title: 'Bulk Import/Export', filter: 'excel' },
            'report': { title: 'Assign To & By Report', filter: 'report' },
            'new': { title: 'Create New Lead', filter: 'new' },
            'files': { title: 'File Manager', filter: 'files' },
            'assigned': { title: 'Leads Assigned To Me', filter: 'assigned' },
            'summary': { title: 'Leads Summary', filter: 'summary' },
            'monthly': { title: 'Monthly Lead Report', filter: 'monthly' },
            'view': { title: 'View Lead', filter: 'view' },
            'view-report': { title: 'View Leads Report', filter: 'view-report' },
        };
        return configs[type] || configs.list;
    };

    const config = getLeadsConfig(subPath);

    useEffect(() => {
        const fetchLeads = async () => {
            if (['report', 'new', 'files', 'summary', 'monthly', 'assigned'].includes(subPath)) return;
            try {
                setLoading(true);
                let query = supabase.from('crm_leads').select('*');
                if (subPath === 'blocked-lead') {
                    query = query.eq('status', 'Blocked');
                } else if (subPath === 'list' || subPath === 'leads') {
                    query = query.neq('status', 'Blocked');
                }
                const { data, error } = await query.order('created_at', { ascending: false });
                if (error) throw error;
                setLeads(data || []);
            } catch (error: any) {
                console.error('Error fetching leads:', error.message);
                setLeads([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, [subPath]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'New Lead': return 'bg-blue-100 text-blue-700';
            case 'Follow Up': return 'bg-yellow-100 text-yellow-700';
            case 'Interested': return 'bg-emerald-100 text-emerald-700';
            case 'Not Interested': return 'bg-slate-200 text-slate-600';
            case 'Converted': return 'bg-green-100 text-green-700';
            case 'Lost': return 'bg-red-50 text-red-600';
            case 'Blocked': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    // --- Render All Views ---
    let viewJSX;
    if (subPath === 'new') {
        const inputClass = "w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium";
        const labelClass = "text-[11px] font-bold text-slate-600 uppercase tracking-wider min-w-[140px]";
        const rowClass = "flex items-center gap-4 mb-4";

        viewJSX = (
            <div className="p-4 bg-[#F8FAFC] min-h-screen relative">
                {/* Header Action Bar */}
                <div className="bg-[#EBF5FB] px-4 py-2.5 flex justify-between items-center border border-[#D4E6F1] rounded-lg shadow-sm mb-6">
                    <div className="flex items-center gap-2">
                        <Plus size={18} className="text-[#112D4E]" />
                        <span className="text-[#112D4E] font-bold text-sm uppercase tracking-tight">Create New Lead</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#5CB85C] text-white px-6 py-2 rounded text-xs font-bold shadow-md hover:bg-[#4cae4c] transition-all flex items-center gap-2">
                            SAVE LEAD
                        </button>
                        <button className="bg-[#D9534F] text-white px-6 py-2 rounded text-xs font-bold shadow-md hover:bg-[#d43f3a] transition-all">
                            BACK
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 px-2 max-w-[1600px] mx-auto">
                    {/* Left Column: Form Fields */}
                    <div className="xl:col-span-7 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                        <div className="mb-8 pb-4 border-b border-slate-100 flex items-center gap-2">
                            <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Lead Information</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-1">
                            {[
                                { label: 'Lead Owner', type: 'select', options: ['Admin User', 'Sales Manager', 'Account Executive'], hasAdd: true },
                                { label: 'Lead Status*', type: 'select', value: 'New Lead', options: ['New Lead', 'Follow Up', 'Interested', 'Not Interested', 'Converted', 'Lost', 'Blocked'], hasAdd: true },
                                { label: 'Customer Name*', type: 'text', placeholder: 'Enter Name' },
                                { label: 'Designation', type: 'text', placeholder: 'Job Title' },
                                { label: 'Organization Name', type: 'text', placeholder: 'Organization / Company Name' },
                                { label: 'Industry', type: 'select', options: ['Technology', 'Manufacturing', 'Finance', 'Services', 'Retail'], hasAdd: true },
                                { label: 'Project Name', type: 'text', placeholder: 'Associated Project', hasAdd: true },
                                { label: 'Mobile Number*', type: 'text', placeholder: 'Primary Mobile No' },
                                { label: 'WhatsApp Number', type: 'text', placeholder: 'WhatsApp No' },
                                { label: 'Alternate No', type: 'text', placeholder: 'Optional Contact' },
                                { label: 'Customer e-mail', type: 'email', placeholder: 'Email Address' },
                                { label: 'URL', type: 'text', placeholder: 'Website or Social Link' },
                                { label: 'Country', type: 'select', options: ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Oman', 'Bahrain'], hasAdd: true },
                                { label: 'State', type: 'text', placeholder: 'State/Province' },
                                { label: 'City/Location', type: 'text', placeholder: 'City Name' },
                                { label: 'Time Zone Name', type: 'select', options: ['Asia/Riyadh', 'UTC', 'GST', 'AST +3'], hasAdd: true },
                                { label: 'Reference By', type: 'text', placeholder: 'Who referred this lead?' },
                                { label: 'Lead Source', type: 'select', options: ['Website', 'Social Media', 'Referral', 'Exhibition'], hasAdd: true },
                                { label: 'Lead Category', type: 'select', options: ['Hot', 'Warm', 'Cold'], hasAdd: true },
                                { label: 'Expected Deal Amount', type: 'text', placeholder: '0.00' },
                                { label: 'Expected Closing', type: 'date' },
                                { label: 'Product Type', type: 'select', options: ['Software Sales', 'Consulting', 'Support'], hasAdd: true },
                                { label: 'Follow Up Date*', type: 'date' },
                                { label: 'Follow Up Time', type: 'time' },
                                { label: 'Follow Up Time in Asia/Riyadh', type: 'text', placeholder: 'Automatic Riyadh Time' },
                                { label: 'Date', type: 'date' },
                                { label: 'Created Date', type: 'date', value: new Date().toISOString().split('T')[0] },
                                { label: 'Date Of Birth', type: 'date' },
                                { label: 'Marriage Anniversary', type: 'date' },
                                { label: 'Address', type: 'textarea', placeholder: 'Full Address Details' },
                            ].map((field, i) => (
                                <div key={i} className={rowClass}>
                                    <label className={labelClass}>
                                        {field.label.replace(/\*/g, '')}
                                        {field.label.includes('*') && <span className="text-red-500 ml-0.5">*</span>}
                                    </label>
                                    <div className="flex-1 flex gap-2 items-center">
                                        {field.type === 'select' ? (
                                            <div className="relative flex-1">
                                                <select className={`${inputClass} appearance-none pr-8 cursor-pointer`}>
                                                    <option>{field.value || `Select ${field.label.replace(/\*/g, '')}`}</option>
                                                    {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                                                </select>
                                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                            </div>
                                        ) : field.type === 'textarea' ? (
                                            <textarea placeholder={field.placeholder} className={`${inputClass} h-24 resize-none py-2`}></textarea>
                                        ) : (
                                            <input type={field.type} placeholder={field.placeholder} className={inputClass} defaultValue={field.value} />
                                        )}
                                        {field.hasAdd && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cleanLabel = field.label.replace(/\*/g, '').trim();
                                                    setMasterModal({ type: cleanLabel, title: `Add New ${cleanLabel}` });
                                                }}
                                                className="px-3 py-2 bg-blue-50/50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all text-blue-600 shadow-sm hover:shadow-md active:scale-95 group flex-shrink-0 z-10"
                                                title={`Add new ${field.label.replace(/\*/g, '').trim()}`}
                                            >
                                                <CirclePlus size={16} className="group-hover:rotate-90 transition-transform duration-300 pointer-events-none" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Ownership & Description */}
                    <div className="xl:col-span-5 flex flex-col gap-8">
                        {/* Ownership & Image Section */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 -mr-16 -mt-16 rounded-full"></div>
                            <div className="flex flex-col items-center gap-6">
                                <div className="group relative">
                                    <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center shadow-lg relative z-10 transition-transform group-hover:scale-105">
                                        <ImageIcon size={32} className="text-slate-400" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setMasterModal({ type: 'Lead Image', title: 'Upload Lead Profile Image' })}
                                        className="absolute bottom-0 right-0 z-20 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-all hover:scale-110 active:scale-90"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 relative z-10">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Manager</span>
                                    <span className="text-xl font-bold text-[#112D4E] uppercase tracking-tight">System Admin</span>
                                </div>
                                <div className="w-full h-px bg-slate-100 my-2"></div>
                                <div className="grid grid-cols-2 w-full gap-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                                    <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg">
                                        <span className="text-[9px] text-slate-400">Created At</span>
                                        <span className="text-slate-700">{new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg">
                                        <span className="text-[9px] text-slate-400">IP Address</span>
                                        <span className="text-slate-700 italic">192.168.1.XX</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                            <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Add Description</h2>
                                </div>
                                <span className="text-red-500 font-bold text-xs">* Required</span>
                            </div>

                            <div className="border border-slate-300 rounded-lg overflow-hidden flex-1 flex flex-col bg-slate-50/30">
                                <div className="bg-white border-b border-slate-300 p-2.5 flex flex-wrap gap-1.5 shadow-sm">
                                    <div className="flex gap-1 pr-3 border-r border-slate-200">
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><Bold size={15} /></button>
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><Italic size={15} /></button>
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><Underline size={15} /></button>
                                    </div>
                                    <div className="flex gap-1 px-3 border-r border-slate-200">
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><AlignLeft size={15} /></button>
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><AlignCenter size={15} /></button>
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><AlignRight size={15} /></button>
                                    </div>
                                    <div className="flex gap-1 pl-3">
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><FileJson size={15} /></button>
                                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 transition-colors"><LinkIcon size={15} /></button>
                                    </div>
                                </div>
                                <textarea className="w-full h-[450px] p-6 outline-none resize-none text-sm bg-white font-medium text-slate-700 leading-relaxed" placeholder="Type detailed lead notes, requirements, or meeting outcome here..."></textarea>
                            </div>

                            <div className="mt-8">
                                <button className="w-full bg-[#112D4E] text-white py-4 rounded-xl text-sm font-bold shadow-lg hover:bg-[#1a3f6b] transition-all transform hover:-translate-y-1 uppercase tracking-[3px]">
                                    Complete Lead Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (subPath === 'files') {
        const rowClass = "flex items-center gap-4 mb-4";
        const inputClass = "w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium";

        viewJSX = (
            <div className="p-4 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 mb-1">File Manager</h1>
                        <nav className="text-xs text-slate-500 flex items-center gap-2">
                            <span>CRM / Leads / File Manager</span>
                        </nav>
                    </div>
                    <button className="bg-[#112D4E] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1a3f6b] transition-all shadow-md">
                        <Upload size={18} /> Upload File
                    </button>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-[#E6F4F9] border-b border-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-[#112D4E]">File Name</th>
                                <th className="px-6 py-4 text-left font-bold text-[#112D4E]">Category</th>
                                <th className="px-6 py-4 text-left font-bold text-[#112D4E]">Size</th>
                                <th className="px-6 py-4 text-left font-bold text-[#112D4E]">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">No files found.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else if (subPath === 'summary') {
        const mockSummary = [
            { id: 1, org: 'Global Tech Solutions', name: 'John Doe', mobile: '+966 50 123 4567', country: 'Saudi Arabia', followDate: '01/01/2026', followTime: '10:00 AM', assignTo: 'Admin', assignDate: '31/12/2025', status: 'New Lead', source: 'Website' },
            { id: 2, org: 'Vision Corp', name: 'Sarah Ahmed', mobile: '+966 55 987 6543', country: 'UAE', followDate: '02/01/2026', followTime: '11:00 AM', assignTo: 'Amna', assignDate: '30/12/2025', status: 'Follow Up', source: 'Referral' },
        ];

        viewJSX = (
            <div className="p-4 bg-[#F8FAFC] min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 mb-1">Leads Summary</h1>
                        <nav className="text-xs text-slate-500 flex items-center gap-2">
                            <span>CRM / Leads / Leads Summary</span>
                        </nav>
                    </div>
                </div>

                {/* Filter Panel */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Search Lead</label>
                            <input type="text" placeholder="Organization or Lead Name..." className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Assign To</label>
                            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none">
                                <option>Select User</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Status</label>
                            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none">
                                <option>All Status</option>
                                <option>New Lead</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Date Range</label>
                            <div className="flex items-center gap-2">
                                <input type="text" defaultValue="01/12/2025" className="w-full border border-slate-300 rounded-lg px-2 py-2 text-xs text-center bg-slate-50 shadow-inner" />
                                <input type="text" defaultValue="31/12/2025" className="w-full border border-slate-300 rounded-lg px-2 py-2 text-xs text-center bg-slate-50 shadow-inner" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-[#5CB85C] text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-[#4cae4c]">Filter</button>
                            <button className="flex-1 bg-[#D9534F] text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-[#d43f3a]">Reset</button>
                        </div>
                    </div>
                </div>

                {/* Report Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] whitespace-nowrap">
                            <thead className="bg-[#EBF5FB]">
                                <tr>
                                    <th className="px-4 py-3.5 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold">Sr.No.</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Organization Name</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Lead Name</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Mobile No</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Country</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Follow Up Date</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Follow Up Time</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Assign To</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Assign Date</th>
                                    <th className="px-4 py-3.5 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Status</th>
                                    <th className="px-4 py-3.5 text-left text-[#112D4E] font-bold uppercase tracking-tight">Lead Source</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {mockSummary.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 text-center border-r border-slate-50 font-bold text-slate-500">{idx + 1}</td>
                                        <td className="px-4 py-3 border-r border-slate-50 font-bold text-slate-800">{item.org}</td>
                                        <td className="px-4 py-3 border-r border-slate-50 font-medium">{item.name}</td>
                                        <td className="px-4 py-3 border-r border-slate-50">{item.mobile}</td>
                                        <td className="px-4 py-3 border-r border-slate-50">{item.country}</td>
                                        <td className="px-4 py-3 border-r border-slate-50 font-bold">{item.followDate}</td>
                                        <td className="px-4 py-3 border-r border-slate-50">{item.followTime}</td>
                                        <td className="px-4 py-3 border-r border-slate-50">
                                            <span className="bg-blue-50 text-[#112D4E] px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">{item.assignTo}</span>
                                        </td>
                                        <td className="px-4 py-3 border-r border-slate-50">{item.assignDate}</td>
                                        <td className="px-4 py-3 border-r border-slate-50">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold shadow-sm ${getStatusStyle(item.status)}`}>{item.status}</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-500">{item.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-medium">
                        <span>Showing 1 to 2 of 2 entries</span>
                        <div className="flex gap-1">
                            <button className="px-3 py-1 bg-white border border-slate-300 rounded">Previous</button>
                            <button className="px-3 py-1 bg-[#112D4E] text-white rounded">1</button>
                            <button className="px-3 py-1 bg-white border border-slate-300 rounded">Next</button>
                        </div>
                    </div>
                </div>

                {/* Daily Lead Summary Chart */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-8 mt-12">
                    <h3 className="text-center font-bold text-slate-600 mb-8">Daily Lead Summary</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { date: '27/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
                                    { date: '28/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
                                    { date: '29/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
                                    { date: '30/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
                                    { date: '31/12/2025', 'New Leads': 0, 'Follow-Ups': 0, 'Missed Follow-Ups': 0, 'Closed': 0 },
                                ]}
                                barGap={8}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="date" fontSize={11} stroke="#64748b" tickMargin={10} />
                                <YAxis axisLine={false} tickLine={false} fontSize={11} stroke="#64748b" domain={[0, 1]} />
                                <Tooltip />
                                <Legend align="center" verticalAlign="bottom" iconType="rect" iconSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '30px' }} />
                                <Bar dataKey="New Leads" fill="#D1D5DB" barSize={35} />
                                <Bar dataKey="Follow-Ups" fill="#9CA3AF" barSize={35} />
                                <Bar dataKey="Missed Follow-Ups" fill="#F87171" barSize={35} />
                                <Bar dataKey="Closed" fill="#FBBF24" barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Today Leads Area */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-[#EBF5FB] px-4 py-2.5 border-b border-[#D4E6F1] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ListTodo size={16} className="text-[#112D4E]" />
                                <h4 className="font-bold text-xs text-[#112D4E] uppercase tracking-tight">Today Leads</h4>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-[11px] whitespace-nowrap"><thead className="bg-[#E6F4F9]"><tr><th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Lead Name</th><th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Phone</th><th className="px-3 py-3 text-center text-[#112D4E] font-bold">Lead Status</th></tr></thead><tbody><tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic">** No Record Found.</td></tr></tbody></table>
                        </div>
                    </div>
                    {/* Today Follow Ups Area */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-[#EBF5FB] px-4 py-2.5 border-b border-[#D4E6F1] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-[#112D4E]" />
                                <h4 className="font-bold text-xs text-[#112D4E] uppercase tracking-tight">Today Follow Ups</h4>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-[11px] whitespace-nowrap"><thead className="bg-[#E6F4F9]"><tr><th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Lead Name</th><th className="px-3 py-3 text-center border-r border-white/50 text-[#112D4E] font-bold">Phone</th><th className="px-3 py-3 text-center text-[#112D4E] font-bold">Lead Status</th></tr></thead><tbody><tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic">** No Record Found.</td></tr></tbody></table>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (subPath === 'assigned') {
        const mockAssignedLeads = [
            { id: 1, date: '31/12/2025', name: 'John Doe', company: 'Global Tech', phone: '+966 50 123 4567', status: 'New Lead', assignedBy: 'Admin', followUp: '05/01/2026 10:00 AM' },
        ];

        viewJSX = (
            <div className="p-4 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 mb-1">Leads Assigned To Me</h1>
                        <nav className="text-xs text-slate-500 flex items-center gap-2">
                            <span>CRM / Leads / Assigned To Me</span>
                        </nav>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Search Lead</label>
                            <input type="text" placeholder="Name, Phone or Company..." className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Status</label>
                            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none">
                                <option>All Status</option>
                                <option>New Lead</option>
                                <option>Follow Up</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Follow Up Range</label>
                            <div className="flex items-center gap-2">
                                <input type="text" defaultValue="01/12/2025" className="w-full border border-slate-300 rounded-lg px-2 py-2 text-xs text-center bg-slate-50 shadow-inner" />
                                <input type="text" defaultValue="31/12/2025" className="w-full border border-slate-300 rounded-lg px-2 py-2 text-xs text-center bg-slate-50 shadow-inner" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-[#5CB85C] text-white px-4 py-2 rounded-lg text-sm font-bold shadow">Apply</button>
                            <button className="flex-1 bg-[#D9534F] text-white px-4 py-2 rounded-lg text-sm font-bold shadow">Reset</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[12px] whitespace-nowrap">
                            <thead className="bg-[#E6F4F9]">
                                <tr>
                                    <th className="px-4 py-4 text-left border-r border-white/50 text-[#112D4E] font-bold">Sr.</th>
                                    <th className="px-4 py-4 text-left border-r border-white/50 text-[#112D4E] font-bold">Assigned Date</th>
                                    <th className="px-4 py-4 text-left border-r border-white/50 text-[#112D4E] font-bold">Lead Details</th>
                                    <th className="px-4 py-4 text-left border-r border-white/50 text-[#112D4E] font-bold">Contact Info</th>
                                    <th className="px-4 py-4 text-left border-r border-white/50 text-[#112D4E] font-bold">Assigned By</th>
                                    <th className="px-4 py-4 text-left border-r border-white/50 text-[#112D4E] font-bold">Lead Status</th>
                                    <th className="px-4 py-4 text-left border-r border-white/50 text-[#112D4E] font-bold">Next Follow Up</th>
                                    <th className="px-4 py-4 text-right text-[#112D4E] font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {mockAssignedLeads.map((lead, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-4 text-slate-500 font-medium">{idx + 1}</td>
                                        <td className="px-4 py-4 text-slate-600 font-medium">{lead.date}</td>
                                        <td className="px-4 py-4">
                                            <div className="font-bold text-slate-800">{lead.name}</div>
                                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{lead.company}</div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-700">{lead.phone}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 font-bold">{lead.assignedBy[0]}</div>
                                                <span className="text-slate-700 font-medium">{lead.assignedBy}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusStyle(lead.status)}`}>{lead.status}</span>
                                        </td>
                                        <td className="px-4 py-4 text-slate-600 font-medium">{lead.followUp}</td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button className="p-1 hover:bg-blue-50 text-blue-600"><Edit2 size={16} /></button>
                                                <button className="p-1 hover:bg-slate-50 text-slate-400"><MoreVertical size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else if (subPath === 'monthly') {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        viewJSX = (
            <div className="p-4 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 mb-1">Monthly Lead Report</h1>
                        <nav className="text-xs text-slate-500 flex items-center gap-2">
                            <span>CRM / Leads / Monthly Report</span>
                        </nav>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-end shadow-sm">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Select Year</label>
                        <select className="border border-slate-300 rounded px-3 py-1.5 text-sm outline-none min-w-[150px]">
                            <option>2025</option>
                            <option>2026</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Select Month</label>
                        <select className="border border-slate-300 rounded px-3 py-1.5 text-sm outline-none min-w-[150px]">
                            <option>December</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#5CB85C] text-white px-8 py-1.5 rounded text-sm font-bold shadow hover:bg-[#4cae4c]">Show Report</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] whitespace-nowrap">
                            <thead className="bg-[#EBF5FB]">
                                <tr>
                                    <th className="px-4 py-4 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Month</th>
                                    <th className="px-4 py-4 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">New Leads</th>
                                    <th className="px-4 py-4 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Follow Ups</th>
                                    <th className="px-4 py-4 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Converted</th>
                                    <th className="px-4 py-4 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Lost</th>
                                    <th className="px-4 py-4 text-center text-[#112D4E] font-bold uppercase tracking-tight">Conversion Rate (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {months.map((m, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 text-center border-r border-slate-50 font-bold text-slate-700">{m}</td>
                                        <td className="px-4 py-3 text-center border-r border-slate-50">0</td>
                                        <td className="px-4 py-3 text-center border-r border-slate-50">0</td>
                                        <td className="px-4 py-3 text-center border-r border-slate-50 font-bold text-green-600">0</td>
                                        <td className="px-4 py-3 text-center border-r border-slate-50 text-red-500">0</td>
                                        <td className="px-4 py-3 text-center font-bold text-blue-600">0.00%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else if (subPath === 'view-report') {
        const tableColumns = [
            'S.No', 'Customer Name', 'Mobile Number', 'Follow Up Date', 'Customer e-mail',
            'City/Location', 'Created By', 'Created Date', 'Assigned By', 'Assigned To',
            'Assigned Date', 'Modified Date', 'Lead Status', 'Expected Closing Date',
            'Expected Deal Amount', 'Action'
        ];

        viewJSX = (
            <div className="p-4 bg-slate-50 min-h-screen">
                {/* Top Uploader Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex-1 flex items-center border border-slate-300 rounded overflow-hidden h-[34px]">
                            <label className="bg-slate-100 px-3 py-1.5 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors">
                                Choose file
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setLeadFile(e.target.files?.[0]?.name || 'No file chosen')}
                                />
                            </label>
                            <span className="px-3 text-xs text-slate-500 font-medium truncate">{leadFile}</span>
                        </div>
                        <button
                            onClick={() => alert(`Uploading: ${leadFile}`)}
                            className="bg-[#337AB7] text-white px-4 h-[34px] rounded text-xs font-bold flex items-center gap-2 hover:bg-[#286090] shadow-sm transition-all active:scale-95"
                        >
                            Upload <Upload size={14} />
                        </button>
                        <button
                            onClick={() => alert('Downloading Lead Sample Excel...')}
                            className="bg-[#F0AD4E] text-white px-4 h-[34px] rounded text-xs font-bold flex items-center gap-2 hover:bg-[#ec971f] shadow-sm transition-all active:scale-95"
                        >
                            <Download size={14} /> Lead Sample
                        </button>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex-1 flex items-center border border-slate-300 rounded overflow-hidden h-[34px]">
                            <label className="bg-slate-100 px-3 py-1.5 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors">
                                Choose file
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFbFile(e.target.files?.[0]?.name || 'No file chosen')}
                                />
                            </label>
                            <span className="px-3 text-xs text-slate-500 font-medium truncate">{fbFile}</span>
                        </div>
                        <button
                            onClick={() => alert(`Uploading FB Lead: ${fbFile}`)}
                            className="bg-[#337AB7] text-white px-4 h-[34px] rounded text-xs font-bold flex items-center gap-2 hover:bg-[#286090] shadow-sm transition-all active:scale-95"
                        >
                            Upload <Upload size={14} />
                        </button>
                        <button
                            onClick={() => alert('Downloading FB Lead Sample Excel...')}
                            className="bg-[#F0AD4E] text-white px-4 h-[34px] rounded text-xs font-bold flex items-center gap-2 hover:bg-[#ec971f] shadow-sm transition-all active:scale-95"
                        >
                            <Download size={14} /> FB Lead Sample
                        </button>
                    </div>
                </div>

                {/* View Leads Report Header */}
                <div className="bg-[#D9EDF7] border border-[#BCE8F1] rounded-t-lg px-4 py-3">
                    <h3 className="text-[#31708F] font-bold text-sm">View Leads Report</h3>
                </div>

                {/* Filter Section */}
                <div className="bg-white border-x border-b border-[#BCE8F1] p-6 mb-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <select className="border border-slate-300 rounded px-3 py-2 text-sm outline-none">
                            <option>Myself</option>
                        </select>
                        <select className="border border-slate-300 rounded px-3 py-2 text-sm outline-none">
                            <option>Select Lead Status</option>
                        </select>
                        <select className="border border-slate-300 rounded px-3 py-2 text-sm outline-none">
                            <option>Select Date</option>
                        </select>
                        <input type="text" defaultValue="01/12/2025" className="border border-slate-300 rounded px-3 py-2 text-sm text-center bg-slate-50" />
                        <input type="text" defaultValue="31/12/2025" className="border border-slate-300 rounded px-3 py-2 text-sm text-center bg-slate-50" />
                        <div className="flex gap-2">
                            <button
                                onClick={() => alert('Filtering leads...')}
                                className="flex-1 bg-[#5CB85C] text-white px-4 py-2 rounded text-sm font-bold shadow hover:bg-[#4cae4c] transition-all active:scale-95"
                            >
                                Filter
                            </button>
                            <button
                                onClick={() => alert('Resetting filters...')}
                                className="flex-1 bg-[#D9534F] text-white px-4 py-2 rounded text-sm font-bold shadow hover:bg-[#d43f3a] transition-all active:scale-95"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => alert('Deleting selected leads...')}
                            className="bg-[#D9534F] text-white px-6 py-2 rounded text-xs font-bold shadow hover:bg-[#d43f3a] transition-all active:scale-95"
                        >
                            Delete Leads
                        </button>
                        <div className="bg-[#337AB7] text-white px-6 py-2 rounded text-xs font-bold shadow">Total Lead : 0</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="border border-slate-300 rounded px-3 py-1.5 text-sm outline-none">
                            <option>Select Assign</option>
                        </select>
                        <button
                            onClick={() => alert('Assigning selected leads...')}
                            className="bg-[#5CB85C] text-white px-6 py-1.5 rounded text-sm font-bold shadow hover:bg-[#4cae4c] transition-all active:scale-95"
                        >
                            Assign
                        </button>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[10px] whitespace-nowrap">
                            <thead className="bg-[#EBF5FB]">
                                <tr>
                                    <th className="px-3 py-4 text-center border-r border-[#D4E6F1]">
                                        <input type="checkbox" className="rounded" />
                                    </th>
                                    {tableColumns.map((col, i) => (
                                        <th key={i} className="px-3 py-5 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight last:border-r-0">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={tableColumns.length + 1} className="px-6 py-12 text-center text-slate-400 font-bold italic bg-white">
                                        ** No Lead Found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-start">
                    <button
                        onClick={() => alert('Exporting report data to Excel...')}
                        className="bg-[#5BC0DE] text-white px-6 py-2.5 rounded text-xs font-bold flex items-center gap-2 hover:bg-[#46b8da] shadow-md transition-all active:scale-95"
                    >
                        <FileBarChart size={16} /> Export to Excel
                    </button>
                </div>
            </div>
        );
    } else if (subPath === 'report') {
        viewJSX = (
            <div className="p-4 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 mb-1">Assign To & By Report</h1>
                        <nav className="text-xs text-slate-500 flex items-center gap-2">
                            <span>CRM / Leads / Assign To & By Report</span>
                        </nav>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-end shadow-sm">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Assign From</label>
                        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none min-w-[180px]">
                            <option>Select User</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Assign To</label>
                        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none min-w-[180px]">
                            <option>Select User</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Date Range</label>
                        <div className="flex items-center gap-2">
                            <input type="text" defaultValue="01/12/2025" className="border border-slate-300 rounded-lg px-3 py-2 text-xs w-28 text-center bg-slate-50 shadow-inner" />
                            <input type="text" defaultValue="31/12/2025" className="border border-slate-300 rounded-lg px-3 py-2 text-xs w-28 text-center bg-slate-50 shadow-inner" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#5CB85C] text-white px-6 py-2 rounded-lg text-sm font-bold shadow hover:bg-[#4cae4c]">Filter</button>
                        <button className="bg-[#D9534F] text-white px-6 py-2 rounded-lg text-sm font-bold shadow hover:bg-[#d43f3a]">Reset</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] whitespace-nowrap">
                            <thead className="bg-[#EBF5FB]">
                                <tr>
                                    <th className="px-3 py-4 text-center border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Sr.No.</th>
                                    <th className="px-3 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Organization Name</th>
                                    <th className="px-3 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Customer name</th>
                                    <th className="px-3 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Mobile No</th>
                                    <th className="px-3 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Whatsapp No.</th>
                                    <th className="px-4 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Country</th>
                                    <th className="px-4 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Follow Up Date</th>
                                    <th className="px-4 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Follow Up Time</th>
                                    <th className="px-4 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Assigned By</th>
                                    <th className="px-4 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Assigned To</th>
                                    <th className="px-4 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Assigned Date</th>
                                    <th className="px-4 py-4 text-left border-r border-[#D4E6F1] text-[#112D4E] font-bold uppercase tracking-tight">Status</th>
                                    <th className="px-4 py-4 text-left text-[#112D4E] font-bold uppercase tracking-tight">Lead Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={13} className="px-6 py-12 text-center text-slate-400 font-bold italic bg-white">
                                        ** No Record Found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        viewJSX = (
            <div className="p-6 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-1">{config.title}</h1>
                        <nav className="text-sm text-slate-500 flex items-center gap-2">
                            <span>CRM</span>
                            <span>/</span>
                            <span>Leads</span>
                            <span>/</span>
                            <span className="text-blue-600 font-medium">{config.title}</span>
                        </nav>
                    </div>
                    <div className="flex gap-3">
                        {subPath === 'bulk-excel' ? (
                            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-md">
                                <Upload size={18} /> Import Excel
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-[#112D4E] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1a3f6b] transition-all shadow-md"
                            >
                                <Plus size={20} /> {subPath === 'transfer-lead' ? 'New Transfer' : 'Add New Lead'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between shadow-sm">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors text-slate-600 font-bold text-xs uppercase tracking-wider">
                            <Filter size={16} /> Filter
                        </button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors text-slate-600 font-bold text-xs uppercase tracking-wider">
                            <Download size={16} /> Export
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#F8FAFC] border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Lead Info</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                    {subPath === 'transfer-lead' && (
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Transferred To</th>
                                    )}
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={subPath === 'transfer-lead' ? 6 : 5} className="px-6 py-12 text-center text-slate-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                                <span>Loading leads...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={subPath === 'transfer-lead' ? 6 : 5} className="px-6 py-12 text-center text-slate-400 italic font-medium">
                                            No leads found in this category.
                                        </td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-800">{lead.lead_name}</div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Source: {lead.source || 'Direct'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600 font-medium">
                                                    <Building size={14} className="text-slate-400" />
                                                    {lead.company || '--'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 text-slate-600 text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <Mail size={12} className="text-slate-400" />
                                                        {lead.email || '--'}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={12} className="text-slate-400" />
                                                        {lead.phone || '--'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(lead.status)}`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            {subPath === 'transfer-lead' && (
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-600 font-medium italic">Admin User</span>
                                                </td>
                                            )}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {subPath === 'blocked-lead' ? (
                                                        <button className="p-1.5 hover:bg-green-50 rounded-lg text-green-600 transition-colors" title="Unblock">
                                                            <Lock size={16} />
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="Transfer">
                                                                <Share2 size={16} />
                                                            </button>
                                                            <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors" title="Edit">
                                                                <Edit2 size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {viewJSX}
            {masterModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity" onClick={() => setMasterModal(null)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden transform transition-all border border-slate-200">
                        <div className="bg-[#112D4E] px-6 py-4 flex justify-between items-center">
                            <h3 className="text-white font-bold tracking-tight uppercase text-sm">{masterModal.title}</h3>
                            <button onClick={() => setMasterModal(null)} className="text-white/70 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[2px] mb-3">
                                {masterModal.type} Name
                            </label>
                            <input
                                type="text"
                                autoFocus
                                value={newMasterValue}
                                onChange={(e) => setNewMasterValue(e.target.value)}
                                placeholder={`Enter new ${masterModal.type.toLowerCase()}...`}
                                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:bg-blue-50/10 transition-all font-bold"
                            />
                            <p className="mt-3 text-[11px] text-slate-400 font-medium italic">
                                * This will be added to the global master records.
                            </p>
                        </div>
                        <div className="bg-slate-50 px-8 py-5 flex gap-3">
                            <button
                                onClick={() => setMasterModal(null)}
                                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-xs font-bold hover:bg-white transition-all uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setMasterModal(null);
                                    setNewMasterValue('');
                                }}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-[#112D4E] text-white text-xs font-bold shadow-lg shadow-blue-900/10 hover:bg-[#1a3f6b] transition-all uppercase tracking-wider"
                            >
                                Save Record
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Leads;
