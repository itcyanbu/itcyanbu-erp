import { useState } from 'react';
import {
    Workflow,
    Megaphone,
    Zap,
    Bot,
    Plus,
    Search,
    MoreHorizontal,
    Clock,
    Folder,
    Filter,
    ArrowUpDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateWorkflowModal from '../components/automation/CreateWorkflowModal';

const AutomationPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Workflows');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [sidebarFilter, setSidebarFilter] = useState('All');

    const tabs = [
        { id: 'Workflows', label: 'Workflows', icon: Workflow },
        { id: 'Content AI', label: 'Content AI', icon: Bot },
        { id: 'Campaigns', label: 'Campaigns (Legacy)', icon: Megaphone },
        { id: 'Triggers', label: 'Triggers (Legacy)', icon: Zap },
    ];

    const folders = [
        { id: 'all', name: 'All Workflows', count: 12 },
        { id: 'drafts', name: 'Drafts', count: 4 },
        { id: 'published', name: 'Published', count: 8 },
        { id: 'folder1', name: 'Nurture Campaigns', count: 3 },
        { id: 'folder2', name: 'Appointment Reminders', count: 2 },
        { id: 'folder3', name: 'Internal Notifications', count: 5 },
    ];

    const workflows = [
        { id: 1, name: 'Google Review Request', status: 'Published', enrolled: 124, lastUpdated: 'Oct 24, 2025', author: 'Admin User' },
        { id: 2, name: 'New Lead Nurture', status: 'Published', enrolled: 856, lastUpdated: 'Feb 02, 2026', author: 'Sales Team' },
        { id: 3, name: 'Appointment Reminder', status: 'Published', enrolled: 432, lastUpdated: 'Yesterday', author: 'Admin User' },
        { id: 4, name: 'Birthday Promo', status: 'Draft', enrolled: 0, lastUpdated: '3 days ago', author: 'Marketing' },
        { id: 5, name: 'Webinar Follow-up', status: 'Draft', enrolled: 0, lastUpdated: 'Just now', author: 'Admin User' },
    ];

    const handleCreateWorkflow = (templateId?: string) => {
        setIsCreateModalOpen(false);
        // In a real app, this would use the templateId to pre-fill the builder
        console.log('Creating workflow with template:', templateId);
        navigate('/automation/builder');
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
            <CreateWorkflowModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateWorkflow}
            />

            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Automation</h1>
                        <p className="text-gray-500 mt-1">Streamline your business with powerful workflows.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Plus size={16} />
                            Create Workflow
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
            <div className="flex-1 overflow-hidden flex">
                {activeTab === 'Workflows' ? (
                    <>
                        {/* Sidebar (Folders) */}
                        <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto hidden md:flex">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <span className="font-bold text-gray-700 text-sm">Folders</span>
                                <button className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors">
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="p-2 space-y-1">
                                {folders.map(folder => (
                                    <button
                                        key={folder.id}
                                        onClick={() => setSidebarFilter(folder.name)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between group ${sidebarFilter === folder.name ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Folder size={16} className={sidebarFilter === folder.name ? 'fill-blue-200' : 'text-gray-400'} />
                                            <span className="truncate">{folder.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-400 group-hover:text-gray-500">{folder.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Workflow List */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="relative w-full max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search workflows..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                                        <Filter size={16} />
                                        Filter
                                    </button>
                                    <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                                        <ArrowUpDown size={16} />
                                        Sort
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <table className="w-full text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50 text-gray-700 uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Name</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium">Total Enrolled</th>
                                            <th className="px-6 py-4 font-medium">Last Updated</th>
                                            <th className="px-6 py-4 font-medium">Author</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {workflows.map((workflow) => (
                                            <tr key={workflow.id} className="hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => navigate('/automation/builder')}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                                            <Workflow size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{workflow.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${workflow.status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${workflow.status === 'Published' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                                        {workflow.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {workflow.enrolled.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 flex items-center gap-2">
                                                    <Clock size={14} className="text-gray-400" />
                                                    {workflow.lastUpdated}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {workflow.author}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100" onClick={(e) => e.stopPropagation()}>
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 p-8 text-center mt-20">
                        {/* Placeholder for other tabs */}
                        <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            {/* Icon based on tab */}
                            {activeTab === 'Content AI' ? <Bot size={32} /> : activeTab === 'Campaigns' ? <Megaphone size={32} /> : <Zap size={32} />}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{tabs.find(t => t.id === activeTab)?.label}</h2>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">This section is currently under development or is a legacy feature.</p>
                        <button onClick={() => setActiveTab('Workflows')} className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                            Back to Workflows
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutomationPage;
