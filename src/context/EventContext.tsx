import React, { createContext, useContext, useState, useEffect } from 'react';
import { appointmentsService } from '../lib/supabaseService';
import { useAuth } from './AuthContext';

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

// Helper to map DB appointment to App appointment
const mapDbAppointmentToAppAppointment = (dbAppt: any): Appointment => {
    return {
        id: dbAppt.id,
        title: dbAppt.title,
        startTime: dbAppt.start_time,
        endTime: dbAppt.end_time,
        duration: Math.round((new Date(dbAppt.end_time).getTime() - new Date(dbAppt.start_time).getTime()) / 60000),
        contactId: dbAppt.contact_id || undefined,
        calendarId: dbAppt.calendar_id || '',
        status: dbAppt.status === 'scheduled' ? 'confirmed' : dbAppt.status as any,
        notes: dbAppt.description || undefined
    };
};

// Helper to map App appointment to DB appointment
const mapAppAppointmentToDbAppointment = (appAppt: any): any => {
    return {
        title: appAppt.title,
        description: appAppt.notes || null,
        start_time: appAppt.startTime,
        end_time: appAppt.endTime,
        status: appAppt.status === 'confirmed' ? 'scheduled' : appAppt.status,
        contact_id: appAppt.contactId || null,
        calendar_id: appAppt.calendarId || null,
        location: null
    };
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [synced, setSynced] = useState(false);
    const { user, isSupabaseEnabled } = useAuth();

    // Load appointments on mount
    useEffect(() => {
        loadAppointments();
    }, [user]);

    // Data migration: sync localStorage to Supabase on first authentication
    useEffect(() => {
        if (user && isSupabaseEnabled && !synced) {
            migrateLocalDataToSupabase();
        }
    }, [user, isSupabaseEnabled, synced]);

    const loadAppointments = async () => {
        if (user && isSupabaseEnabled) {
            // Load from Supabase
            const { data, error } = await appointmentsService.getAll();

            if (error) {
                console.error('Failed to load appointments from Supabase:', error);
                loadAppointmentsFromLocalStorage();
            } else if (data) {
                const appAppointments = data.map(mapDbAppointmentToAppAppointment);
                setAppointments(appAppointments);
                // Cache in localStorage
                localStorage.setItem('ghl_appointments', JSON.stringify(appAppointments));
            }
        } else {
            loadAppointmentsFromLocalStorage();
        }
    };

    const loadAppointmentsFromLocalStorage = () => {
        try {
            const storageKey = user ? `ghl_appointments_${user.id}` : 'ghl_appointments';
            const saved = localStorage.getItem(storageKey);
            setAppointments(saved ? JSON.parse(saved) : []);
        } catch (e) {
            console.error('Failed to parse appointments', e);
            setAppointments([]);
        }
    };

    const migrateLocalDataToSupabase = async () => {
        if (!user) return;

        const storageKey = `ghl_appointments_${user.id}`;
        const savedAppointments = localStorage.getItem(storageKey) || localStorage.getItem('ghl_appointments');

        if (!savedAppointments) {
            setSynced(true);
            return;
        }

        try {
            const localAppointments: Appointment[] = JSON.parse(savedAppointments);

            // Check if Supabase already has appointments
            const { data: existingAppointments } = await appointmentsService.getAll();

            if (existingAppointments && existingAppointments.length > 0) {
                console.log('Supabase already has appointments, skipping migration');
                setSynced(true);
                return;
            }

            // Migrate local appointments to Supabase
            console.log(`Migrating ${localAppointments.length} appointments to Supabase...`);
            const dbAppointments = localAppointments.map(mapAppAppointmentToDbAppointment);

            const { error } = await appointmentsService.bulkCreate(dbAppointments);

            if (error) {
                console.error('Failed to migrate appointments:', error);
            } else {
                console.log('✅ Successfully migrated appointments to Supabase');
                await loadAppointments();
            }
        } catch (err) {
            console.error('Error during appointment migration:', err);
        } finally {
            setSynced(true);
        }
    };

    const addAppointment = async (appointment: Omit<Appointment, 'id'>) => {
        const storageKey = user ? `ghl_appointments_${user.id}` : 'ghl_appointments';
        if (user && isSupabaseEnabled) {
            // Save to Supabase
            const dbAppointment = mapAppAppointmentToDbAppointment(appointment);
            const { data, error } = await appointmentsService.create(dbAppointment);

            if (error) {
                console.error('Failed to create appointment in Supabase:', error);
                // Fallback to local
                const localAppointment = { ...appointment, id: Math.random().toString(36).substr(2, 9) };
                setAppointments(prev => {
                    const updated = [...prev, localAppointment];
                    localStorage.setItem(storageKey, JSON.stringify(updated));
                    return updated;
                });
            } else if (data) {
                const appAppointment = mapDbAppointmentToAppAppointment(data);
                setAppointments(prev => {
                    const updated = [...prev, appAppointment];
                    localStorage.setItem(storageKey, JSON.stringify(updated));
                    return updated;
                });
            }
        } else {
            // Local-only mode
            const localAppointment = { ...appointment, id: Math.random().toString(36).substr(2, 9) };
            setAppointments(prev => {
                const updated = [...prev, localAppointment];
                localStorage.setItem(storageKey, JSON.stringify(updated));
                return updated;
            });
        }
    };

    const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
        const storageKey = user ? `ghl_appointments_${user.id}` : 'ghl_appointments';
        if (user && isSupabaseEnabled) {
            // Update in Supabase
            const dbUpdates = mapAppAppointmentToDbAppointment(updates);
            const { data, error } = await appointmentsService.update(id, dbUpdates);

            if (error) {
                console.error('Failed to update appointment in Supabase:', error);
                // Fallback to local update
                setAppointments(prev => {
                    const updated = prev.map(a => a.id === id ? { ...a, ...updates } : a);
                    localStorage.setItem(storageKey, JSON.stringify(updated));
                    return updated;
                });
            } else if (data) {
                const appAppointment = mapDbAppointmentToAppAppointment(data);
                setAppointments(prev => {
                    const updated = prev.map(a => a.id === id ? appAppointment : a);
                    localStorage.setItem(storageKey, JSON.stringify(updated));
                    return updated;
                });
            }
        } else {
            // Local-only mode
            setAppointments(prev => {
                const updated = prev.map(a => a.id === id ? { ...a, ...updates } : a);
                localStorage.setItem(storageKey, JSON.stringify(updated));
                return updated;
            });
        }
    };

    const deleteAppointment = async (id: string) => {
        const storageKey = user ? `ghl_appointments_${user.id}` : 'ghl_appointments';
        if (user && isSupabaseEnabled) {
            // Delete from Supabase
            const { error } = await appointmentsService.delete(id);

            if (error) {
                console.error('Failed to delete appointment from Supabase:', error);
            }
        }

        // Remove from local state
        setAppointments(prev => {
            const updated = prev.filter(a => a.id !== id);
            localStorage.setItem(storageKey, JSON.stringify(updated));
            return updated;
        });
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
