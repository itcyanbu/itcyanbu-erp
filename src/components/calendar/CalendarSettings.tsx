import React, { useState, useEffect } from 'react';
import { Settings, ChevronLeft, Calendar as CalendarIcon, Check, Users, Video } from 'lucide-react';

const CalendarSettings = ({ onBack }: { onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState('Preferences');
    const [subTab, setSubTab] = useState('Account Preference');
    const [serviceMenuEnabled, setServiceMenuEnabled] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('ghl_calendar_service_menu');
        if (saved) {
            setServiceMenuEnabled(JSON.parse(saved));
        }
    }, []);

    const toggleServiceMenu = (enabled: boolean) => {
        setServiceMenuEnabled(enabled);
        localStorage.setItem('ghl_calendar_service_menu', JSON.stringify(enabled));
    };

    const tabs = ['Calendars', 'Preferences', 'Availability', 'Connections'];

    const renderCalendarsTab = () => (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Calendars</h2>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-ghl-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Create Calendar
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
                No calendars found. Create one to get started.
            </div>

            {/* Create Calendar Modal (Mock) */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Select Calendar Type</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-ghl-blue hover:bg-blue-50 cursor-pointer transition-all">
                                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-ghl-blue mb-3">
                                    <CalendarIcon size={20} />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Simple Calendar</h4>
                                <p className="text-sm text-gray-500">Basic physical calendar for straight-forward scheduling.</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-ghl-blue hover:bg-blue-50 cursor-pointer transition-all">
                                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 mb-3">
                                    <Users size={20} />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Round Robin</h4>
                                <p className="text-sm text-gray-500">Distribute appointments among team members.</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-ghl-blue hover:bg-blue-50 cursor-pointer transition-all">
                                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center text-purple-600 mb-3">
                                    <Video size={20} />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Class Booking</h4>
                                <p className="text-sm text-gray-500">Events with multiple attendees like webinars or classes.</p>
                            </div>

                            {/* Service Calendar - Conditional */}
                            {serviceMenuEnabled && (
                                <div className="border border-ghl-blue bg-blue-50 ring-1 ring-blue-500 rounded-lg p-4 cursor-pointer transition-all relative">
                                    <div className="absolute top-3 right-3 text-ghl-blue">
                                        <Check size={16} />
                                    </div>
                                    <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 mb-3">
                                        <Settings size={20} />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Service Calendar</h4>
                                    <p className="text-sm text-gray-500">Select services from a menu. Ideal for salons and service businesses.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderPreferencesTab = () => (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 bg-gray-50 pt-6">
                <button
                    className={`w-full text-left px-6 py-2 text-sm font-medium ${subTab === 'My Preference' ? 'text-ghl-blue bg-blue-50 border-r-2 border-ghl-blue' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSubTab('My Preference')}
                >
                    My Preference
                </button>
                <button
                    className={`w-full text-left px-6 py-2 text-sm font-medium ${subTab === 'Account Preference' ? 'text-ghl-blue bg-blue-50 border-r-2 border-ghl-blue' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSubTab('Account Preference')}
                >
                    Account Preference
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {subTab === 'Account Preference' && (
                    <div className="max-w-3xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">In App preferences</h3>

                        <div className="space-y-8">
                            {/* View Options */}
                            <div className="border-b border-gray-200 pb-6">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">View Options</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Week Starts On</label>
                                        <select className="w-full border-gray-300 rounded-md text-sm focus:ring-ghl-blue focus:border-ghl-blue">
                                            <option>Sunday</option>
                                            <option>Monday</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="border-b border-gray-200 pb-6">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Services</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Service Menu</div>
                                            <div className="text-sm text-gray-500">Enable service menu for calendars</div>
                                        </div>
                                        <button
                                            onClick={() => toggleServiceMenu(!serviceMenuEnabled)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ghl-blue focus:ring-offset-2 ${serviceMenuEnabled ? 'bg-ghl-blue' : 'bg-gray-200'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${serviceMenuEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between opacity-50 pointer-events-none">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Rooms</div>
                                            <div className="text-sm text-gray-500">Manage rooms for appointments</div>
                                        </div>
                                        <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent">
                                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between opacity-50 pointer-events-none">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Equipments</div>
                                            <div className="text-sm text-gray-500">Manage equipment for appointments</div>
                                        </div>
                                        <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent">
                                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Widget Preferences placeholder */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Widget preferences</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Language</label>
                                        <select className="w-full border-gray-300 rounded-md text-sm focus:ring-ghl-blue focus:border-ghl-blue">
                                            <option>English</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Time Format</label>
                                        <select className="w-full border-gray-300 rounded-md text-sm focus:ring-ghl-blue focus:border-ghl-blue">
                                            <option>12h (am/pm)</option>
                                            <option>24h</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {subTab === 'My Preference' && (
                    <div className="text-gray-500 italic">User preferences coming soon...</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Settings Header */}
            <div className="px-8 py-4 border-b border-gray-200 flex items-center gap-4">
                <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Calendar Settings</h1>
            </div>

            {/* Tabs */}
            <div className="px-8 border-b border-gray-200 flex gap-6">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-ghl-blue text-ghl-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden bg-gray-50">
                {activeTab === 'Calendars' && renderCalendarsTab()}
                {activeTab === 'Preferences' && renderPreferencesTab()}
                {activeTab === 'Availability' && <div className="p-8 text-gray-500">Availability settings coming soon...</div>}
                {activeTab === 'Connections' && <div className="p-8 text-gray-500">Calendar connections coming soon...</div>}
            </div>
        </div>
    );
};

export default CalendarSettings;
