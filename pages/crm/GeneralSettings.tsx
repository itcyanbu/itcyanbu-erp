import React, { useState } from 'react';
import {
    Settings, Globe, Bell, Shield,
    Mail, Monitor, Database, Phone,
    Save, RotateCcw
} from 'lucide-react';

const GeneralSettings = () => {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = [
        { name: 'General', icon: Globe },
        { name: 'Company', icon: Shield },
        { name: 'Notification', icon: Bell },
        { name: 'Email Setup', icon: Mail },
        { name: 'Appearance', icon: Monitor },
        { name: 'Security', icon: Database },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">General Settings</h1>
                    <nav className="text-sm text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">CRM</span>
                        <span className="mx-2">/</span>
                        <span>Settings</span>
                    </nav>
                </div>
                <div className="flex gap-3">
                    <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-200 transition-colors font-semibold">
                        <RotateCcw size={18} />
                        Reset
                    </button>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors font-bold shadow-lg shadow-green-100">
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all border-l-4 ${activeTab === tab.name
                                        ? 'bg-blue-50 text-blue-600 border-blue-600'
                                        : 'text-slate-500 border-transparent hover:bg-slate-50'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            {tabs.find(t => t.name === activeTab)?.icon && React.createElement(tabs.find(t => t.name === activeTab)!.icon, { size: 24, className: 'text-blue-600' })}
                            {activeTab} Settings
                        </h2>

                        <div className="space-y-6 max-w-2xl">
                            {activeTab === 'General' && (
                                <>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">CRM Name</label>
                                            <input type="text" defaultValue="ITC Cyanbu CRM" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Default Language</label>
                                            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option>English</option>
                                                <option>Hindi</option>
                                                <option>Arabic</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Time Zone</label>
                                            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option>(GMT +05:30) Mumbai, Kolkata</option>
                                                <option>(GMT +00:00) London</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Currency Symbol</label>
                                            <input type="text" defaultValue="₹" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">System Email</label>
                                        <input type="email" defaultValue="support@itcyanbu.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                </>
                            )}

                            {activeTab !== 'General' && (
                                <div className="py-20 text-center text-slate-400">
                                    <h3 className="text-lg font-bold mb-2">Coming Soon</h3>
                                    <p>The {activeTab} settings are being developed to give you full control over your CRM.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <Shield size={20} />
                        </div>
                        <div className="text-sm">
                            <p className="font-bold text-blue-800">Need help with configuration?</p>
                            <p className="text-blue-600">Contact our technical support for advanced system settings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings;
