import React, { useState } from 'react';
import { X, Clock, Calendar as CalendarIcon, AlignLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCalendars } from '../../context/CalendarContext';
import { useEvents } from '../../context/EventContext';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialDate?: Date;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, initialDate }) => {
    const { t } = useTranslation();
    const { calendars } = useCalendars();
    const { addAppointment } = useEvents();

    const [formData, setFormData] = useState({
        title: '',
        calendarId: calendars[0]?.id || '',
        date: (initialDate || new Date()).toISOString().split('T')[0],
        time: '10:00',
        duration: 60,
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const start = new Date(`${formData.date}T${formData.time}`);
        const end = new Date(start.getTime() + formData.duration * 60000);

        addAppointment({
            title: formData.title || 'Untitled Event',
            calendarId: formData.calendarId,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            duration: formData.duration,
            status: 'confirmed',
            notes: formData.notes
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">{t('calendars.new_event')}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{t('calendars.event_title')}</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                                placeholder="Meeting with client..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{t('calendars.start_time')}</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">&nbsp;</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{t('calendars.select_calendar')}</label>
                        <select
                            value={formData.calendarId}
                            onChange={(e) => setFormData({ ...formData, calendarId: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm appearance-none cursor-pointer"
                        >
                            {calendars.map(cal => (
                                <option key={cal.id} value={cal.id}>{cal.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {t('calendars.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                        >
                            {t('calendars.save_event')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
