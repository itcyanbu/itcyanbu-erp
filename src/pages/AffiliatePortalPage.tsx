import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    DollarSign,
    Image,
    Megaphone,
    Search,
    Filter,
    Download,
    Plus,
    MoreHorizontal,
    TrendingUp,
    Link,
    Copy,
    CheckCircle2,
    Clock,
    CreditCard,
    Settings as SettingsIcon,
    Globe,
    FileText,
    Shield,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const AffiliatePortalPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('Dashboard');

    const tabs = [
        { id: 'Dashboard', label: t('affiliate_portal.tabs.dashboard'), icon: LayoutDashboard },
        { id: 'Affiliates', label: t('affiliate_portal.tabs.affiliates'), icon: Users },
        { id: 'Commissions', label: t('affiliate_portal.tabs.commissions'), icon: DollarSign },
        { id: 'Media', label: t('affiliate_portal.tabs.media'), icon: Image },
        { id: 'Campaigns', label: t('affiliate_portal.tabs.campaigns'), icon: Megaphone },
        { id: 'Payouts', label: t('affiliate_portal.tabs.payouts'), icon: CreditCard },
        { id: 'Settings', label: t('affiliate_portal.tabs.settings'), icon: SettingsIcon },
    ];

    const metrics = [
        { id: 'revenue', label: t('affiliate_portal.metrics.revenue'), value: '$45,230', change: '+15.2%', trend: 'up', icon: DollarSign },
        { id: 'affiliates', label: t('affiliate_portal.metrics.affiliates'), value: '124', change: '+8.4%', trend: 'up', icon: Users },
        { id: 'leads', label: t('affiliate_portal.metrics.leads'), value: '892', change: '-2.1%', trend: 'down', icon: Link },
        { id: 'customers', label: t('affiliate_portal.metrics.customers'), value: '156', change: '+12.5%', trend: 'up', icon: CheckCircle2 },
    ];

    return (
        <div className="h-full flex flex-col bg-[#f8fafc] overflow-hidden font-sans">
            {/* Header */}
            <header className="px-8 pt-8 pb-0 bg-white border-b border-gray-100 shrink-0 shadow-sm relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <TrendingUp size={18} />
                            </div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t('affiliate_portal.title')}</h1>
                        </div>
                        <p className="text-gray-500 font-medium text-sm">{t('affiliate_portal.subtitle')}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 hover:translate-y-[-2px]">
                            <Plus size={18} />
                            {t('affiliate_portal.add_affiliate')}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "px-6 py-4 text-xs font-black uppercase tracking-[0.1em] transition-all flex items-center gap-2 whitespace-nowrap border-b-2",
                                activeTab === tab.id
                                    ? "border-blue-600 text-blue-600 bg-blue-50/50"
                                    : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <tab.icon size={16} className={activeTab === tab.id ? "text-blue-600" : "text-gray-400"} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                {activeTab === 'Dashboard' && (
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {metrics.map((m) => (
                                <div key={m.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors">
                                            <m.icon size={24} />
                                        </div>
                                        <span className={clsx(
                                            "flex items-center text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg",
                                            m.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                        )}>
                                            {m.trend === 'up' ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
                                            {m.change}
                                        </span>
                                    </div>
                                    <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest">{m.label}</h3>
                                    <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">{m.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Chart Area Placeholder */}
                            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-xl font-black text-gray-900 tracking-tight">{t('affiliate_portal.dashboard.performance_chart')}</h2>
                                        <p className="text-gray-400 text-sm font-medium">Performance over last 30 days</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-xl">
                                        <button className="px-4 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-bold shadow-sm">Clicks</button>
                                        <button className="px-4 py-1.5 text-gray-400 rounded-lg text-xs font-bold hover:text-gray-600 transition-colors">Conversions</button>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-[300px] bg-gradient-to-b from-blue-50/30 to-transparent rounded-3xl border border-dashed border-gray-100 flex items-center justify-center relative overflow-hidden">
                                    {/* Mock Chart Lines */}
                                    <svg className="absolute inset-0 w-full h-full text-blue-100 opacity-50" preserveAspectRatio="none">
                                        <path d="M0 100 Q 150 50, 300 150 T 600 100 T 900 200" fill="none" stroke="currentColor" strokeWidth="4" />
                                        <path d="M0 150 Q 150 100, 300 200 T 600 150 T 900 250" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.5" />
                                    </svg>
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        <div className="p-4 bg-white rounded-full shadow-xl shadow-blue-50 border border-blue-50">
                                            <TrendingUp className="text-blue-600" size={32} />
                                        </div>
                                        <span className="text-sm font-bold text-blue-900/60 uppercase tracking-widest">Live Predictive Analytics</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Signups */}
                            <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                    <h2 className="text-lg font-black text-gray-900 tracking-tight">{t('affiliate_portal.dashboard.recent_signups')}</h2>
                                    <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-gray-50">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="px-8 py-5 flex items-center gap-4 hover:bg-blue-50/20 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 rounded-2xl bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-600 font-black text-xs transition-all border border-transparent group-hover:border-blue-100 group-hover:shadow-sm">
                                                {i === 1 ? 'JD' : i === 2 ? 'SL' : i === 3 ? 'MA' : i === 4 ? 'RK' : 'WA'}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-950">Partner {i}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Joined {i}h ago</p>
                                            </div>
                                            <button className="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Affiliates' && (
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">{t('affiliate_portal.affiliates.all_affiliates')}</h2>
                                <p className="text-sm text-gray-500 font-medium">Manage and filter your partner accounts</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder={t('affiliate_portal.affiliates.search_placeholder')}
                                        className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm font-medium w-64"
                                    />
                                </div>
                                <button className="p-2.5 bg-white border border-gray-100 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                                    <Filter size={20} />
                                </button>
                                <button className="p-2.5 bg-white border border-gray-100 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50/50 text-gray-400 uppercase font-black tracking-[0.15em] text-[10px]">
                                    <tr>
                                        <th className="px-8 py-5">{t('affiliate_portal.affiliates.name')}</th>
                                        <th className="px-8 py-5">{t('affiliate_portal.affiliates.email')}</th>
                                        <th className="px-8 py-5">{t('affiliate_portal.affiliates.status')}</th>
                                        <th className="px-8 py-5">{t('affiliate_portal.affiliates.leads')}</th>
                                        <th className="px-8 py-5">{t('affiliate_portal.affiliates.commission')}</th>
                                        <th className="px-8 py-5 text-right">{t('affiliate_portal.affiliates.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 group transition-all">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center font-black text-xs text-gray-400 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent transition-all">
                                                        {i}
                                                    </div>
                                                    <span className="font-black text-gray-900">Affiliate User {i}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 font-medium text-gray-500">user{i}@affiliate.com</td>
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 font-bold text-gray-950">{40 + i * 12}</td>
                                            <td className="px-8 py-5 font-black text-blue-600">$1,2{i}0.00</td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Commissions' && (
                    <div className="max-w-4xl mx-auto space-y-12 py-12 text-center animate-in fade-in slide-in-from-bottom-8">
                        <div className="space-y-4">
                            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner shadow-blue-100">
                                <DollarSign size={48} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Commission Management</h2>
                            <p className="text-gray-400 text-lg font-medium max-w-md mx-auto">Track real-time earnings and approval workflows for all active campaigns.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm flex flex-col items-center gap-4 hover:border-blue-100 transition-colors group">
                                <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-600">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Pending Approval</h3>
                                    <p className="text-2xl font-black text-gray-900 mt-1">$4,820.00</p>
                                </div>
                            </div>
                            <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm flex flex-col items-center gap-4 hover:border-blue-100 transition-colors group">
                                <div className="w-12 h-12 bg-gray-50 group-hover:bg-emerald-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-emerald-600">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Cleared this month</h3>
                                    <p className="text-2xl font-black text-gray-900 mt-1">$12,450.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button className="px-8 py-3 bg-white border border-gray-100 text-gray-900 rounded-xl font-black uppercase tracking-widest text-xs shadow-sm hover:bg-gray-50 transition-all">
                                View Full Ledger
                            </button>
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                                Process Payouts
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Media' && (
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">{t('affiliate_portal.media.title')}</h2>
                                <p className="text-sm text-gray-500 font-medium">Marketing kits and promotional assets for your partners</p>
                            </div>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2">
                                <Plus size={16} />
                                New Asset
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="group relative aspect-[4/3] bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:border-blue-200 transition-all">
                                    <div className="flex-1 bg-gray-50 border-b border-gray-50 flex items-center justify-center relative group-hover:bg-blue-50/30 transition-colors">
                                        <Image size={40} className="text-gray-200 group-hover:text-blue-200 group-hover:scale-110 transition-all" />
                                        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-xl border border-blue-50">
                                                <Copy size={12} /> Copy Code
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-black text-gray-900 truncate">Marketing Banner {i}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">728 x 90 • PNG</p>
                                        </div>
                                        <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'Campaigns' && (
                    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">{t('affiliate_portal.campaigns.title')}</h2>
                                <p className="text-sm text-gray-500 font-medium">Configure commission rules and referral links</p>
                            </div>
                            <button className="px-6 py-3 bg-white border border-gray-100 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-blue-50 transition-all">
                                Create Campaign
                            </button>
                        </div>

                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                                {i === 1 && <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 -mr-16 -mt-16 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />}
                                <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                                    <div className="flex gap-6">
                                        <div className={clsx(
                                            "w-16 h-16 rounded-3xl flex items-center justify-center shrink-0",
                                            i === 1 ? "bg-blue-50 text-blue-600 shadow-inner shadow-blue-100" : "bg-purple-50 text-purple-600 shadow-inner shadow-purple-100"
                                        )}>
                                            <Megaphone size={32} />
                                        </div>
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-black text-gray-950 tracking-tight">{i === 1 ? 'Global Core Program' : 'High Volume Partners'}</h3>
                                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-emerald-100">
                                                        <CheckCircle2 size={12} /> Active
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 font-medium mt-1">Primary referral program for all basic feature sets and subscriptions.</p>
                                            </div>

                                            <div className="flex items-center gap-2 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 group-hover:border-blue-100 transition-colors">
                                                <Link size={16} className="text-gray-400" />
                                                <code className="text-xs text-gray-600 font-bold flex-1 truncate select-all">https://partners.itcyanbu.net?link_id=AFL_{i === 1 ? '90210' : '55432'}</code>
                                                <button className="p-2 text-blue-600 bg-white rounded-lg shadow-sm border border-blue-50 hover:bg-blue-600 hover:text-white transition-all">
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-1 gap-x-12 gap-y-4 md:w-48 bg-gray-50/50 p-6 rounded-3xl border border-gray-50 group-hover:bg-white group-hover:border-blue-50 transition-all">
                                        <div>
                                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Comm. Type</span>
                                            <span className="font-black text-gray-900 text-sm">{i === 1 ? '30% Recurring' : '40% Lifetime'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Cookie Life</span>
                                            <span className="font-black text-gray-900 text-sm">60 Days</span>
                                        </div>
                                        <div className="hidden md:block">
                                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Payout Terms</span>
                                            <span className="font-black text-gray-900 text-sm">Net-15</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Payouts' && (
                    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Payouts Ledger</h2>
                                <p className="text-gray-500 font-medium">Review history and clear upcoming payments</p>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-2xl">
                                <button className="px-6 py-2.5 bg-white text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm">All Ledger</button>
                                <button className="px-6 py-2.5 text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest hover:text-gray-600 transition-colors">By Merchant</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm shadow-emerald-50">
                                <h3 className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest mb-1">Cleared Next Cycle</h3>
                                <p className="text-3xl font-black text-emerald-600">$8,240.00</p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <Clock size={16} /> Feb 15, 2026
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Paid (YTD)</h3>
                                <p className="text-3xl font-black text-gray-900">$142,500.00</p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <CheckCircle2 size={16} className="text-blue-500" /> All systems normal
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Payout Accounts</h3>
                                <p className="text-3xl font-black text-gray-900">88</p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <Users size={16} /> Top 2% global rank
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-4">
                            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Recent Transactions</span>
                                <button className="p-2 text-gray-300 hover:text-blue-600"><Filter size={18} /></button>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">Affiliate Payout #882{i}</p>
                                                <p className="text-xs text-gray-400 font-bold">Processed via Stripe • Feb {i}, 2026</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-gray-900">$1,250.00</p>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Paid Out</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Settings' && (
                    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Portal Configuration</h2>
                            <p className="text-gray-500 font-medium">Fine-tune the affiliate experience and legal requirements.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 tracking-tight">{t('affiliate_portal.settings.custom_domain')}</h3>
                                        <p className="text-xs text-gray-500 font-medium">Host your partner portal on a white-labeled subdomain</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <input type="text" placeholder="partners.yourdomain.com" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all" />
                                    <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Save</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-blue-100 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight mb-2">{t('affiliate_portal.settings.registration_form')}</h3>
                                    <p className="text-sm text-gray-500 font-medium mb-6">Customize fields and approval rules for new partner applications.</p>
                                    <button className="text-blue-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Configure Form <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-blue-100 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                                        <Shield size={24} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight mb-2">{t('affiliate_portal.settings.terms')}</h3>
                                    <p className="text-sm text-gray-500 font-medium mb-6">Update your legal agreement and terms of service for partners.</p>
                                    <button className="text-blue-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Edit Agreement <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AffiliatePortalPage;
