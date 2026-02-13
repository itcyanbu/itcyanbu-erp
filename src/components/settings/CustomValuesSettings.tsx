import React from 'react';
import { Plus, Database, Edit2, Trash2 } from 'lucide-react';

const CustomValuesSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Custom Values</h2>
                    <p className="text-sm text-gray-500">Manage global values that can be used across the system</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Add Value
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-4">Key</div>
                    <div className="col-span-2">Value</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {[
                        { name: 'Main Support Email', key: 'custom_values.support_email', value: 'support@itc.com' },
                        { name: 'CEO Name', key: 'custom_values.ceo_name', value: 'Abdullah' },
                    ].map((val, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50">
                            <div className="col-span-4 font-medium text-gray-900">{val.name}</div>
                            <div className="col-span-4 text-xs font-mono text-gray-500 bg-gray-100 p-1 rounded w-fit">{val.key}</div>
                            <div className="col-span-2 text-gray-700 truncate">{val.value}</div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <button className="p-1 text-gray-400 hover:text-ghl-blue">
                                    <Edit2 size={16} />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomValuesSettings;
