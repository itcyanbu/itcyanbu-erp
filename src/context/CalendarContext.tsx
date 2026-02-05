import React, { createContext, useContext, useState, useEffect } from 'react';
import { calendarsService } from '../lib/supabaseService';
import { useAuth } from './AuthContext';

export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    price?: number;
    image?: string;
}

export interface ServiceGroup {
    id: string;
    name: string;
    description?: string;
}

export interface Calendar {
    id: string;
    name: string;
    description: string;
    type: 'simple' | 'round-robin' | 'class' | 'service';
    staffIds: string[];
    groupId?: string; // For service calendars
    locationType?: 'phone' | 'address' | 'custom' | 'zoom' | 'google-meet';
    locationValue?: string;
    duration: number;
    color?: string;
    availability?: {
        weekly: any;
        specific: any;
    };
}

interface CalendarContextType {
    calendars: Calendar[];
    groups: ServiceGroup[];
    addCalendar: (calendar: Omit<Calendar, 'id'>) => void;
    updateCalendar: (id: string, calendar: Partial<Calendar>) => void;
    deleteCalendar: (id: string) => void;
    addGroup: (group: Omit<ServiceGroup, 'id'>) => void;
    updateGroup: (id: string, group: Partial<ServiceGroup>) => void;
    deleteGroup: (id: string) => void;
    serviceMenuEnabled: boolean;
    setServiceMenuEnabled: (enabled: boolean) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Helper to map DB calendar to App calendar
const mapDbCalendarToAppCalendar = (dbCalendar: any): Calendar => {
    const settings = dbCalendar.settings || {};
    return {
        id: dbCalendar.id,
        name: dbCalendar.name,
        description: dbCalendar.description || '',
        type: settings.type || 'simple',
        staffIds: settings.staffIds || [],
        groupId: settings.groupId,
        locationType: settings.locationType,
        locationValue: settings.locationValue,
        duration: settings.duration || 30,
        color: dbCalendar.color || '#3b82f6',
        availability: settings.availability
    };
};

// Helper to map App calendar to DB calendar
const mapAppCalendarToDbCalendar = (appCalendar: any): any => {
    return {
        name: appCalendar.name,
        description: appCalendar.description || null,
        color: appCalendar.color || '#3b82f6',
        is_active: true,
        settings: {
            type: appCalendar.type,
            staffIds: appCalendar.staffIds,
            groupId: appCalendar.groupId,
            locationType: appCalendar.locationType,
            locationValue: appCalendar.locationValue,
            duration: appCalendar.duration,
            availability: appCalendar.availability
        }
    };
};

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [calendars, setCalendars] = useState<Calendar[]>([]);
    const [groups, setGroups] = useState<ServiceGroup[]>([]);
    const [serviceMenuEnabled, setServiceMenuEnabledState] = useState(false);
    const [synced, setSynced] = useState(false);
    const { user, isSupabaseEnabled } = useAuth();

    // Load calendars on mount
    useEffect(() => {
        loadCalendars();
        loadGroups();
        loadServiceMenuState();
    }, [user]);

    // Data migration: sync localStorage to Supabase on first authentication
    useEffect(() => {
        if (user && isSupabaseEnabled && !synced) {
            migrateLocalDataToSupabase();
        }
    }, [user, isSupabaseEnabled, synced]);

    const loadCalendars = async () => {
        if (user && isSupabaseEnabled) {
            // Load from Supabase
            const { data, error } = await calendarsService.getAll();

            if (error) {
                console.error('Failed to load calendars from Supabase:', error);
                loadCalendarsFromLocalStorage();
            } else if (data) {
                const appCalendars = data.map(mapDbCalendarToAppCalendar);
                setCalendars(appCalendars);
                // Cache in localStorage
                localStorage.setItem('ghl_calendars', JSON.stringify(appCalendars));
            }
        } else {
            loadCalendarsFromLocalStorage();
        }
    };

    const loadCalendarsFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem('ghl_calendars');
            setCalendars(saved ? JSON.parse(saved) : []);
        } catch (e) {
            console.error('Failed to parse calendars', e);
            setCalendars([]);
        }
    };

    const loadGroups = () => {
        try {
            const saved = localStorage.getItem('ghl_calendar_groups');
            setGroups(saved ? JSON.parse(saved) : []);
        } catch (e) {
            console.error('Failed to parse groups', e);
            setGroups([]);
        }
    };

    const loadServiceMenuState = () => {
        try {
            const saved = localStorage.getItem('ghl_calendar_service_menu');
            setServiceMenuEnabledState(saved ? JSON.parse(saved) : false);
        } catch (e) {
            console.error('Failed to parse service menu status', e);
            setServiceMenuEnabledState(false);
        }
    };

    const migrateLocalDataToSupabase = async () => {
        const savedCalendars = localStorage.getItem('ghl_calendars');
        if (!savedCalendars) {
            setSynced(true);
            return;
        }

        try {
            const localCalendars: Calendar[] = JSON.parse(savedCalendars);

            // Check if Supabase already has calendars
            const { data: existingCalendars } = await calendarsService.getAll();

            if (existingCalendars && existingCalendars.length > 0) {
                console.log('Supabase already has calendars, skipping migration');
                setSynced(true);
                return;
            }

            // Migrate local calendars to Supabase
            console.log(`Migrating ${localCalendars.length} calendars to Supabase...`);
            const dbCalendars = localCalendars.map(mapAppCalendarToDbCalendar);

            const { data, error } = await calendarsService.bulkCreate(dbCalendars);

            if (error) {
                console.error('Failed to migrate calendars:', error);
            } else {
                console.log('✅ Successfully migrated calendars to Supabase');
                await loadCalendars();
            }
        } catch (err) {
            console.error('Error during calendar migration:', err);
        } finally {
            setSynced(true);
        }
    };

    const setServiceMenuEnabled = (enabled: boolean) => {
        setServiceMenuEnabledState(enabled);
        localStorage.setItem('ghl_calendar_service_menu', JSON.stringify(enabled));
    };

    const addCalendar = async (calendar: Omit<Calendar, 'id'>) => {
        if (user && isSupabaseEnabled) {
            // Save to Supabase
            const dbCalendar = mapAppCalendarToDbCalendar(calendar);
            const { data, error } = await calendarsService.create(dbCalendar);

            if (error) {
                console.error('Failed to create calendar in Supabase:', error);
                // Fallback to local
                const localCalendar = { ...calendar, id: Math.random().toString(36).substr(2, 9) };
                setCalendars(prev => {
                    const updated = [...prev, localCalendar];
                    localStorage.setItem('ghl_calendars', JSON.stringify(updated));
                    return updated;
                });
            } else if (data) {
                const appCalendar = mapDbCalendarToAppCalendar(data);
                setCalendars(prev => {
                    const updated = [...prev, appCalendar];
                    localStorage.setItem('ghl_calendars', JSON.stringify(updated));
                    return updated;
                });
            }
        } else {
            // Local-only mode
            const localCalendar = { ...calendar, id: Math.random().toString(36).substr(2, 9) };
            setCalendars(prev => {
                const updated = [...prev, localCalendar];
                localStorage.setItem('ghl_calendars', JSON.stringify(updated));
                return updated;
            });
        }
    };

    const updateCalendar = async (id: string, updates: Partial<Calendar>) => {
        if (user && isSupabaseEnabled) {
            // Update in Supabase
            const dbUpdates = mapAppCalendarToDbCalendar(updates);
            const { data, error } = await calendarsService.update(id, dbUpdates);

            if (error) {
                console.error('Failed to update calendar in Supabase:', error);
                // Fallback to local update
                setCalendars(prev => {
                    const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c);
                    localStorage.setItem('ghl_calendars', JSON.stringify(updated));
                    return updated;
                });
            } else if (data) {
                const appCalendar = mapDbCalendarToAppCalendar(data);
                setCalendars(prev => {
                    const updated = prev.map(c => c.id === id ? appCalendar : c);
                    localStorage.setItem('ghl_calendars', JSON.stringify(updated));
                    return updated;
                });
            }
        } else {
            // Local-only mode
            setCalendars(prev => {
                const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c);
                localStorage.setItem('ghl_calendars', JSON.stringify(updated));
                return updated;
            });
        }
    };

    const deleteCalendar = async (id: string) => {
        if (user && isSupabaseEnabled) {
            // Delete from Supabase
            const { error } = await calendarsService.delete(id);

            if (error) {
                console.error('Failed to delete calendar from Supabase:', error);
            }
        }

        // Remove from local state
        setCalendars(prev => {
            const updated = prev.filter(c => c.id !== id);
            localStorage.setItem('ghl_calendars', JSON.stringify(updated));
            return updated;
        });
    };

    const addGroup = (group: Omit<ServiceGroup, 'id'>) => {
        const newGroup = { ...group, id: Math.random().toString(36).substr(2, 9) };
        setGroups(prev => {
            const updated = [...prev, newGroup];
            localStorage.setItem('ghl_calendar_groups', JSON.stringify(updated));
            return updated;
        });
    };

    const updateGroup = (id: string, updates: Partial<ServiceGroup>) => {
        setGroups(prev => {
            const updated = prev.map(g => g.id === id ? { ...g, ...updates } : g);
            localStorage.setItem('ghl_calendar_groups', JSON.stringify(updated));
            return updated;
        });
    };

    const deleteGroup = (id: string) => {
        setGroups(prev => {
            const updated = prev.filter(g => g.id !== id);
            localStorage.setItem('ghl_calendar_groups', JSON.stringify(updated));
            return updated;
        });
        // Remove groupId from any calendars in this group
        setCalendars(prev => {
            const updated = prev.map(c => c.groupId === id ? { ...c, groupId: undefined } : c);
            localStorage.setItem('ghl_calendars', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <CalendarContext.Provider value={{
            calendars,
            groups,
            addCalendar,
            updateCalendar,
            deleteCalendar,
            addGroup,
            updateGroup,
            deleteGroup,
            serviceMenuEnabled,
            setServiceMenuEnabled
        }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendars = () => {
    const context = useContext(CalendarContext);
    if (!context) throw new Error('useCalendars must be used within CalendarProvider');
    return context;
};
