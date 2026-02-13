import React from 'react';
import { Beaker } from 'lucide-react';

const LabsSettings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Labs</h2>
                <p className="text-sm text-gray-500">Try out beta features before they are released to everyone</p>
            </div>

            <div className="space-y-4">
                {[
                    { title: 'New Calendar UI', desc: 'Experience the redesigned calendar interface with improved drag-and-drop.' },
                    { title: 'Conversation AI', desc: 'Enable AI-assisted responses in the conversations tab.' },
                    { title: 'Enhanced Workflows', desc: 'Access new workflow triggers and actions currently in beta.' },
                ].map((feature, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="p-2 bg-purple-50 rounded-lg h-fit">
                                <Beaker className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                                <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                    Beta
                                </span>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghl-blue"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LabsSettings;
