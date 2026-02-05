import { supabase } from './supabase';
import type { Database } from './supabase';

// Type aliases for cleaner code
type Contact = Database['public']['Tables']['contacts']['Row'];
type ContactInsert = Database['public']['Tables']['contacts']['Insert'];
type ContactUpdate = Database['public']['Tables']['contacts']['Update'];

type Calendar = Database['public']['Tables']['calendars']['Row'];
type CalendarInsert = Database['public']['Tables']['calendars']['Insert'];
type CalendarUpdate = Database['public']['Tables']['calendars']['Update'];

type Appointment = Database['public']['Tables']['appointments']['Row'];
type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];

// =============================================
// CONTACTS SERVICE
// =============================================

export const contactsService = {
    /**
     * Get all contacts for the authenticated user
     */
    async getAll(): Promise<{ data: Contact[] | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        return { data, error };
    },

    /**
     * Create a new contact
     */
    async create(contact: ContactInsert): Promise<{ data: Contact | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: new Error('User not authenticated') };
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert({ ...contact, user_id: user.id })
            .select()
            .single();

        return { data, error };
    },

    /**
     * Update an existing contact
     */
    async update(id: string, updates: ContactUpdate): Promise<{ data: Contact | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data, error } = await supabase
            .from('contacts')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        return { data, error };
    },

    /**
     * Delete a contact
     */
    async delete(id: string): Promise<{ error: any }> {
        if (!supabase) {
            return { error: new Error('Supabase not configured') };
        }

        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

        return { error };
    },

    /**
     * Bulk create contacts (for data migration)
     */
    async bulkCreate(contacts: ContactInsert[]): Promise<{ data: Contact[] | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: new Error('User not authenticated') };
        }

        const contactsWithUserId = contacts.map(c => ({ ...c, user_id: user.id }));

        const { data, error } = await supabase
            .from('contacts')
            .insert(contactsWithUserId)
            .select();

        return { data, error };
    }
};

// =============================================
// CALENDARS SERVICE
// =============================================

export const calendarsService = {
    /**
     * Get all calendars for the authenticated user
     */
    async getAll(): Promise<{ data: Calendar[] | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data, error } = await supabase
            .from('calendars')
            .select('*')
            .order('created_at', { ascending: false });

        return { data, error };
    },

    /**
     * Create a new calendar
     */
    async create(calendar: CalendarInsert): Promise<{ data: Calendar | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: new Error('User not authenticated') };
        }

        const { data, error } = await supabase
            .from('calendars')
            .insert({ ...calendar, user_id: user.id })
            .select()
            .single();

        return { data, error };
    },

    /**
     * Update an existing calendar
     */
    async update(id: string, updates: CalendarUpdate): Promise<{ data: Calendar | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data, error } = await supabase
            .from('calendars')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        return { data, error };
    },

    /**
     * Delete a calendar
     */
    async delete(id: string): Promise<{ error: any }> {
        if (!supabase) {
            return { error: new Error('Supabase not configured') };
        }

        const { error } = await supabase
            .from('calendars')
            .delete()
            .eq('id', id);

        return { error };
    },

    /**
     * Bulk create calendars (for data migration)
     */
    async bulkCreate(calendars: CalendarInsert[]): Promise<{ data: Calendar[] | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: new Error('User not authenticated') };
        }

        const calendarsWithUserId = calendars.map(c => ({ ...c, user_id: user.id }));

        const { data, error } = await supabase
            .from('calendars')
            .insert(calendarsWithUserId)
            .select();

        return { data, error };
    }
};

// =============================================
// APPOINTMENTS SERVICE
// =============================================

export const appointmentsService = {
    /**
     * Get all appointments for the authenticated user
     */
    async getAll(): Promise<{ data: Appointment[] | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('start_time', { ascending: true });

        return { data, error };
    },

    /**
     * Create a new appointment
     */
    async create(appointment: AppointmentInsert): Promise<{ data: Appointment | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: new Error('User not authenticated') };
        }

        const { data, error } = await supabase
            .from('appointments')
            .insert({ ...appointment, user_id: user.id })
            .select()
            .single();

        return { data, error };
    },

    /**
     * Update an existing appointment
     */
    async update(id: string, updates: AppointmentUpdate): Promise<{ data: Appointment | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data, error } = await supabase
            .from('appointments')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        return { data, error };
    },

    /**
     * Delete an appointment
     */
    async delete(id: string): Promise<{ error: any }> {
        if (!supabase) {
            return { error: new Error('Supabase not configured') };
        }

        const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', id);

        return { error };
    },

    /**
     * Bulk create appointments (for data migration)
     */
    async bulkCreate(appointments: AppointmentInsert[]): Promise<{ data: Appointment[] | null; error: any }> {
        if (!supabase) {
            return { data: null, error: new Error('Supabase not configured') };
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { data: null, error: new Error('User not authenticated') };
        }

        const appointmentsWithUserId = appointments.map(a => ({ ...a, user_id: user.id }));

        const { data, error } = await supabase
            .from('appointments')
            .insert(appointmentsWithUserId)
            .select();

        return { data, error };
    }
};
