import React from 'react';
import { Plus, Globe, CheckCircle } from 'lucide-react';

const DomainsSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Domains</h2>
                    <p className="text-sm text-gray-500">Connect and manage your domains for funnels and websites</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Add Domain
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Connected Domains</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="p-6 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-50 rounded-full">
                                <Globe className="text-ghl-blue" size={24} />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">app.itcyanbu.com</h4>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <CheckCircle size={12} className="text-green-500" />
                                    SSL Secured
                                </p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Default Domain
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DomainsSettings;
