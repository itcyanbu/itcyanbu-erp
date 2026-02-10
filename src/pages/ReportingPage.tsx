import { useState } from 'react';
import {
    BarChart3,
    PieChart,
    TrendingUp,
    Phone,
    Calendar,
    Search,
    Filter,
    Download,
    ArrowUp,
    ArrowDown,
    MousePointer,
    Target,
    RefreshCw,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    PhoneMissed,
    PhoneIncoming,
    PhoneOutgoing,
    Users,
    DollarSign,
    Eye,
    ChevronDown,
} from 'lucide-react';

const ReportingPage = () => {
    const [activeTab, setActiveTab] = useState('Google Ads');
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleDateRangeChange = (range: string) => {
        setDateRange(range);
        setIsDatePickerOpen(false);
    };

    const handleExport = () => {
        setIsExporting(true);
        // Simulate export delay
        setTimeout(() => {
            setIsExporting(false);
            // You could add a toast here if you had a toast system
        }, 2000);
    };

    const tabs = [
        { id: 'Google Ads', label: 'Google Ads', icon: BarChart3 },
        { id: 'Facebook Ads', label: 'Facebook Ads', icon: PieChart },
        { id: 'Attribution', label: 'Attribution', icon: TrendingUp },
        { id: 'Call Reporting', label: 'Call Reporting', icon: Phone },
        { id: 'Appointment Reporting', label: 'Appointments', icon: Calendar },
    ];

    const StatCard = ({ title, value, trend, trendUp, icon: Icon, color }: any) => (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-${color}-600`}>
                <Icon size={80} />
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center text-${color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{title}</h3>
            <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-gray-900">{value}</p>
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trendUp ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                    {trend}
                </span>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-gray-50/50 overflow-hidden font-sans">
            {/* Header */}
            <header className="px-8 py-8 bg-white border-b border-gray-200/50 shrink-0 z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Analytics Intelligence</span>
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Reporting Dashboard</h1>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                className="px-5 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-all hover:shadow-md"
                            >
                                <Calendar size={16} />
                                {dateRange}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Date Picker Dropdown */}
                            {isDatePickerOpen && (
                                <div className="absolute top-full mt-2 left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-48 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="py-1">
                                        {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month'].map((range) => (
                                            <button
                                                key={range}
                                                onClick={() => handleDateRangeChange(range)}
                                                className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-gray-50 transition-colors ${dateRange === range ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600'}`}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-gray-200 transition-all ${isExporting
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-gray-900 text-white hover:bg-black hover:translate-y-[-2px]'
                                }`}
                        >
                            {isExporting ? (
                                <>
                                    <RefreshCw size={16} className="animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <Download size={16} />
                                    Export Data
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 whitespace-nowrap ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                                    }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                {/* Google Ads View */}
                {activeTab === 'Google Ads' && (
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-blue-50/50 border border-blue-100 rounded-[2rem] p-6 flex items-center gap-4">
                            <div className="p-4 bg-blue-100 rounded-2xl text-blue-600 animate-pulse">
                                <RefreshCw size={24} />
                            </div>
                            <div>
                                <h4 className="text-blue-900 font-bold text-sm uppercase tracking-wide">Live Sync Active</h4>
                                <p className="text-blue-600/80 text-xs font-medium mt-1">Google Ads Account ID: 492-391-0021 • Last updated: Just now</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard title="Impressions" value="245.8k" trend="12.5%" trendUp={true} icon={Eye} color="blue" />
                            <StatCard title="Total Clicks" value="8,492" trend="8.2%" trendUp={true} icon={MousePointer} color="indigo" />
                            <StatCard title="Conversions" value="482" trend="2.1%" trendUp={false} icon={Target} color="emerald" />
                            <StatCard title="Cost / Conv." value="$18.40" trend="5.4%" trendUp={true} icon={DollarSign} color="rose" />
                        </div>

                        {/* Chart Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm min-h-[400px] flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Campaign Performance</h3>
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><MoreHorizontal /></button>
                                </div>
                                <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                                    {[35, 45, 30, 60, 75, 50, 65, 80, 55, 45, 90, 70, 85, 60].map((h, i) => (
                                        <div key={i} className="flex-1 w-full bg-blue-50 rounded-t-2xl relative group hover:bg-blue-600 transition-colors duration-300">
                                            <div className="absolute bottom-0 w-full bg-blue-100 rounded-t-2xl transition-all duration-500" style={{ height: `${h}%` }}>
                                                <div className="w-full h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Aug 01</span>
                                    <span>Aug 30</span>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col">
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Top Campaigns</h3>
                                <div className="space-y-6 flex-1">
                                    {[
                                        { name: 'Search | Brand | Exact', spend: '$1.2k', conv: 45, roas: '4.2x' },
                                        { name: 'Display | Retargeting', spend: '$850', conv: 28, roas: '3.1x' },
                                        { name: 'Video | Awareness', spend: '$2.4k', conv: 12, roas: '1.5x' },
                                        { name: 'PMax | All Products', spend: '$3.1k', conv: 156, roas: '5.8x' },
                                    ].map((c, i) => (
                                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-bold text-gray-900 truncate">{c.name}</h4>
                                                <p className="text-[10px] font-medium text-gray-400">Spend: {c.spend} • Conv: {c.conv}</p>
                                            </div>
                                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{c.roas}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Facebook Ads View */}
                {activeTab === 'Facebook Ads' && (
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard title="Total Reach" value="482.1k" trend="15.2%" trendUp={true} icon={Users} color="indigo" />
                            <StatCard title="Impressions" value="1.2M" trend="5.5%" trendUp={true} icon={Eye} color="purple" />
                            <StatCard title="Link Clicks" value="14.2k" trend="3.1%" trendUp={false} icon={MousePointer} color="blue" />
                            <StatCard title="Cost / Result" value="$4.50" trend="1.2%" trendUp={true} icon={Target} color="emerald" />
                        </div>

                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-8">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Ad Set Performance</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-6 py-4 rounded-l-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">Ad Set Name</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Results</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reach</th>
                                            <th className="px-6 py-4 rounded-r-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Spent</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { name: 'Lookalike 1% - Purchasers', status: 'Active', res: '142 Leads', reach: '45,200', spent: '$1,240' },
                                            { name: 'Interest - Marketing Pros', status: 'Active', res: '89 Leads', reach: '32,100', spent: '$980' },
                                            { name: 'Retargeting - 30 Days', status: 'Active', res: '56 Leads', reach: '12,400', spent: '$450' },
                                            { name: 'Broad - Open Targeting', status: 'Paused', res: '12 Leads', reach: '8,200', spent: '$120' },
                                        ].map((row, i) => (
                                            <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-6 font-bold text-sm text-gray-900">{row.name}</td>
                                                <td className="px-6 py-6"><span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">{row.status}</span></td>
                                                <td className="px-6 py-6 font-medium text-gray-600">{row.res}</td>
                                                <td className="px-6 py-6 font-medium text-gray-600">{row.reach}</td>
                                                <td className="px-6 py-6 font-bold text-gray-900">{row.spent}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Call Reporting */}
                {activeTab === 'Call Reporting' && (
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 relative z-10">
                                    <PhoneIncoming size={40} />
                                </div>
                                <h3 className="text-gray-900 font-black text-4xl mb-2 relative z-10">482</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest relative z-10">Total Inbound Calls</p>
                            </div>
                            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 relative z-10">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-gray-900 font-black text-4xl mb-2 relative z-10">356</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest relative z-10">Answered Calls</p>
                            </div>
                            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6 relative z-10">
                                    <PhoneMissed size={40} />
                                </div>
                                <h3 className="text-gray-900 font-black text-4xl mb-2 relative z-10">42</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest relative z-10">Missed Calls</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Call Log</h3>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">All Calls</button>
                                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">Missed Only</button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { caller: '(555) 123-4567', time: 'Today, 2:30 PM', duration: '4m 12s', status: 'Answered', type: 'inbound' },
                                    { caller: '(555) 987-6543', time: 'Today, 11:15 AM', duration: '0m 0s', status: 'Missed', type: 'missed' },
                                    { caller: 'John Doe', time: 'Yesterday, 4:45 PM', duration: '12m 30s', status: 'Answered', type: 'outbound' },
                                    { caller: 'Sarah Smith', time: 'Yesterday, 2:10 PM', duration: '2m 15s', status: 'Answered', type: 'inbound' },
                                ].map((call, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${call.type === 'missed' ? 'bg-rose-100 text-rose-600' :
                                                call.type === 'outbound' ? 'bg-indigo-100 text-indigo-600' :
                                                    'bg-emerald-100 text-emerald-600'
                                                }`}>
                                                {call.type === 'missed' ? <PhoneMissed size={18} /> :
                                                    call.type === 'outbound' ? <PhoneOutgoing size={18} /> :
                                                        <PhoneIncoming size={18} />
                                                }
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">{call.caller}</h4>
                                                <p className="text-xs text-gray-400 font-medium">{call.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${call.status === 'Missed' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                                                }`}>{call.status}</span>
                                            <p className="text-xs font-bold text-gray-400 mt-1">{call.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Appointment Reporting */}
                {activeTab === 'Appointment Reporting' && (
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard title="Booked" value="124" trend="12%" trendUp={true} icon={Calendar} color="blue" />
                            <StatCard title="Confirmed" value="98" trend="8%" trendUp={true} icon={CheckCircle2} color="indigo" />
                            <StatCard title="Showed" value="85" trend="92% Rate" trendUp={true} icon={Users} color="emerald" />
                            <StatCard title="No-Show" value="8" trend="8% Rate" trendUp={false} icon={XCircle} color="rose" />
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Appointment Funnel</h3>
                            <div className="flex items-center justify-between gap-4 h-64">
                                {[100, 80, 68, 60].map((h, i) => (
                                    <div key={i} className="flex-1 h-full flex flex-col justify-end group">
                                        <div className="w-full bg-blue-50 rounded-t-3xl relative overflow-hidden transition-all duration-500 group-hover:bg-blue-600" style={{ height: `${h}%` }}>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-black text-2xl">{h}%</span>
                                            </div>
                                        </div>
                                        <p className="text-center mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            {['Booked', 'Confirmed', 'Showed', 'Sold'][i]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Attribution (Simplified) */}
                {activeTab === 'Attribution' && (
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Attribution Report</h2>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><Search size={18} className="text-gray-500" /></button>
                                    <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><Filter size={18} className="text-gray-500" /></button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="grid grid-cols-4 px-6 py-4 bg-gray-50/80 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Source</span>
                                    <span>Leads</span>
                                    <span>Customers</span>
                                    <span className="text-right">Revenue</span>
                                </div>
                                {[
                                    { src: 'Google Ads', lead: 420, cust: 45, rev: '$24,500' },
                                    { src: 'Facebook Ads', lead: 380, cust: 32, rev: '$18,200' },
                                    { src: 'Direct Traffic', lead: 150, cust: 12, rev: '$8,400' },
                                    { src: 'Organic Search', lead: 210, cust: 24, rev: '$12,600' },
                                    { src: 'Referral', lead: 85, cust: 18, rev: '$9,200' },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-4 px-6 py-6 hover:bg-blue-50/30 rounded-2xl transition-all cursor-pointer group">
                                        <div className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{row.src}</div>
                                        <div className="font-medium text-gray-600 text-sm">{row.lead}</div>
                                        <div className="font-medium text-gray-600 text-sm">{row.cust}</div>
                                        <div className="font-black text-emerald-600 text-sm text-right">{row.rev}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ReportingPage;
