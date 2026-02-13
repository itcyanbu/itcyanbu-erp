import React from 'react';
import { Plus, ArrowLeftRight } from 'lucide-react';

const UrlRedirectsSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">URL Redirects</h2>
                    <p className="text-sm text-gray-500">Manage 301 and 302 redirects for your domains</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Add Redirect
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <div className="col-span-3">Domain</div>
                    <div className="col-span-3">Path</div>
                    <div className="col-span-4">Target URL</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                <div className="p-8 text-center text-gray-500">
                    No redirects configured yet.
                </div>
            </div>
        </div>
    );
};

export default UrlRedirectsSettings;
