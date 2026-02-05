import React from 'react';
import { X, Search, FileText, Zap, Star } from 'lucide-react';

interface CreateWorkflowModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (templateId?: string) => void;
}

const CreateWorkflowModal: React.FC<CreateWorkflowModalProps> = ({ isOpen, onClose, onCreate }) => {
    if (!isOpen) return null;

    const templates = [
        { id: 'scratch', name: 'Start from Scratch', description: 'Build your own workflow from the ground up.', icon: Zap, color: 'bg-gray-100 text-gray-600' },
        { id: 'review', name: 'Google Review Request', description: 'Send a review request after an appointment.', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
        { id: 'birthday', name: 'Birthday Template', description: 'Send a birthday SMS and Email automatically.', icon: FileText, color: 'bg-pink-100 text-pink-600' },
        { id: 'nurture', name: 'Fast 5 Nurture', description: 'Nurture new leads who reply to your form.', icon: Zap, color: 'bg-blue-100 text-blue-600' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Create New Workflow</h2>
                        <p className="text-sm text-gray-500">Choose a recipe to start or build from scratch.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 shrink-0 overflow-y-auto hidden md:block">
                        <div className="space-y-1">
                            {['All', 'Recipes', 'Appointment', 'Marketing', 'Sales', 'Payments'].map((cat) => (
                                <button
                                    key={cat}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${cat === 'All' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Template Grid */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="mb-6 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => onCreate(template.id)}
                                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full bg-white"
                                >
                                    <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <template.icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                                    <p className="text-sm text-gray-500 flex-1">{template.description}</p>
                                    <div className="mt-4 pt-4 border-t border-gray-50">
                                        <span className="text-xs font-medium text-blue-600 group-hover:underline">Select Template &rarr;</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateWorkflowModal;
