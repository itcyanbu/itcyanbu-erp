import React from 'react';
import { Plus, Tag, Trash2 } from 'lucide-react';

const TagsSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
                    <p className="text-sm text-gray-500">Manage tags used to segment contacts</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Create Tag
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <div className="col-span-10">Tag Name</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {['Lead', 'Customer', 'VIP', 'Newsletter'].map((tag, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50">
                            <div className="col-span-10">
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                                    {tag}
                                </span>
                            </div>
                            <div className="col-span-2 text-right">
                                <button className="p-1 text-gray-400 hover:text-red-500">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagsSettings;
