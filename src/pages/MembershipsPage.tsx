import { useState } from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Award,
    BarChart3,
    Plus,
    UserPlus,
    Tag,
    Settings as SettingsIcon,
    ShieldCheck,
    Globe,
    Wand2,
    Copy,
    RefreshCw,
    CheckCircle2,
    Search,
    ChevronRight,
    PlayCircle,
    DollarSign,
    Target,
    Zap
} from 'lucide-react';

const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: BookOpen },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const MembershipsPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [magicLink, setMagicLink] = useState('https://app.itcyanbu.com/v2/preview/magic/token_bt892x_lz01');
    const [showToast, setShowToast] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const triggerToast = (message: string) => {
        setShowToast(message);
        setTimeout(() => setShowToast(null), 3000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(magicLink);
        triggerToast('Link copied to clipboard');
    };

    const regenerateMagicLink = () => {
        const newToken = Math.random().toString(36).substring(2, 12);
        setMagicLink(`https://app.itcyanbu.com/v2/preview/magic/token_${newToken}`);
        triggerToast('Magic link regenerated');
    };

    const products = [
        { title: 'Ultimate Marketing Masterclass', lessons: 45, modules: 12, status: 'Published', img: '🎨', color: 'bg-indigo-600', students: 1240 },
        { title: 'SEO For Growth (Beginner)', lessons: 24, modules: 6, status: 'Published', img: '🔍', color: 'bg-emerald-600', students: 850 },
        { title: 'Social Media Advertising 2024', lessons: 38, modules: 8, status: 'Draft', img: '📱', color: 'bg-rose-600', students: 0 },
        { title: 'Scaling Agency Operations', lessons: 15, modules: 4, status: 'Published', img: '📈', color: 'bg-amber-600', students: 420 },
    ].filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">

            {/* Success Toast */}
            {showToast && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] animate-in slide-in-from-bottom-4 fade-in">
                    <div className="bg-gray-950 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
                        <CheckCircle2 size={20} className="text-emerald-400" />
                        <span className="text-sm font-bold">{showToast}</span>
                    </div>
                </div>
            )}

            {/* Modal Overlay */}
            {isCreateModalOpen && (activeTab === 'dashboard' || activeTab === 'products') && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)} />
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-10">
                            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Create Program</h3>
                            <p className="text-sm text-gray-500 font-medium mb-8">Start your new curriculum by naming your main product path.</p>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Program Title</label>
                                    <input type="text" placeholder="e.g. Masterclass 1.0" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setIsCreateModalOpen(false)} className="flex-1 px-6 py-4 bg-gray-100 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-colors">Cancel</button>
                                    <button onClick={() => { setIsCreateModalOpen(false); triggerToast('Product path created!'); }} className="flex-1 px-6 py-4 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-colors">Confirm & Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="px-8 pt-6 bg-white border-b border-gray-200 shrink-0 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Learning Management</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Memberships</h1>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Create Product
                    </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all flex items-center gap-2.5 whitespace-nowrap ${isActive
                                    ? 'border-blue-600 text-blue-600 bg-blue-50/20'
                                    : 'border-transparent text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                <Icon size={16} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Content Main */}
            <main className="flex-1 overflow-y-auto p-10 bg-gray-50/30 custom-scrollbar">

                {activeTab === 'dashboard' && (
                    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { title: 'Opt-ins', val: '4,124', icon: Users, color: 'blue', trend: '+12.5%' },
                                { title: 'Revenue', val: '$188k', icon: DollarSign, color: 'emerald', trend: '+$14k' },
                                { title: 'Lessons', val: '12.8k', icon: PlayCircle, color: 'indigo', trend: '84% Avg' },
                                { title: 'Retention', val: '89%', icon: BarChart3, color: 'orange', trend: 'Optimal' },
                            ].map((s, i) => (
                                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative group hover:shadow-xl transition-all">
                                    <div className={`absolute -right-4 -top-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-${s.color}-600`}>
                                        <s.icon size={80} />
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.title}</p>
                                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">{s.trend}</span>
                                    </div>
                                    <h4 className="text-4xl font-black text-gray-900">{s.val}</h4>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">System Growth</h3>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase rounded-xl">Weekly</button>
                                        <button className="px-4 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase rounded-xl">Monthly</button>
                                    </div>
                                </div>
                                <div className="h-64 flex items-end gap-3 px-2">
                                    {[40, 70, 30, 85, 50, 90, 60, 40, 75, 95, 30, 55, 80, 45].map((h, i) => (
                                        <div key={i} className="flex-1 bg-blue-50 rounded-t-2xl group relative cursor-pointer" style={{ height: `${h}%` }}>
                                            <div className="absolute inset-0 bg-blue-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                                                +{h * 12}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                    <span>Feb 01</span>
                                    <span>Feb 07</span>
                                    <span>Feb 14</span>
                                    <span>Feb 21</span>
                                    <span>Today</span>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col">
                                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-8 px-2">Recent Activities</h3>
                                <div className="space-y-4 flex-1">
                                    {[
                                        { user: 'S. Adams', task: 'Unlocked Expert Badge', time: '2m ago' },
                                        { user: 'K. Miller', task: 'Joined SEO Accelerator', time: '15m ago' },
                                        { user: 'J. White', task: 'Finished Unit 8: Scaling', time: '1h ago' },
                                        { user: 'L. Parker', task: 'Bulk enrollment trigger', time: '3h ago' },
                                    ].map((a, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-3xl transition-colors cursor-pointer group">
                                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                {a.user[0]}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-black text-gray-900">{a.user}</p>
                                                <p className="text-xs font-medium text-gray-400">{a.task}</p>
                                            </div>
                                            <span className="text-[10px] font-black text-gray-300 uppercase">{a.time}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-4 bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-colors">View All Stream</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Active Curriculum</h2>
                                <p className="text-sm font-medium text-gray-500">Managing {products.length} high-conversion education paths.</p>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Find program..."
                                    className="pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[2.5rem] outline-none focus:ring-4 focus:ring-blue-50 text-sm font-bold w-96 shadow-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((p, i) => (
                                <div key={i} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-700 group relative">
                                    <div className={`h-44 ${p.color} flex items-center justify-center text-7xl relative`}>
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700 relative z-10">{p.img}</span>
                                        <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">{p.status}</div>
                                    </div>
                                    <div className="p-10 flex-1 flex flex-col">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                                        <div className="flex gap-2 mb-8">
                                            <span className="px-2 py-1 bg-gray-50 rounded text-[10px] font-black text-gray-400 uppercase">{p.lessons} Lessons</span>
                                            <span className="px-2 py-1 bg-gray-50 rounded text-[10px] font-black text-gray-400 uppercase">{p.students} Learners</span>
                                        </div>
                                        <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                                                Edit Content
                                                <ChevronRight size={14} />
                                            </button>
                                            <button className="px-5 py-2.5 bg-gray-950 text-[10px] font-black text-white uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">Preview</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-gray-100/50 rounded-[3rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 cursor-pointer hover:bg-white hover:border-blue-400 hover:shadow-2xl transition-all duration-700 group min-h-[440px]"
                            >
                                <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                                    <Plus size={40} className="text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">New Program</h3>
                                <p className="text-sm font-medium text-gray-400 mt-2 text-center max-w-[240px]">Initialize a new course or workshop path.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'offers' && (
                    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Product Access Offers</h2>
                                <p className="text-sm font-medium text-gray-500">Bundle products into checkout-ready packages.</p>
                            </div>
                            <button onClick={() => triggerToast('Offer builder launched')} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all flex items-center gap-2">
                                <Tag size={16} />
                                New Offer
                            </button>
                        </div>

                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Structure</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price Point</th>
                                        <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance</th>
                                        <th className="px-10 py-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Manage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[
                                        { name: 'Ultra Master Bundle', count: '5 Programs', price: '$1,997', sales: 124, status: 'High Growth' },
                                        { name: 'Agency Core Access', count: '1 Program', price: '$497', sales: 850, status: 'Stable' },
                                        { name: 'Inner Circle Sub', count: 'All Access', price: '$197/mo', sales: 42, status: 'New' },
                                    ].map((o, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-10 py-10">
                                                <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{o.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{o.count}</p>
                                            </td>
                                            <td className="px-10 py-10">
                                                <span className="text-xl font-black text-emerald-600">{o.price}</span>
                                            </td>
                                            <td className="px-10 py-10">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs font-black text-gray-900">{o.sales} Sales</span>
                                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg">{o.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-10 text-right">
                                                <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                                    <SettingsIcon size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Intelligence Hub</h2>
                            <button className="px-6 py-3 bg-gray-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">Export CSV</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                                    <Target size={120} className="text-blue-600" />
                                </div>
                                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-10">Member Engagement Score</h3>
                                <div className="h-80 flex items-end gap-2">
                                    {[20, 35, 45, 30, 55, 65, 75, 90, 85, 95, 70, 80, 60, 40, 50].map((v, i) => (
                                        <div key={i} className="flex-1 rounded-t-xl transition-all duration-500 hover:scale-110 cursor-pointer" style={{ height: `${v}%`, background: `rgba(37,99,235, ${v / 100})` }} />
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Session Starts</span>
                                    <span>Average Completion Time: 4d 12h</span>
                                    <span>Peak Hours</span>
                                </div>
                            </div>

                            <div className="bg-gray-950 p-12 rounded-[3.5rem] text-white flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-10">
                                    <Zap size={100} className="text-yellow-400" />
                                </div>
                                <h3 className="text-base font-black uppercase tracking-tight mb-12">Performance Summary</h3>
                                <div className="space-y-10 flex-1">
                                    {[
                                        { l: 'New Leads', v: '2.4k', t: '+8%' },
                                        { l: 'Quiz Mastery', v: '92%', t: 'Optimal' },
                                        { l: 'Average Spend', v: '$412', t: '+$21' },
                                    ].map((p, i) => (
                                        <div key={i}>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{p.l}</p>
                                            <div className="flex items-baseline gap-4">
                                                <h4 className="text-4xl font-black">{p.v}</h4>
                                                <span className="text-[10px] font-black text-yellow-400">{p.t}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl text-[10px] font-black uppercase tracking-widest">Live Auditor</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'certificates' && (
                    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Student Rewards</h2>
                                <p className="text-sm font-medium text-gray-500">Authenticated degree generation for program graduates.</p>
                            </div>
                            <button onClick={() => triggerToast('Canvas opened')} className="px-8 py-4 bg-gray-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black shadow-2xl transition-all flex items-center gap-2">
                                <Award size={16} />
                                New Template
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                { title: 'Marketing Expert Gold', product: 'Masterclass 1.0', issued: 124, grad: '#155EEF' },
                                { title: 'SEO Architect Diamond', product: 'Search Engine Lab', issued: 56, grad: '#059669' },
                            ].map((c, i) => (
                                <div key={i} className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-700">
                                    <div className="h-80 relative flex items-center justify-center p-12 overflow-hidden" style={{ backgroundColor: c.grad }}>
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:20px_20px]" />

                                        {/* Certificate Preview Card */}
                                        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[2.5rem] w-full max-w-[340px] text-center shadow-[0_40px_80px_rgba(0,0,0,0.3)] rotate-[-2deg] group-hover:rotate-0 transition-all duration-700 relative z-10">
                                            <Award size={64} className="text-white mx-auto mb-6 drop-shadow-2xl" />
                                            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Official Recognition</p>
                                            <p className="text-lg font-black text-white uppercase tracking-tight mb-4">Mastery in {c.product}</p>
                                            <div className="w-12 h-1 bg-white/20 mx-auto rounded-full" />
                                        </div>
                                    </div>
                                    <div className="p-12 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1">{c.title}</h3>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Distributed: <span className="text-blue-600">{c.issued} Members</span></p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-5 bg-gray-50 text-gray-400 hover:bg-gray-950 hover:text-white rounded-[2rem] transition-all">
                                                <Wand2 size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'communities' && (
                    <div className="max-w-5xl mx-auto py-24 text-center animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-50">
                            <Users size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Member Communities</h2>
                        <p className="text-gray-500 font-medium max-w-xl mx-auto mb-12 text-lg">Build engagement by connecting your students in exclusive groups and forums.</p>
                        <button onClick={() => triggerToast('Community engine initialized')} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-2xl shadow-blue-100 transition-all active:scale-95">
                            Launch Community Hub
                        </button>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Portal Architecture</h2>
                            <p className="text-sm font-medium text-gray-400 mt-2">Manage infrastructure, DNS, and secure access protocols.</p>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
                                <div className="flex items-start gap-8">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center shrink-0">
                                        <Globe size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Custom Subdomain</h3>
                                        <p className="text-sm font-medium text-gray-500 mb-8">Access your learning portal via your own branded URL.</p>
                                        <div className="flex gap-4">
                                            <input type="text" placeholder="learn.itcyanbu.com" className="flex-1 px-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
                                            <button onClick={() => triggerToast('Checking DNS propagation...')} className="px-10 py-5 bg-gray-950 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Verify</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none rotate-12">
                                    <ShieldCheck size={120} className="text-emerald-600" />
                                </div>
                                <div className="flex items-start gap-8">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center shrink-0">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">SSO Entry Tokens</h3>
                                        <p className="text-sm font-medium text-gray-500 mb-10">Magic links allow users to bypass passwords for instant entry.</p>

                                        <div className="space-y-6">
                                            <div className="p-3 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center gap-4">
                                                <div className="flex-1 pl-6 truncate font-mono text-[10px] font-bold text-gray-400 italic">{magicLink}</div>
                                                <div className="flex gap-2">
                                                    <button onClick={copyToClipboard} className="p-4 bg-white rounded-2xl text-gray-400 hover:text-blue-600 hover:shadow-lg transition-all"><Copy size={20} /></button>
                                                    <button onClick={regenerateMagicLink} className="p-4 bg-white rounded-2xl text-gray-400 hover:text-purple-600 hover:shadow-lg transition-all"><RefreshCw size={20} /></button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="p-8 bg-blue-50/20 border border-blue-100 rounded-[2.5rem]">
                                                    <UserPlus size={24} className="text-blue-600 mb-4" />
                                                    <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">Staff Access</h4>
                                                    <p className="text-[11px] font-medium text-blue-700 leading-tight uppercase tracking-tighter">Automatic login for admins.</p>
                                                </div>
                                                <div className="p-8 bg-emerald-50/20 border border-emerald-100 rounded-[2.5rem]">
                                                    <BookOpen size={24} className="text-emerald-600 mb-4" />
                                                    <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest mb-1">Member Access</h4>
                                                    <p className="text-[11px] font-medium text-emerald-700 leading-tight uppercase tracking-tighter">Enrollment flow trigger.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default MembershipsPage;
