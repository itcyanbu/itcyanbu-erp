import React from 'react';
import { Plus, Phone } from 'lucide-react';

const PhoneNumbersSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Phone Numbers</h2>
                    <p className="text-sm text-gray-500">Manage your business phone numbers and SMS settings</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Add Number
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Associated Numbers</h3>
                </div>
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="text-ghl-blue" size={32} />
                    </div>
                    <p className="text-gray-500 mb-4">You haven't added any phone numbers yet.</p>
                    <button className="text-ghl-blue font-medium hover:underline">
                        Provision a new number
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhoneNumbersSettings;
