import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Appointment {
    id: string;
    title: string;
    startTime: string; // ISO string
    endTime: string;   // ISO string
    duration: number; // in minutes
    contactId?: string;
    calendarId: string;
    status: 'confirmed' | 'cancelled' | 'showed' | 'no-showed';
    notes?: string;
}

interface EventContextType {
    appointments: Appointment[];
    addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
    updateAppointment: (id: string, updates: Partial<Appointment>) => void;
    deleteAppointment: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>(() => {
        try {
            const saved = localStorage.getItem('ghl_appointments');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to parse appointments', e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('ghl_appointments', JSON.stringify(appointments));
    }, [appointments]);

    const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        setAppointments(prev => [...prev, { ...appointment, id }]);
    };

    const updateAppointment = (id: string, updates: Partial<Appointment>) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const deleteAppointment = (id: string) => {
        setAppointments(prev => prev.filter(a => a.id !== id));
    };

    return (
        <EventContext.Provider value={{ appointments, addAppointment, updateAppointment, deleteAppointment }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) throw new Error('useEvents must be used within EventProvider');
    return context;
};
