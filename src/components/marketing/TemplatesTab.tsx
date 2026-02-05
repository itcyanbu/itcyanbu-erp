import { FileText, MessageSquare, Plus, Search, MoreVertical } from 'lucide-react';

interface TemplatesTabProps {
    onCreate?: () => void;
}

const TemplatesTab = ({ onCreate }: TemplatesTabProps) => {
    const templates = [
        { id: 1, name: 'Welcome Email - General', type: 'Email', lastUpdated: '2 days ago', uses: 124 },
        { id: 2, name: 'Appointment Reminder', type: 'SMS', lastUpdated: '1 week ago', uses: 856 },
        { id: 3, name: 'Review Request', type: 'SMS', lastUpdated: '3 days ago', uses: 432 },
        { id: 4, name: 'Holiday Promo 2026', type: 'Email', lastUpdated: 'Yesterday', uses: 0 },
        { id: 5, name: 'Onboarding Sequence #1', type: 'Email', lastUpdated: '1 month ago', uses: 89 },
        { id: 6, name: 'Missed Call Text Back', type: 'SMS', lastUpdated: '2 weeks ago', uses: 1205 },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                        Filter by Type
                    </button>
                    <button
                        onClick={onCreate}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Template
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div key={template.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-40 relative overflow-hidden">
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-gray-100 rounded-md text-gray-500">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg ${template.type === 'Email' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                    {template.type === 'Email' ? <FileText size={20} /> : <MessageSquare size={20} />}
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{template.name}</h3>
                            <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                                <span>Updated {template.lastUpdated}</span>
                                <span>{template.uses} sent</span>
                            </div>
                        </div>
                        {/* Decorative bottom border */}
                        <div className={`h-1 w-full ${template.type === 'Email' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatesTab;
