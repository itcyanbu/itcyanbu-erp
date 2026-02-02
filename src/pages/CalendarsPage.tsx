import { useState } from 'react';
import { Plus, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CalendarSettings from '../components/calendar/CalendarSettings';
import ServiceMenu from '../components/calendar/ServiceMenu';
import EventModal from '../components/calendar/EventModal';
import { useCalendars } from '../context/CalendarContext';
import { useEvents } from '../context/EventContext';
import clsx from 'clsx';

const CalendarsPage = () => {
    const { t, i18n } = useTranslation();
    const { serviceMenuEnabled, calendars } = useCalendars();
    const { appointments } = useEvents();

    const [activeTab, setActiveTab] = useState<'calendar' | 'appointments' | 'settings' | 'menu'>('calendar');
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    // Filters
    const [selectedCalendars, setSelectedCalendars] = useState<string[]>(calendars.map(c => c.id));
    const [searchQuery, setSearchQuery] = useState('');

    const todayStr = new Date().toISOString().split('T')[0];

    const toggleCalendarFilter = (id: string) => {
        setSelectedCalendars(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderMonthGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const numDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const prevMonthDays = daysInMonth(year, month - 1);

        const days = [];
        for (let i = startDay - 1; i >= 0; i--) {
            days.push({ day: prevMonthDays - i, currentMonth: false });
        }
        for (let i = 1; i <= numDays; i++) {
            days.push({ day: i, currentMonth: true });
        }
        const totalCells = 42;
        const nextMonthDays = totalCells - days.length;
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({ day: i, currentMonth: false });
        }

        const weekDays = i18n.language === 'ar'
            ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div className="flex-1 flex flex-col min-h-0 bg-white">
                <div className="grid grid-cols-7 border-b border-gray-200">
                    {weekDays.map(day => (
                        <div key={day} className="py-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr divide-x divide-y divide-gray-100 overflow-y-auto custom-scrollbar">
                    {days.map((dateObj, idx) => {
                        const cellDate = new Date(year, dateObj.currentMonth ? month : (idx < 7 ? month - 1 : month + 1), dateObj.day);
                        const cellDateStr = cellDate.toISOString().split('T')[0];
                        const cellAppointments = appointments.filter(app =>
                            app.startTime.startsWith(cellDateStr) &&
                            selectedCalendars.includes(app.calendarId)
                        );

                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "min-h-[100px] p-2 transition-colors",
                                    dateObj.currentMonth ? "bg-white" : "bg-gray-50/30",
                                    cellDateStr === todayStr && "bg-blue-50/20"
                                )}
                            >
                                <div className={clsx(
                                    "text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-lg transition-colors",
                                    dateObj.currentMonth ? "text-gray-900" : "text-gray-400",
                                    cellDateStr === todayStr && "bg-blue-600 text-white shadow-sm"
                                )}>
                                    {dateObj.day}
                                </div>
                                <div className="space-y-1 overflow-y-auto max-h-[70px] custom-scrollbar">
                                    {cellAppointments.map(app => (
                                        <div
                                            key={app.id}
                                            className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded border border-blue-200 truncate cursor-pointer hover:bg-blue-200 transition-colors"
                                            title={app.title}
                                        >
                                            {app.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderAppointmentsList = () => {
        const filteredApps = appointments.filter(app =>
            (app.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
            selectedCalendars.includes(app.calendarId)
        );

        return (
            <div className="flex-1 flex flex-col min-h-0 bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">{t('calendars.upcoming')}</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        />
                        <LayoutGrid className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto border border-gray-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left rtl:text-right">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{t('calendars.event_title')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{t('calendars.start_time')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{t('calendars.duration')}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{t('calendars.confirmed')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredApps.map(app => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{app.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(app.startTime).toLocaleString(i18n.language, { dateStyle: 'medium', timeStyle: 'short' })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{app.duration} min</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                                            {t('calendars.confirmed')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        if (activeTab === 'settings') {
            return <CalendarSettings onBack={() => setActiveTab('calendar')} />;
        }
        if (activeTab === 'menu') {
            return <ServiceMenu />;
        }
        if (activeTab === 'appointments') {
            return renderAppointmentsList();
        }
        return (
            <>
                {/* Toolbar */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm relative z-20">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-gray-900">
                            {currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-200">
                            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-500"><ChevronLeft size={16} /></button>
                            <button onClick={() => setCurrentDate(new Date())} className="px-3 text-[10px] font-bold text-blue-600 uppercase">Today</button>
                            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-500"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200">
                        <button
                            onClick={() => setViewMode('month')}
                            className={clsx(
                                "px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                                viewMode === 'month' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                            )}
                        >
                            {t('calendars.month_view')}
                        </button>
                        <button
                            disabled
                            className="px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all text-gray-500 opacity-50 cursor-not-allowed"
                        >
                            {t('calendars.week_view')}
                        </button>
                        <button
                            disabled
                            className="px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all text-gray-500 opacity-50 cursor-not-allowed"
                        >
                            {t('calendars.day_view')}
                        </button>
                    </div>
                </div>
                {renderMonthGrid()}
            </>
        );
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 font-sans">
            {/* Top Navigation Strip */}
            <div className="bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm relative z-30">
                <div className="flex items-center gap-8 h-14">
                    <button
                        onClick={() => setActiveTab('calendar')}
                        className={clsx(
                            "h-full px-2 text-sm font-bold border-b-2 transition-all",
                            activeTab === 'calendar' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {t('sidebar.calendars')}
                    </button>
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={clsx(
                            "h-full px-2 text-sm font-bold border-b-2 transition-all",
                            activeTab === 'appointments' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {t('calendars.appointments_tab')}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={clsx(
                            "h-full px-2 text-sm font-bold border-b-2 transition-all",
                            activeTab === 'settings' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {t('calendars.settings')}
                    </button>
                    {serviceMenuEnabled && (
                        <button
                            onClick={() => setActiveTab('menu')}
                            className={clsx(
                                "h-full px-2 text-sm font-bold border-b-2 transition-all",
                                activeTab === 'menu' ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {t('calendars.service_menu')}
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setIsEventModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                    <Plus size={14} />
                    {t('calendars.new_event')}
                </button>
            </div>

            <div className="flex-1 flex min-h-0">
                {/* Left Sidebar - Only visible on calendar/appointments tab maybe? */}
                {(activeTab === 'calendar' || activeTab === 'appointments') && (
                    <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
                        {/* Mini Calendar/Date Picker placeholder */}
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Select Date</h3>
                            <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
                                <h4 className="text-xs font-bold text-gray-900 mb-2">
                                    {currentDate.toLocaleString(i18n.language, { month: 'short', year: 'numeric' })}
                                </h4>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-400"><ChevronLeft size={16} /></button>
                                    <button onClick={() => setCurrentDate(new Date())} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">Today</button>
                                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-400"><ChevronRight size={16} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t('calendars.filter_by_calendar')}</h3>
                            <div className="space-y-3">
                                {calendars.map(cal => (
                                    <label key={cal.id} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCalendars.includes(cal.id)}
                                            onChange={() => toggleCalendarFilter(cal.id)}
                                            className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.4)]" />
                                            <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{cal.name}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t('calendars.filter_by_user')}</h3>
                            <label className="flex items-center gap-3 cursor-no-drop opacity-50">
                                <input type="checkbox" checked={true} readOnly className="w-4 h-4 rounded text-gray-300 border-gray-100" />
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">All Staff</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-0 bg-white">
                    {renderContent()}
                </div>
            </div>

            <EventModal
                isOpen={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
                initialDate={currentDate}
            />
        </div>
    );
};

export default CalendarsPage;
