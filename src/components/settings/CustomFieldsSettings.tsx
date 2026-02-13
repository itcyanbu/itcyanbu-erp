import React from 'react';
import { Plus, Settings } from 'lucide-react';

const CustomFieldsSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Custom Fields</h2>
                    <p className="text-sm text-gray-500">Manage custom fields for contacts and opportunities</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Add Field
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <div className="col-span-4">Field Name</div>
                    <div className="col-span-3">Object</div>
                    <div className="col-span-3">Type</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {[
                        { name: 'Source', object: 'Contact', type: 'Text' },
                        { name: 'Preferred Comms', object: 'Contact', type: 'Dropdown' },
                        { name: 'Estimated Value', object: 'Opportunity', type: 'Monetary' },
                    ].map((field, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50">
                            <div className="col-span-4 font-medium text-gray-900">{field.name}</div>
                            <div className="col-span-3 text-gray-500">{field.object}</div>
                            <div className="col-span-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {field.type}
                                </span>
                            </div>
                            <div className="col-span-2 text-right">
                                <button className="text-gray-400 hover:text-ghl-blue">
                                    <Settings size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomFieldsSettings;
