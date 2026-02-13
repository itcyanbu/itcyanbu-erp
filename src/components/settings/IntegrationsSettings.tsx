import React from 'react';
import { Layers, Check } from 'lucide-react';

const IntegrationsSettings = () => {
    const integrations = [
        { name: 'Google', connected: true, icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
        { name: 'Facebook & Instagram', connected: false, icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' },
        { name: 'Stripe', connected: true, icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968382.png' },
        { name: 'Shopify', connected: false, icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968385.png' },
        { name: 'Slack', connected: false, icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png' },
        { name: 'QuickBooks', connected: false, icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968273.png' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Integrations</h2>
                <p className="text-sm text-gray-500">Connect your account with other services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((app, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
                        <img src={app.icon} alt={app.name} className="w-12 h-12 mb-4 object-contain" />
                        <h3 className="font-medium text-gray-900 mb-2">{app.name}</h3>

                        {app.connected ? (
                            <div className="mt-auto pt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
                                <Check size={16} />
                                Connected
                            </div>
                        ) : (
                            <button className="mt-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium w-full">
                                Connect
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntegrationsSettings;
