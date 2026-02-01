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
    ArrowRight
} from 'lucide-react';

const FacebookGroupPage = () => {
    const [activeTab, setActiveTab] = useState('Groups');

    const tabs = [
        { id: 'Groups', label: 'Groups', icon: Facebook },
        { id: 'Automations', label: 'Automations', icon: Zap },
        { id: 'Member Questions', label: 'Questions', icon: MessageSquare },
        { id: 'Settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden text-ghl-text">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900">Facebook Group Manager</h1>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded tracking-wider border border-blue-100">Official Connector</span>
                        </div>
                        <p className="text-gray-500 mt-1">Sync group members, capture question answers, and automate welcomes.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Info size={16} />
                            Tutorial
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            Add Group
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">

                {activeTab === 'Groups' && (
                    <div className="max-w-5xl mx-auto space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold text-gray-900">Connected Groups</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input type="text" placeholder="Search groups..." className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm outline-none w-64 focus:ring-1 focus:ring-blue-500" />
                            </div>
                        </div>

                        {/* Group Card */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 hover:border-blue-300 transition-colors group">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                                        <Facebook size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            Agency Scaler Mastermind
                                            <CheckCircle2 size={16} className="text-green-500" />
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">12,450 Members • Private Group</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium">
                                                <Zap size={12} fill="currentColor" /> Active Sync
                                            </div>
                                            <span className="text-xs text-gray-400">Last synced 2 mins ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <ExternalLink size={18} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl border border-blue-100 p-8 text-center border-dashed">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Link size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Connect another group</h3>
                            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">Collect leads from your membership questions and automatically sync them to your HighLevel CRM.</p>
                            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Begin Connection
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Automations' && (
                    <div className="max-w-4xl mx-auto space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 italic">Member Welcome Sequence</h3>
                                        <p className="text-sm text-gray-500 mt-1">Triggered when a new member is approved in Agency Scaler Mastermind.</p>
                                        <div className="flex items-center gap-4 mt-4 py-2 px-3 bg-gray-50 rounded-lg border border-gray-100 w-fit">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Users size={14} className="text-purple-500" />
                                                Add Tag: <code>FB-Group-Lead</code>
                                            </div>
                                            <ArrowRight size={14} className="text-gray-300" />
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Zap size={14} className="text-purple-500" />
                                                Workflow: <code>Group Onboarding</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <div className="w-10 h-5 bg-green-500 rounded-full"></div>
                                    <div className="absolute left-5 w-4 h-4 bg-white rounded-full transition shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Member Questions' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-semibold text-gray-900">Question Mapping</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { q: "What is your biggest obstacle?", m: "Obstacle (Custom Field)" },
                                    { q: "What is your website URL?", m: "Website (Standard Field)" },
                                    { q: "Best email for training?", m: "Email (Standard Field)" }
                                ].map((item, i) => (
                                    <div key={i} className="px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">{i + 1}</span>
                                            <p className="text-sm font-medium text-gray-700">{item.q}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <ArrowRight size={14} className="text-gray-300" />
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg border border-blue-100">{item.m}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-gray-50 text-center">
                                <button className="text-blue-600 text-sm font-medium hover:underline">Update Mapping</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Settings' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Sync Configuration</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Auto-Approve Sync</p>
                                            <p className="text-xs text-gray-500">Automatically sync members after Facebook approval.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Pre-Approval Sync</p>
                                            <p className="text-xs text-gray-500">Sync members as soon as they request to join.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                                            <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacebookGroupPage;
