import React from 'react';
import { Plus, Calendar, Settings } from 'lucide-react';

const CalendarsSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Calendars</h2>
                    <p className="text-sm text-gray-500">Manage your calendars, teams, and appointment settings</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    <Plus size={18} />
                    Create Calendar
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-ghl-blue" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No calendars found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Create a calendar to start accepting appointments. You can configure availability, teams, and sync with external calendars.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="text-ghl-blue font-medium hover:underline">
                        Calendar Settings
                    </button>
                    <button className="text-ghl-blue font-medium hover:underline">
                        Team Management
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarsSettings;
