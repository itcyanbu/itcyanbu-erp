import React, { createContext, useContext, useState, useEffect } from 'react';

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

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [calendars, setCalendars] = useState<Calendar[]>(() => {
        try {
            const saved = localStorage.getItem('ghl_calendars');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to parse calendars', e);
            return [];
        }
    });
    const [groups, setGroups] = useState<ServiceGroup[]>(() => {
        try {
            const saved = localStorage.getItem('ghl_calendar_groups');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to parse groups', e);
            return [];
        }
    });
    const [serviceMenuEnabled, setServiceMenuEnabledState] = useState(() => {
        try {
            const saved = localStorage.getItem('ghl_calendar_service_menu');
            return saved ? JSON.parse(saved) : false;
        } catch (e) {
            console.error('Failed to parse service menu status', e);
            return false;
        }
    });

    // Sync to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('ghl_calendars', JSON.stringify(calendars));
    }, [calendars]);

    useEffect(() => {
        localStorage.setItem('ghl_calendar_groups', JSON.stringify(groups));
    }, [groups]);

    const setServiceMenuEnabled = (enabled: boolean) => {
        setServiceMenuEnabledState(enabled);
        localStorage.setItem('ghl_calendar_service_menu', JSON.stringify(enabled));
    };

    const addCalendar = (calendar: Omit<Calendar, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newCalendar = { ...calendar, id };
        setCalendars(prev => [...prev, newCalendar]);
    };

    const updateCalendar = (id: string, updates: Partial<Calendar>) => {
        setCalendars(prev => prev.map(c => {
            if (c.id === id) {
                // Handle group changes if necessary
                if (updates.groupId && updates.groupId !== c.groupId) {
                    // This is complex, but for now we'll just update the calendar itself
                    // and let the groups be derived if needed, or update groups too
                }
                return { ...c, ...updates };
            }
            return c;
        }));
    };

    const deleteCalendar = (id: string) => {
        setCalendars(prev => prev.filter(c => c.id !== id));
    };

    const addGroup = (group: Omit<ServiceGroup, 'id'>) => {
        const newGroup = { ...group, id: Math.random().toString(36).substr(2, 9) };
        setGroups(prev => [...prev, newGroup]);
    };

    const updateGroup = (id: string, updates: Partial<ServiceGroup>) => {
        setGroups(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    };

    const deleteGroup = (id: string) => {
        setGroups(prev => prev.filter(g => g.id !== id));
        // Remove groupId from any calendars in this group
        setCalendars(prev => prev.map(c => c.groupId === id ? { ...c, groupId: undefined } : c));
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
