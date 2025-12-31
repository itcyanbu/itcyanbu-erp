import React, { useState, useEffect } from 'react';
import {
    Plus, Search, TrendingUp, DollarSign,
    Calendar, User, Filter, MoreHorizontal,
    ChevronRight, ArrowRight, Building, Map,
    BarChart3, Rocket, AreaChart, MapPin,
    Target, Trophy, Activity, History,
    CheckCircle2, Clock, ChevronDown, X
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
    LineChart, Line, AreaChart as ReAreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';
import { supabase } from '../../services/supabase';

const stages = [
    'Prospecting',
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
];

const Sales = () => {
    const [deals, setDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPerfModal, setShowPerfModal] = useState(false);
    const location = useLocation();
    const subPath = location.pathname.split('/').pop()?.toLowerCase() || 'pipeline';

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('crm_sales')
                .select('*, crm_leads(lead_name, company)')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setDeals(data || []);
        } catch (error: any) {
            console.error('Error fetching deals:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDeal = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newDeal = {
            deal_name: formData.get('deal_name'),
            amount: parseFloat(formData.get('amount')?.toString() || '0'),
            stage: formData.get('stage'),
            probability: parseInt(formData.get('probability')?.toString() || '50'),
            expected_close_date: formData.get('expected_close_date'),
        };

        try {
            const { error } = await supabase.from('crm_sales').insert([newDeal]);
            if (error) throw error;
            setShowAddModal(false);
            fetchDeals();
        } catch (error: any) {
            alert('Error adding deal: ' + error.message);
        }
    };

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'Prospecting': return 'border-blue-400';
            case 'Qualification': return 'border-indigo-400';
            case 'Proposal': return 'border-purple-400';
            case 'Negotiation': return 'border-orange-400';
            case 'Closed Won': return 'border-green-400';
            case 'Closed Lost': return 'border-red-400';
            default: return 'border-slate-300';
        }
    };

    const pipelineView = (
        <>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Sales Pipeline</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Sales</span>
                    </nav>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-[#1a3f6b] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2a5f8b] transition-colors shadow-md active:scale-95"
                    >
                        <Plus size={20} />
                        Add New Deal
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6">
                {stages.map((stage) => {
                    const stageDeals = deals.filter(d => d.stage === stage);
                    const totalAmount = stageDeals.reduce((sum, d) => sum + (d.amount || 0), 0);

                    return (
                        <div key={stage} className="flex-shrink-0 w-80">
                            <div className={`bg-slate-100 p-3 rounded-t-lg border-t-4 ${getStageColor(stage)} flex items-center justify-between mb-3 shadow-sm`}>
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-700 text-sm">{stage}</span>
                                    <span className="text-xs text-slate-500">{stageDeals.length} deals</span>
                                </div>
                                <div className="text-sm font-bold text-slate-600">
                                    ₹{totalAmount.toLocaleString()}
                                </div>
                            </div>

                            <div className="space-y-3 min-h-[500px]">
                                {loading && stage === stages[0] ? (
                                    <div className="text-center p-4 text-slate-400 text-sm">Loading...</div>
                                ) : stageDeals.length === 0 ? (
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 text-xs italic">
                                        No deals in this stage
                                    </div>
                                ) : (
                                    stageDeals.map((deal) => (
                                        <div key={deal.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {deal.deal_name}
                                                </div>
                                                <button className="text-slate-300 hover:text-slate-600">
                                                    <MoreHorizontal size={14} />
                                                </button>
                                            </div>

                                            <div className="text-xs text-slate-500 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Building size={10} />
                                                    {deal.crm_leads?.company || deal.crm_leads?.lead_name || 'Individual'}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                                                <div className="text-blue-600 font-bold text-sm">₹{deal.amount?.toLocaleString()}</div>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded">
                                                    <TrendingUp size={10} />
                                                    {deal.probability}%
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                                                <Calendar size={10} />
                                                {deal.expected_close_date ? new Date(deal.expected_close_date).toLocaleDateString() : 'No close date'}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );

    let viewJSX;

    if (subPath === 'map-view') {
        const locations = [
            { name: 'Ahmed Khan', pos: 'Top: 20%, Left: 30%', status: 'Active', zone: 'Riyadh' },
            { name: 'Sami Al-Faris', pos: 'Top: 45%, Left: 60%', status: 'In Meeting', zone: 'Jeddah' },
            { name: 'Omar Bakri', pos: 'Top: 70%, Left: 20%', status: 'Traveling', zone: 'Dammam' },
            { name: 'Khalid Malik', pos: 'Top: 35%, Left: 80%', status: 'Active', zone: 'Al Khobar' },
        ];

        viewJSX = (
            <div className="p-6 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                            <Map className="text-blue-600" /> Map-View Sales Team
                        </h1>
                        <nav className="text-xs text-slate-500 font-medium">CRM / Sales / Map View</nav>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:col-span-12 relative bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden h-[700px]">
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 bg-[#E3F2FD] opacity-30 pattern-dots"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[80%] h-[80%] border-4 border-dashed border-blue-200 rounded-full opacity-20"></div>
                        <div className="w-[50%] h-[50%] border-4 border-dashed border-blue-200 rounded-full opacity-20 absolute"></div>
                    </div>

                    {/* Team Markers */}
                    {locations.map((loc, i) => (
                        <div key={i} className="absolute transition-all duration-500 hover:scale-110 cursor-pointer group" style={{ top: loc.pos.split(',')[0].split(':')[1].trim(), left: loc.pos.split(',')[1].split(':')[1].trim() }}>
                            <div className="relative">
                                <MapPin size={32} className="text-blue-600 drop-shadow-lg" fill="white" />
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-2xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sales Representative</div>
                                    <div className="text-xs font-bold text-[#112D4E]">{loc.name}</div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${loc.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                        <span className="text-[9px] font-bold text-slate-600">{loc.status} • {loc.zone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-xl max-w-xs">
                        <h4 className="font-extrabold text-[#112D4E] text-xs uppercase mb-3">Team Overview</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                <span className="text-[10px] font-bold text-slate-500">Total Personnel</span>
                                <span className="text-xs font-extrabold text-blue-600">12</span>
                            </div>
                            <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                                <span className="text-[10px] font-bold text-green-700">Active Now</span>
                                <span className="text-xs font-extrabold text-green-700">8</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (subPath === 'performance') {
        const perfData = [
            { name: 'Week 1', target: 4000, value: 2400 },
            { name: 'Week 2', target: 3000, value: 1398 },
            { name: 'Week 3', target: 2000, value: 9800 },
            { name: 'Week 4', target: 2780, value: 3908 },
            { name: 'Week 5', target: 1890, value: 4800 },
        ];

        viewJSX = (
            <div className="p-6 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                            <BarChart3 className="text-blue-600" /> Sales Target & Performance
                        </h1>
                        <nav className="text-xs text-slate-500 font-medium tracking-wide">CRM / Sales / Target Planning</nav>
                    </div>
                    <button
                        onClick={() => setShowPerfModal(true)}
                        className="bg-[#5CB85C] text-white px-6 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#4cae4c] transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Plus size={18} /> Create Target
                    </button>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-[#D9EDF7]/50 border border-[#BCE8F1] p-4 rounded-xl flex flex-wrap gap-4 items-center mb-8 shadow-sm">
                    <div className="flex-1 min-w-[300px] relative">
                        <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                            <option>Select Sale Person</option>
                            <option>Ahmed Khan</option>
                            <option>Sami Al-Faris</option>
                            <option>Omar Bakri</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                    <button className="bg-[#D9534F] text-white px-8 py-2 rounded text-sm font-bold shadow hover:bg-[#d43f3a] transition-all">Reset</button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: 'Total Annual Target', value: '₹5,000,000', change: '+12%', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Total Achievement', value: '₹3,240,500', change: '64.8%', icon: Trophy, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Avg Efficiency', value: '88.5%', change: '+5.4%', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`${stat.bg} p-4 rounded-xl ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-xl font-extrabold text-[#112D4E] tracking-tight">{stat.value}</div>
                                <div className={`text-[10px] font-bold mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>{stat.change} vs Last Period</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead className="bg-[#EBF5FB] text-[#112D4E]">
                                <tr>
                                    <th className="px-6 py-4 text-center border-r border-[#D4E6F1] font-extrabold uppercase tracking-widest text-[10px]">S No.</th>
                                    <th className="px-6 py-4 text-left border-r border-[#D4E6F1] font-extrabold uppercase tracking-widest text-[10px]">Sale Person</th>
                                    <th className="px-6 py-4 text-center border-r border-[#D4E6F1] font-extrabold uppercase tracking-widest text-[10px]">Target For</th>
                                    <th className="px-6 py-4 text-right border-r border-[#D4E6F1] font-extrabold uppercase tracking-widest text-[10px]">Target Amount</th>
                                    <th className="px-6 py-4 text-right border-r border-[#D4E6F1] font-extrabold uppercase tracking-widest text-[10px]">Achieved Amount</th>
                                    <th className="px-6 py-4 text-center font-extrabold uppercase tracking-widest text-[10px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-bold italic bg-white">
                                        ** No Sales Target Record Found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[400px]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-extrabold text-[#112D4E] uppercase text-xs tracking-wider">Performance Trend</h3>
                            <p className="text-[11px] text-slate-400 font-bold mt-1">Real-time target vs achievement analysis</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div> Target
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div> Actual
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <ReAreaChart data={perfData}>
                            <defs>
                                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} dy={10} />
                            <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="target" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTarget)" />
                            <Area type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                        </ReAreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    } else if (subPath === 'track') {
        const activities = [
            { user: 'Ahmed Khan', action: 'Closed Deal - Project Oasis', time: '10 mins ago', type: 'success' },
            { user: 'Sami Al-Faris', action: 'Followed up with ABC Corp', time: '25 mins ago', type: 'info' },
            { user: 'Omar Bakri', action: 'Added New Lead: Tech Solutions', time: '1 hour ago', type: 'warning' },
            { user: 'Khalid Malik', action: 'Met with Client: Riyad Bank', time: '3 hours ago', type: 'info' },
        ];

        viewJSX = (
            <div className="p-6 bg-slate-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                            <Rocket className="text-blue-600" /> Track Sales Team
                        </h1>
                        <nav className="text-xs text-slate-500 font-medium">CRM / Sales / Activity Tracking</nav>
                    </div>
                </div>

                {/* Filter Header */}
                <div className="bg-[#D9EDF7]/50 border border-[#BCE8F1] rounded-t-lg p-3">
                    <h3 className="text-[#112D4E] font-bold text-sm">Track Sales Report</h3>
                </div>
                <div className="bg-white border-x border-b border-slate-200 p-4 rounded-b-lg flex flex-wrap gap-4 items-center mb-6 shadow-sm">
                    <div className="min-w-[200px] flex-1">
                        <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-slate-600">
                            <option>Select User</option>
                            <option>Ahmed Khan</option>
                            <option>Sami Al-Faris</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" defaultValue="01/12/2025" className="border border-slate-300 rounded px-4 py-2 text-sm text-center w-32 bg-slate-50" />
                    </div>
                    <div>
                        <input type="text" defaultValue="31/12/2025" className="border border-slate-300 rounded px-4 py-2 text-sm text-center w-32 bg-slate-50" />
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#5CB85C] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-[#4cae4c] transition-colors">Filter</button>
                        <button className="bg-[#D9534F] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-[#d43f3a] transition-colors">Reset</button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-[#D9EDF7] rounded overflow-hidden border border-[#D9EDF7] mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead className="bg-[#D9EDF7] text-[#112D4E]">
                                <tr>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">S No.</th>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">Full Name</th>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">Address</th>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">Country</th>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">State</th>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">City</th>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">Latitude</th>
                                    <th className="px-4 py-3 text-center border-r border-[#BCE8F1] font-bold">Longitude</th>
                                    <th className="px-4 py-3 text-center font-bold">Current Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center bg-white font-bold text-slate-500">
                                        ** No Record Found!
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="text-xs font-extrabold text-[#112D4E] uppercase tracking-wider flex items-center gap-2">
                                    <History size={16} /> Live Activity Feed
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-slate-400">Live Updates</span>
                                </div>
                            </div>
                            <div className="p-0">
                                {activities.map((act, i) => (
                                    <div key={i} className="flex items-start gap-4 p-6 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                                        <div className={`p-2 rounded-lg bg-blue-50 text-blue-600`}>
                                            <Activity size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-sm font-bold text-slate-800">{act.user}</span>
                                                    <p className="text-xs text-slate-500 mt-0.5">{act.action}</p>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{act.time}</span>
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                <button className="text-[10px] font-bold text-blue-600 hover:underline">View Details</button>
                                                <button className="text-[10px] font-bold text-slate-400 hover:underline">Send Message</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-xs font-extrabold text-[#112D4E] uppercase mb-4 tracking-widest">Active Status</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'On Field', count: 5, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    { name: 'In Office', count: 4, color: 'text-green-600', bg: 'bg-green-50' },
                                    { name: 'On Leave', count: 3, color: 'text-slate-400', bg: 'bg-slate-50' },
                                ].map((status, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${status.color.replace('text', 'bg')}`}></div>
                                            <span className="text-xs font-bold text-slate-600">{status.name}</span>
                                        </div>
                                        <span className={`text-xs font-extrabold ${status.color}`}>{status.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#112D4E] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform">
                                <Rocket size={120} />
                            </div>
                            <h3 className="text-xs font-extrabold uppercase tracking-widest mb-1 opacity-60">Daily Progress</h3>
                            <div className="text-3xl font-extrabold tracking-tight mb-4">84%</div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full mb-3 overflow-hidden">
                                <div className="h-full bg-blue-400 rounded-full" style={{ width: '84%' }}></div>
                            </div>
                            <p className="text-[10px] font-bold opacity-60">You are ahead of 72% of teams</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (subPath === 'view') {
        viewJSX = (
            <div className="p-6 bg-slate-50 min-h-screen">
                {/* Header */}
                <div className="bg-[#D9EDF7]/50 border border-[#BCE8F1] rounded-t-lg p-3 mb-6">
                    <h3 className="text-[#112D4E] font-bold text-sm">View Sales</h3>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[250px]">
                        <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-slate-600">
                            <option>ALL</option>
                            <option>Closed Won</option>
                            <option>Closed Lost</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" defaultValue="01/12/2025" className="border border-slate-300 rounded px-4 py-2 text-sm text-center w-36 bg-slate-50" />
                    </div>
                    <div>
                        <input type="text" defaultValue="31/12/2025" className="border border-slate-300 rounded px-4 py-2 text-sm text-center w-36 bg-slate-50" />
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#5CB85C] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-[#4cae4c] transition-colors">Filter</button>
                        <button className="bg-[#D9534F] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-[#d43f3a] transition-colors">Reset</button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-[#D9EDF7] rounded overflow-hidden border border-[#D9EDF7] mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead className="bg-[#D9EDF7] text-[#112D4E]">
                                <tr>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">S No.</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Lead Name</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Organization Name</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Mobile Number</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Follow Up Date</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Lead Status</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Project Value</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Closed by</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Advance Payment</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Total Paid</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Balance Amount</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Payment Details</th>
                                    <th className="px-3 py-3 text-center border-r border-[#BCE8F1] font-bold whitespace-nowrap">Edit Details</th>
                                    <th className="px-3 py-3 text-center font-bold whitespace-nowrap">Payments</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={14} className="px-6 py-8 text-center bg-white font-bold text-slate-500">
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
            <div className="p-6">
                {pipelineView}
            </div>
        );
    }

    return (
        <>
            {viewJSX}
            {/* Add Deal Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-slate-200">
                        <div className="bg-[#112D4E] p-5 text-white flex justify-between items-center">
                            <h3 className="text-sm font-bold uppercase tracking-widest">Create New Deal</h3>
                            <button onClick={() => setShowAddModal(false)} className="hover:rotate-90 transition-transform duration-300">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleAddDeal} className="p-8 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Deal Name*</label>
                                <input name="deal_name" required className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm" placeholder="Enter deal title" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Amount (₹)*</label>
                                    <input name="amount" type="number" required className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Probability (%)</label>
                                    <input name="probability" type="number" min="0" max="100" defaultValue="50" className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Current Stage</label>
                                <select name="stage" className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm appearance-none cursor-pointer">
                                    {stages.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Expected Close Date</label>
                                <input name="expected_close_date" type="date" className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                            </div>
                            <button type="submit" className="w-full bg-[#112D4E] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#1a3f6b] transition-all shadow-xl shadow-blue-900/10 active:scale-95">
                                Add to Pipeline
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Create Performance Target Modal */}
            {showPerfModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPerfModal(false)}></div>
                    <div className="relative bg-white rounded shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all">
                        {/* Modal Header */}
                        <div className="bg-[#1a3f6b] p-4 text-white flex justify-between items-center">
                            <h3 className="text-sm font-bold">Create Sales Target & Performance</h3>
                            <button onClick={() => setShowPerfModal(false)} className="hover:text-slate-200">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8">
                            <form className="space-y-6">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <label className="col-span-4 text-xs font-bold text-slate-700">Name of Sale Person <span className="text-red-500">*</span></label>
                                    <div className="col-span-8">
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-600 outline-none focus:border-blue-500">
                                            <option>Select Sale Person</option>
                                            <option>Ahmed Khan</option>
                                            <option>Sami Al-Faris</option>
                                            <option>Omar Bakri</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <label className="col-span-4 text-xs font-bold text-slate-700">Sale Target From Month <span className="text-red-500">*</span></label>
                                    <div className="col-span-8">
                                        <input type="text" placeholder="From Date" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <label className="col-span-4 text-xs font-bold text-slate-700">Sale Target To Month <span className="text-red-500">*</span></label>
                                    <div className="col-span-8">
                                        <input type="text" placeholder="To Date" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <label className="col-span-4 text-xs font-bold text-slate-700">Target Amount <span className="text-red-500">*</span></label>
                                    <div className="col-span-8">
                                        <input type="text" placeholder="Target Amount" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500" />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button className="bg-[#5CB85C] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-[#4cae4c] transition-colors">Submit</button>
                            <button onClick={() => setShowPerfModal(false)} className="bg-[#D9534F] text-white px-6 py-2 rounded text-sm font-bold shadow hover:bg-[#d43f3a] transition-colors">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sales;
