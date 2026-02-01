import { useState } from 'react';
import {
    Workflow,
    Megaphone,
    Zap,
    Bot,
    Plus,
    Search,
    MoreHorizontal,
    Clock
} from 'lucide-react';

const AutomationPage = () => {
    const [activeTab, setActiveTab] = useState('Workflows');

    const tabs = [
        { id: 'Workflows', label: 'Workflows', icon: Workflow },
        { id: 'Campaigns', label: 'Campaigns', icon: Megaphone },
        { id: 'Triggers', label: 'Triggers', icon: Zap },
        { id: 'Content AI', label: 'Content AI', icon: Bot },
    ];

    const workflows = [
        { id: 1, name: 'Google Review Request', status: 'Active', enrolled: 124, lastRun: '2 mins ago', type: 'Review' },
        { id: 2, name: 'New Lead Nurture', status: 'Active', enrolled: 856, lastRun: '1 hour ago', type: 'Sales' },
        { id: 3, name: 'Appointment Reminder', status: 'Active', enrolled: 432, lastRun: '5 mins ago', type: 'Appointment' },
        { id: 4, name: 'Birthday Promo', status: 'Paused', enrolled: 12, lastRun: '3 days ago', type: 'Marketing' },
        { id: 5, name: 'Webinar Follow-up', status: 'Draft', enrolled: 0, lastRun: 'Never', type: 'Marketing' },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Automation</h1>
                        <p className="text-gray-500 mt-1">Streamline your business with powerful workflows and automations.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus size={16} />
                            Create Workflow
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === tab.id
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

                {activeTab === 'Workflows' && (
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Filters and Search */}
                        <div className="flex items-center justify-between">
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search workflows..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Draft</option>
                                    <option>Paused</option>
                                </select>
                                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>Newest First</option>
                                    <option>Oldest First</option>
                                    <option>Name A-Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Workflows List */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-sm text-gray-500">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Total Enrolled</th>
                                        <th className="px-6 py-4 font-medium">Last Run</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {workflows.map((workflow) => (
                                        <tr key={workflow.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                        <Workflow size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{workflow.name}</p>
                                                        <p className="text-xs text-gray-400">{workflow.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${workflow.status === 'Active' ? 'bg-green-50 text-green-700' :
                                                    workflow.status === 'Draft' ? 'bg-gray-100 text-gray-600' :
                                                        'bg-amber-50 text-amber-700'
                                                    }`}>
                                                    {workflow.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                                                    {workflow.status === 'Draft' && <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>}
                                                    {workflow.status === 'Paused' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                                                    {workflow.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {workflow.enrolled.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <Clock size={14} className="text-gray-400" />
                                                {workflow.lastRun}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Campaigns' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Megaphone size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Campaigns (Legacy)</h2>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">Campaigns are a legacy feature. We recommend using Workflows for more advanced and flexible automation.</p>
                        <div className="flex justify-center gap-4 mt-8">
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                Create Campaign
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                GO to Workflows
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Triggers' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Triggers (Legacy)</h2>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">Triggers have been moved inside Workflows to provide a more unified experience.</p>
                        <button className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Explore Workflows
                        </button>
                    </div>
                )}

                {activeTab === 'Content AI' && (
                    <div className="max-w-4xl mx-auto text-center mt-20">
                        <div className="w-20 h-20 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bot size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Content AI</h2>
                        <p className="text-gray-500 mt-2">Generate high-converting content for your emails, social posts, and ad copy using AI.</p>
                        <button className="mt-8 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                            Start Generating
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutomationPage;
