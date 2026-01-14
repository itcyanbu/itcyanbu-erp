import { useState } from 'react';
import { Calendar, Clock, Plus, Settings } from 'lucide-react';
import CalendarSettings from '../components/calendar/CalendarSettings';

const CalendarsPage = () => {
    const [viewMode, setViewMode] = useState<'calendar' | 'settings'>('calendar');

    const upcomingEvents = [
        { title: 'Client Meeting', time: '10:00 AM', duration: '1 hour', attendees: 3 },
        { title: 'Team Standup', time: '2:00 PM', duration: '30 min', attendees: 8 },
        { title: 'Product Demo', time: '4:00 PM', duration: '45 min', attendees: 5 },
    ];

    if (viewMode === 'settings') {
        return <CalendarSettings onBack={() => setViewMode('calendar')} />;
    }

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="text-ghl-blue" size={28} />
                            <h1 className="text-2xl font-semibold text-gray-900">Calendars</h1>
                        </div>
                        <p className="text-gray-500">Manage your schedule and appointments</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setViewMode('settings')}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <Settings size={18} />
                            Calendar Settings
                        </button>
                        <button className="bg-ghl-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus size={18} />
                            New Event
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar View */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">January 2026</h2>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
                            </div>
                        </div>
                        <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="text-center">
                                <Calendar className="mx-auto text-gray-400 mb-2" size={48} />
                                <p className="text-gray-500">Calendar grid would appear here</p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
                        <div className="space-y-4">
                            {upcomingEvents.map((event, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                        <Clock size={14} />
                                        <span>{event.time} • {event.duration}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{event.attendees} attendees</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarsPage;
