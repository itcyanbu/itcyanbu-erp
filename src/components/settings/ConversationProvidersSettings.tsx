import React from 'react';
import { MessageSquare, Settings } from 'lucide-react';

const ConversationProvidersSettings = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Conversation Providers</h2>
                <p className="text-sm text-gray-500">Manage Email and SMS providers</p>
            </div>

            <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <MessageSquare className="text-ghl-blue" size={24} />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">SMS Provider</h3>
                            <p className="text-sm text-gray-500">LeadConnector Phone (Default)</p>
                        </div>
                    </div>
                    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium">
                        Manage
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <MessageSquare className="text-ghl-blue" size={24} />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Email Provider</h3>
                            <p className="text-sm text-gray-500">LeadConnector Email (Default)</p>
                        </div>
                    </div>
                    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium">
                        Manage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConversationProvidersSettings;
