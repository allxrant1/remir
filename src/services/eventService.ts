import { supabase } from '@/lib/supabase';

export interface Event {
    id: string;
    titulo: string;
    tipo: string;
    data: string;
    hora: string;
    local: string;
    descricao?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateEventDTO {
    titulo: string;
    tipo: string;
    data: string;
    hora: string;
    local: string;
    descricao?: string;
}

export interface UpdateEventDTO extends Partial<CreateEventDTO> {
    id: string;
}

export const eventService = {
    async getEvents(): Promise<Event[]> {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('data', { ascending: true });

        if (error) throw error;
        return data;
    },

    async createEvent(event: CreateEventDTO): Promise<Event> {
        const { data, error } = await supabase
            .from('events')
            .insert([event])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateEvent(event: UpdateEventDTO): Promise<Event> {
        const { id, ...updateData } = event;
        const { data, error } = await supabase
            .from('events')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteEvent(id: string): Promise<void> {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
}; 