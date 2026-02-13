import React from 'react';
import { MessageSquare, QrCode } from 'lucide-react';

const WhatsAppSettings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">WhatsApp</h2>
                <p className="text-sm text-gray-500">Connect your WhatsApp Business account</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <MessageSquare className="text-green-600" size={40} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Scan QR Code to Connect</h3>
                <p className="text-gray-500 max-w-md mb-8">
                    Open WhatsApp on your phone, go to Settings {'>'} Linked Devices, and scan the code below to connect your business account.
                </p>

                <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-6">
                    <QrCode size={64} className="text-gray-400" />
                    {/* Placeholder for actual QR Code */}
                </div>

                <div className="flex gap-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium">
                        View Guide
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
                        Refresh Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppSettings;
