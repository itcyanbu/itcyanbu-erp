import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Settings, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CalendarSettings from '../components/calendar/CalendarSettings';
import ServiceMenu from '../components/calendar/ServiceMenu';
import EventModal from '../components/calendar/EventModal';
import { useCalendars } from '../context/CalendarContext';
import { useEvents } from '../context/EventContext';
import clsx from 'clsx';

const CalendarsPage = () => {
    const { t, i18n } = useTranslation();
    const { serviceMenuEnabled } = useCalendars();
    const { appointments } = useEvents();

    const [viewMode, setViewMode] = useState<'calendar' | 'settings' | 'menu'>('calendar');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    // Filter appointments for the current view (today for the sidebar, grid for the main view)
    const todayStr = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(app => app.startTime.startsWith(todayStr));

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const numDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const prevMonthDays = daysInMonth(year, month - 1);

        const days = [];
        // Previous month days
        for (let i = startDay - 1; i >= 0; i--) {
            days.push({ day: prevMonthDays - i, currentMonth: false });
        }
        // Current month days
        for (let i = 1; i <= numDays; i++) {
            days.push({ day: i, currentMonth: true });
        }
        // Next month days
        const totalCells = 42;
        const nextMonthDays = totalCells - days.length;
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({ day: i, currentMonth: false });
        }

        const weekDays = i18n.language === 'ar'
            ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div className="flex-1 flex flex-col min-h-0">
                <div className="grid grid-cols-7 border-b border-gray-200">
                    {weekDays.map(day => (
                        <div key={day} className="py-2 text-center text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr min-h-0 divide-x divide-y divide-gray-100 overflow-y-auto">
                    {days.map((dateObj, idx) => {
                        const cellDate = new Date(year, dateObj.currentMonth ? month : (idx < 7 ? month - 1 : month + 1), dateObj.day);
                        const cellDateStr = cellDate.toISOString().split('T')[0];
                        const cellAppointments = appointments.filter(app => app.startTime.startsWith(cellDateStr));

                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "min-h-[120px] p-2 transition-colors",
                                    dateObj.currentMonth ? "bg-white" : "bg-gray-50/50",
                                    cellDateStr === todayStr && "bg-blue-50/30"
                                )}
                            >
                                <div className={clsx(
                                    "text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                                    dateObj.currentMonth ? "text-gray-900" : "text-gray-400",
                                    cellDateStr === todayStr && "bg-blue-600 text-white font-bold shadow-sm"
                                )}>
                                    {dateObj.day}
                                </div>
                                <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                                    {cellAppointments.map(app => (
                                        <div
                                            key={app.id}
                                            className="px-2 py-1 text-[10px] font-bold bg-blue-100 text-blue-700 rounded border border-blue-200 truncate cursor-pointer hover:bg-blue-200 transition-colors shadow-sm"
                                            title={app.title}
                                        >
                                            {new Date(app.startTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })} {app.title}
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

    if (viewMode === 'settings') {
        return <CalendarSettings onBack={() => setViewMode('calendar')} />;
    }

    if (viewMode === 'menu') {
        return (
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
                <div className="px-8 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => setViewMode('calendar')}
                        className="text-gray-500 hover:text-gray-700 font-bold text-sm flex items-center gap-2 transition-colors"
                    >
                        <ChevronLeft size={18} className="rtl:rotate-180" />
                        {t('common.back')}
                    </button>
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t('calendars.service_menu')}</h2>
                    <div className="w-20" /> {/* Spacer */}
                </div>
                <div className="flex-1 overflow-y-auto">
                    <ServiceMenu />
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 font-sans">
            {/* Header */}
            <div className="px-8 py-6 bg-white border-b border-gray-200 shadow-sm relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-blue-50 rounded-xl">
                                <CalendarIcon className="text-blue-600" size={24} />
                            </div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t('calendars.title')}</h1>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">{t('calendars.subtitle')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-100 p-1 rounded-xl mr-2">
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={clsx(
                                    "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                    viewMode === 'calendar' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {t('calendars.month_view')}
                            </button>
                        </div>
                        {serviceMenuEnabled && (
                            <button
                                onClick={() => setViewMode('menu')}
                                className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-sm font-bold shadow-sm"
                            >
                                <LayoutGrid size={18} className="text-gray-400" />
                                {t('calendars.service_menu')}
                            </button>
                        )}
                        <button
                            onClick={() => setViewMode('settings')}
                            className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-sm font-bold shadow-sm"
                        >
                            <Settings size={18} className="text-gray-400" />
                            {t('calendars.settings')}
                        </button>
                        <button
                            onClick={() => setIsEventModalOpen(true)}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 text-sm font-bold active:scale-95"
                        >
                            <Plus size={18} />
                            {t('calendars.new_event')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
                {/* Main Calendar View */}
                <div className="flex-1 flex flex-col min-h-0 bg-white shadow-inner">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-extrabold text-gray-900 min-w-[150px]">
                                {currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}
                            </h2>
                            <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-0.5">
                                <button
                                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                                >
                                    <ChevronLeft size={20} className="rtl:rotate-180" />
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date())}
                                    className="px-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border-x border-gray-100"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                                >
                                    <ChevronRight size={20} className="rtl:rotate-180" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {renderGrid()}
                </div>

                {/* Sidebar: Upcoming Events */}
                <div className="w-full md:w-80 bg-gray-50/50 border-l border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-200 bg-white">
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                            {t('calendars.upcoming')}
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-extrabold">{todayAppointments.length}</span>
                        </h2>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                            {todayAppointments.length === 0 ? (
                                <div className="p-6 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <Clock className="mx-auto text-gray-300 mb-2" size={32} />
                                    <p className="text-xs font-bold text-gray-400">{t('calendars.no_events')}</p>
                                </div>
                            ) : (
                                todayAppointments.map((event) => (
                                    <div key={event.id} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{event.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-1">
                                            <Clock size={12} className="text-gray-400" />
                                            <span>
                                                {new Date(event.startTime).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })} • {event.duration} min
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                                            <CalendarIcon size={12} />
                                            <span>{t('calendars.confirmed')}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
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
