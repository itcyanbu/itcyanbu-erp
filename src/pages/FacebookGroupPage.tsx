import { useState } from 'react';
import {
    Facebook,
    Link,
    Settings,
    Users,
    Zap,
    MessageSquare,
    Search,
    Plus,
    CheckCircle2,
    Info,
    ExternalLink,
    MoreHorizontal,
    ArrowRight,
    TrendingUp,
    Shield
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const FacebookGroupPage = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [mainTab, setMainTab] = useState('Manager');
    const [activeTab, setActiveTab] = useState('Groups');
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [groups, setGroups] = useState([
        { id: '1', name: 'Agency Scaler Mastermind', members: '12,450', type: 'Private Community', active: true, lastSynced: '2 mins' }
    ]);
    const [settingsState, setSettingsState] = useState([
        { title: 'Auto-Approve Sync', desc: 'Automatically sync members after Facebook approval.', active: false },
        { title: 'Pre-Approval Sync', desc: 'Sync members as soon as they request to join.', active: true }
    ]);

    const notify = (msg: string) => {
        setNotificationMsg(msg);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const toggleSetting = (index: number) => {
        const newSettings = [...settingsState];
        newSettings[index].active = !newSettings[index].active;
        setSettingsState(newSettings);
        notify(`${newSettings[index].title} updated`);
    };

    const handleAddGroup = (name: string) => {
        const newGroup = {
            id: Date.now().toString(),
            name,
            members: '0',
            type: 'Public Group',
            active: true,
            lastSynced: 'Just now'
        };
        setGroups([newGroup, ...groups]);
        setIsAddModalOpen(false);
        notify(`${name} connected successfully!`);
    };

    const tabs = [
        { id: 'Groups', label: t('facebook_group.tabs.groups'), icon: Facebook },
        { id: 'Automations', label: t('facebook_group.tabs.automations'), icon: Zap },
        { id: 'Member Questions', label: t('facebook_group.tabs.questions'), icon: MessageSquare },
        { id: 'Settings', label: t('facebook_group.tabs.settings'), icon: Settings },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#f8fafc] overflow-hidden font-sans text-ghl-text relative w-full">
            {/* Header / Main Tabs */}
            <header className="px-6 lg:px-10 pt-8 bg-white border-b border-gray-100 shrink-0 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] relative z-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                    <div className="flex items-center gap-6 lg:gap-10 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        <button
                            onClick={() => setMainTab('Manager')}
                            className={clsx(
                                "pb-6 text-xl lg:text-2xl font-black transition-all relative uppercase tracking-[0.05em] whitespace-nowrap",
                                mainTab === 'Manager' ? 'text-ghl-blue' : 'text-gray-300 hover:text-gray-500'
                            )}
                        >
                            <span className="flex items-center gap-3">
                                <Facebook size={24} className={mainTab === 'Manager' ? 'text-ghl-blue' : 'text-gray-300'} />
                                {t('facebook_group.title')}
                            </span>
                            {mainTab === 'Manager' && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-ghl-blue rounded-t-full shadow-[0_0_15px_rgba(21,94,239,0.5)] animate-in slide-in-from-bottom-2 duration-500" />}
                        </button>
                        <button
                            onClick={() => setMainTab('Connector')}
                            className={clsx(
                                "pb-6 text-xl lg:text-2xl font-black transition-all relative flex items-center gap-3 uppercase tracking-[0.05em] whitespace-nowrap",
                                mainTab === 'Connector' ? 'text-ghl-blue' : 'text-gray-300 hover:text-gray-500'
                            )}
                        >
                            {t('facebook_group.connector_status')}
                            <span className={clsx(
                                "px-3 py-1 text-[10px] font-black uppercase rounded-lg tracking-widest border transition-all",
                                mainTab === 'Connector' ? 'bg-ghl-blue text-white border-ghl-blue shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                            )}>
                                {t('facebook_group.official')}
                            </span>
                            {mainTab === 'Connector' && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-ghl-blue rounded-t-full shadow-[0_0_15px_rgba(21,94,239,0.5)] animate-in slide-in-from-bottom-2 duration-500" />}
                        </button>
                    </div>
                    <div className="flex gap-3 mb-4 shrink-0 justify-end items-center">
                        <button
                            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 hover:border-gray-300 flex items-center gap-2 shadow-sm transition-all active:scale-95 group"
                            onClick={() => window.open('https://help.gohighlevel.com', '_blank')}
                        >
                            <Info size={16} className="text-gray-400 group-hover:text-ghl-blue transition-colors" />
                            {t('facebook_group.tutorial')}
                        </button>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-ghl-blue to-blue-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-blue-200 transition-all shadow-md shadow-blue-100 active:scale-95 flex items-center gap-2.5"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus size={18} strokeWidth={3} />
                            {t('facebook_group.add_group')}
                        </button>
                    </div>
                </div>

                {mainTab === 'Manager' && (
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar -mb-[2px]">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] border-b-[3px] transition-all flex items-center gap-3 whitespace-nowrap group",
                                    activeTab === tab.id
                                        ? 'border-ghl-blue text-ghl-blue bg-blue-50/50'
                                        : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50/50'
                                )}
                            >
                                <tab.icon size={18} className={activeTab === tab.id ? 'text-ghl-blue scale-110 shadow-blue-200 transition-transform' : 'text-gray-400 group-hover:text-gray-600'} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
                {mainTab === 'Manager' && (
                    <div className="p-6 lg:p-10 w-full max-w-[1600px] mx-auto">
                        {activeTab === 'Groups' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
                                {/* Stats Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                    {[
                                        { label: 'Total Members', value: '24,850', icon: Users, color: 'ghl-blue', trend: '+12% this month' },
                                        { label: 'Leads Syncing', value: '1,420', icon: TrendingUp, color: 'emerald-500', trend: 'Active now' },
                                        { label: 'Automations', value: '12', icon: Zap, color: 'indigo-500', trend: '3 updated today' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                                            <div className="flex justify-between items-start relative z-10">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                                                    <h4 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">{stat.value}</h4>
                                                    <p className="text-[10px] font-bold text-emerald-500 mt-2 flex items-center gap-1">
                                                        {stat.trend}
                                                    </p>
                                                </div>
                                                <div className={clsx(
                                                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                                                    i === 0 ? "bg-blue-50 text-ghl-blue" : i === 1 ? "bg-emerald-50 text-emerald-500" : "bg-indigo-50 text-indigo-500"
                                                )}>
                                                    <stat.icon size={28} />
                                                </div>
                                            </div>
                                            <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                                                <stat.icon size={120} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div>
                                            <h2 className="text-xl lg:text-2xl font-black text-gray-900 uppercase tracking-tight">{t('facebook_group.manager.connected_groups')}</h2>
                                            <p className="text-sm font-medium text-gray-400">Manage your synced communities and leads</p>
                                        </div>
                                        <div className="relative group w-full sm:w-80">
                                            <Search className={clsx(
                                                "absolute top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ghl-blue transition-colors z-10",
                                                isRtl ? "right-4" : "left-4"
                                            )} size={18} />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={handleSearch}
                                                placeholder={t('facebook_group.manager.search_placeholder')}
                                                className={clsx(
                                                    "w-full py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-ghl-blue/50 text-sm font-bold shadow-sm transition-all",
                                                    isRtl ? "pr-12 pl-6 text-right" : "pl-12 pr-6 text-left"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Group Cards */}
                                    {groups.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())).map((group) => (
                                        <div key={group.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-6 lg:p-10 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-700 group relative">
                                            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 relative z-10">
                                                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 text-center lg:text-left rtl:lg:text-right w-full lg:w-auto">
                                                    <div className="w-24 h-24 rounded-[1.75rem] bg-gradient-to-br from-ghl-blue to-blue-700 flex items-center justify-center text-white shrink-0 shadow-2xl shadow-blue-200 group-hover:scale-105 group-hover:rotate-2 transition-all duration-700">
                                                        <Facebook size={48} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{group.name}</h3>
                                                            {group.active && <CheckCircle2 size={24} className="text-emerald-500" />}
                                                        </div>
                                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{group.members} Members • {group.type}</p>
                                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
                                                            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 animate-pulse">
                                                                <Zap size={14} fill="currentColor" /> {t('facebook_group.manager.active_sync')}
                                                            </div>
                                                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                                                                <div className="w-2 h-2 rounded-full bg-ghl-blue animate-ping" />
                                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                                    {t('facebook_group.manager.last_synced', { time: group.lastSynced })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 shrink-0">
                                                    <button className="p-4 bg-gray-50 text-gray-400 hover:text-ghl-blue hover:bg-blue-50 rounded-2xl transition-all shadow-sm active:scale-90">
                                                        <ExternalLink size={20} />
                                                    </button>
                                                    <button className="p-4 bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl shadow-sm active:scale-90">
                                                        <MoreHorizontal size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-blue-50/30 rounded-[2.5rem] border-4 border-dashed border-blue-100/50 p-12 text-center group hover:bg-white hover:border-ghl-blue/30 transition-all duration-700">
                                        <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                                            <Link size={32} className="text-ghl-blue" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{t('facebook_group.manager.connect_title')}</h3>
                                        <p className="text-sm font-medium text-gray-400 mt-4 max-w-sm mx-auto leading-relaxed">{t('facebook_group.manager.connect_desc')}</p>
                                        <button
                                            className="mt-8 px-10 py-4 bg-ghl-blue text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95"
                                            onClick={() => setIsAddModalOpen(true)}
                                        >
                                            {t('facebook_group.manager.begin_connection')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Automations' && (
                            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden relative">
                                    <div className="flex flex-col sm:flex-row items-start justify-between gap-8 relative z-10">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center shadow-inner shadow-purple-100 shrink-0 group-hover:rotate-6 transition-transform">
                                                <Zap size={36} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{t('facebook_group.manager.welcome_sequence')}</h3>
                                                <p className="text-base font-medium text-gray-400 mt-1">{t('facebook_group.manager.welcome_desc')}</p>
                                                <div className="flex flex-wrap items-center gap-6 mt-10 p-8 bg-gray-50/80 rounded-[2rem] border border-gray-100 w-fit">
                                                    <div className="flex items-center gap-3 text-[11px] font-black text-gray-600 uppercase tracking-widest">
                                                        <Users size={18} className="text-purple-500" />
                                                        Add Tag: <span className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 ml-1 text-purple-600 shadow-sm font-mono text-xs">FB-Group-Lead</span>
                                                    </div>
                                                    <ArrowRight size={20} className={clsx("text-gray-300", isRtl && "rotate-180")} />
                                                    <div className="flex items-center gap-3 text-[11px] font-black text-gray-600 uppercase tracking-widest">
                                                        <Zap size={18} className="text-purple-500" />
                                                        Workflow: <span className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 ml-1 text-purple-600 shadow-sm font-mono text-xs">Group Onboarding</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer group shrink-0">
                                            <div className="w-16 h-8 bg-emerald-500 rounded-full shadow-inner transition-colors duration-300"></div>
                                            <div className="absolute left-8 w-7 h-7 bg-white rounded-full transition-all shadow-lg border border-emerald-100"></div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl pointer-events-none" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'Member Questions' && (
                            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-lg overflow-hidden">
                                    <div className="px-10 py-10 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{t('facebook_group.manager.mapping_title')}</h3>
                                            <p className="text-sm font-medium text-gray-400 mt-1">Map answers to HighLevel contact fields</p>
                                        </div>
                                        <MessageSquare size={32} className="text-ghl-blue opacity-20" />
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {[
                                            { q: "What is your biggest obstacle?", m: "Obstacle (Custom Field)" },
                                            { q: "What is your website URL?", m: "Website (Standard Field)" },
                                            { q: "Best email for training?", m: "Email (Standard Field)" }
                                        ].map((item, i) => (
                                            <div key={i} className="px-10 py-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-blue-50/20 transition-all group gap-6">
                                                <div className="flex items-center gap-8">
                                                    <span className="w-12 h-12 rounded-[1.25rem] bg-gray-50 flex items-center justify-center text-sm font-black text-gray-400 group-hover:bg-ghl-blue group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200 transition-all duration-300">{i + 1}</span>
                                                    <p className="text-base font-bold text-gray-700">{item.q}</p>
                                                </div>
                                                <div className="flex items-center gap-8 self-end md:self-auto">
                                                    <ArrowRight size={20} className={clsx("text-gray-300 group-hover:text-ghl-blue transition-colors", isRtl && "rotate-180")} />
                                                    <span className="px-6 py-3 bg-white text-ghl-blue text-[11px] font-black uppercase tracking-widest rounded-2xl border border-blue-100 shadow-sm shadow-blue-50 group-hover:border-ghl-blue transition-all">{item.m}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-10 bg-gray-50/30 text-center border-t border-gray-100">
                                        <button className="px-12 py-4 bg-white border border-gray-200 text-ghl-blue text-[11px] font-black uppercase tracking-[0.25em] rounded-2xl hover:bg-ghl-blue hover:text-white transition-all shadow-sm active:scale-95">
                                            {t('facebook_group.manager.update_mapping')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Settings' && (
                            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="space-y-10">
                                    <div>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="h-[2px] flex-1 bg-gray-100"></div>
                                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Sync Configuration</h3>
                                            <div className="h-[2px] flex-1 bg-gray-100"></div>
                                        </div>
                                        <div className="space-y-6">
                                            {settingsState.map((setting, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => toggleSetting(i)}
                                                    className="flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group gap-6 border-l-4 border-l-transparent hover:border-l-ghl-blue cursor-pointer active:scale-[0.98]"
                                                >
                                                    <div>
                                                        <p className="text-base font-black text-gray-900 uppercase tracking-tight">{setting.title}</p>
                                                        <p className="text-sm font-medium text-gray-400 mt-1">{setting.desc}</p>
                                                    </div>
                                                    <div className={clsx(
                                                        "relative inline-flex items-center w-16 h-8 rounded-full shadow-inner transition-all duration-300",
                                                        setting.active ? "bg-ghl-blue shadow-blue-200/50" : "bg-gray-200"
                                                    )}>
                                                        <div className={clsx(
                                                            "absolute w-6 h-6 bg-white rounded-full transition-all shadow-md",
                                                            setting.active ? "left-9" : "left-1"
                                                        )} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {mainTab === 'Connector' && (
                    <div className="p-6 lg:p-10 w-full max-w-[1400px] mx-auto">
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { label: t('facebook_group.connector.status'), value: t('facebook_group.connector.connected'), icon: CheckCircle2, color: 'emerald' },
                                    { label: t('facebook_group.connector.latency'), value: '124ms', icon: Zap, color: 'blue' },
                                    { label: t('facebook_group.connector.heartbeat'), value: t('facebook_group.connector.just_now'), icon: TrendingUp, color: 'indigo' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group hover:shadow-xl transition-all border-b-4 hover:border-b-ghl-blue">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                                        <h4 className={clsx(
                                            "text-3xl font-black tracking-tight flex items-center gap-3",
                                            stat.color === 'emerald' ? 'text-emerald-500' : 'text-gray-900'
                                        )}>
                                            {i === 0 && <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse outline outline-8 outline-emerald-500/20" />}
                                            {stat.value}
                                        </h4>
                                        <div className={`absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-10 transition-opacity text-ghl-blue`}>
                                            <stat.icon size={100} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/20 overflow-hidden flex flex-col">
                                <div className="p-8 lg:p-14 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 uppercase tracking-tight">{t('facebook_group.connector.title')}</h3>
                                        <p className="text-lg text-gray-400 font-medium mt-2">{t('facebook_group.connector.subtitle')}</p>
                                    </div>
                                    <div className="w-24 h-24 bg-blue-50 text-ghl-blue rounded-[2rem] shadow-inner shadow-blue-100 flex items-center justify-center shrink-0 z-10 animate-pulse">
                                        <Shield size={48} />
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-30 blur-3xl pointer-events-none" />
                                </div>
                                <div className="p-8 lg:p-14 space-y-12">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-10 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 group hover:bg-blue-50 transition-all duration-500 gap-8">
                                        <div className="flex items-center gap-8">
                                            <div className="w-20 h-20 bg-white shadow-2xl shadow-blue-100 rounded-[1.75rem] flex items-center justify-center text-ghl-blue group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                                                <Facebook size={40} />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Chrome Extension v2.4.1</h4>
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">{t('facebook_group.connector.extension_detected')}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="px-10 py-5 bg-white text-ghl-blue text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-ghl-blue hover:text-white transition-all shadow-sm active:scale-90 border border-blue-100"
                                            onClick={() => notify(t('facebook_group.connector.check_updates'))}
                                        >
                                            {t('facebook_group.connector.check_updates')}
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        <label className="block group">
                                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] ml-6 mb-4 block group-hover:text-ghl-blue transition-colors">Connector API Key</span>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="password"
                                                        readOnly
                                                        value="sk_live_fb_8d2k9s1j4n6m5l"
                                                        className="w-full px-10 py-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-sm font-mono text-gray-400 focus:ring-4 focus:ring-blue-50 focus:border-ghl-blue/30 outline-none transition-all"
                                                    />
                                                    <Shield size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                                </div>
                                                <button
                                                    className="px-12 py-6 bg-ghl-blue text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-90 flex items-center justify-center gap-3"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText("sk_live_fb_8d2k9s1j4n6m5l");
                                                        alert("API Key copied securely!");
                                                    }}
                                                >
                                                    Copy Secure Key
                                                </button>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {showNotification && (
                <div className={clsx(
                    "fixed bottom-10 bg-gray-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl z-[100] animate-in fade-in slide-in-from-bottom-10 flex items-center gap-4 border border-gray-800",
                    isRtl ? "left-10" : "right-10"
                )}>
                    <div className="w-10 h-10 bg-ghl-blue rounded-xl flex items-center justify-center">
                        <Zap size={20} className="animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Notification</p>
                        <p className="text-sm font-bold">{notificationMsg}</p>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 lg:p-10">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)} />
                    <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{t('facebook_group.manager.connect_title')}</h3>
                                <p className="text-sm font-medium text-gray-400 mt-1">Select the community you want to sync</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                                <Plus size={24} className="rotate-45 text-gray-400" />
                            </button>
                        </div>
                        <div className="p-10 space-y-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Available Groups</label>
                                {[
                                    'SaaS Founders Elite',
                                    'Marketing Automation Experts',
                                    'HighLevel VIP Users'
                                ].map((gName) => (
                                    <button
                                        key={gName}
                                        onClick={() => handleAddGroup(gName)}
                                        className="w-full p-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-ghl-blue hover:shadow-xl hover:shadow-blue-500/5 transition-all group group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-ghl-blue group-hover:bg-ghl-blue group-hover:text-white transition-all">
                                                <Facebook size={24} />
                                            </div>
                                            <span className="text-lg font-bold text-gray-700">{gName}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                            <ArrowRight size={20} className={clsx("text-ghl-blue", isRtl && "rotate-180")} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacebookGroupPage;
