import React from 'react';
import { Plus, FileText } from 'lucide-react';

const TemplatesSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Message Templates</h2>
                    <p className="text-sm text-gray-500">Manage SMS and Email templates for quick communication</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm">
                        Add Folder
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium text-sm">
                        <Plus size={18} />
                        Add Template
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Welcome SMS', type: 'SMS' },
                    { name: 'Appt Reminder', type: 'Email' },
                    { name: 'Follow-up', type: 'SMS' },
                ].map((template, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-ghl-blue cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <FileText className="text-ghl-blue" size={20} />
                            </div>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {template.type}
                            </span>
                        </div>
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">Last edited 2 days ago</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatesSettings;
