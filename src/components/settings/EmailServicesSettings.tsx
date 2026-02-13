import React from 'react';
import { Mail, Plus } from 'lucide-react';

const EmailServicesSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Email Services</h2>
                    <p className="text-sm text-gray-500">Configure SMTP services for sending emails</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Add Service
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-ghl-blue" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">LeadConnector Email</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Your account is currently using LeadConnector Email for optimal deliverability.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="text-ghl-blue font-medium hover:underline">
                        View Statistics
                    </button>
                    <button className="text-ghl-blue font-medium hover:underline">
                        Dedicated IP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailServicesSettings;
