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

export interface EventParticipant {
    id: string;
    event_id: string;
    user_id: string;
    role: string;
    status: 'pending' | 'confirmed' | 'declined';
    created_at: string;
}

export interface AddParticipantDTO {
    user_id: string;
    role: string;
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
    },

    // ---------- PARTICIPANTES ---------- //

    async getEventParticipants(eventId: string): Promise<EventParticipant[]> {
        const { data, error } = await supabase
            .from('event_participants')
            .select('*')
            .eq('event_id', eventId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data as EventParticipant[];
    },

    async addEventParticipants(eventId: string, participants: { user_id: string }[]): Promise<EventParticipant[]> {
        const rows = participants.map(p => ({
            event_id: eventId,
            user_id: p.user_id,
            role: 'member',
            status: 'pending'
        }));
        const { data, error } = await supabase
            .from('event_participants')
            .insert(rows)
            .select();

        if (error) throw error;
        return data as EventParticipant[];
    },

    async updateParticipantStatus(participantId: string, status: 'pending' | 'confirmed' | 'declined'): Promise<EventParticipant> {
        const { data, error } = await supabase
            .from('event_participants')
            .update({ status })
            .eq('id', participantId)
            .select()
            .single();

        if (error) throw error;
        return data as EventParticipant;
    },

    async removeParticipant(participantId: string): Promise<void> {
        const { error } = await supabase
            .from('event_participants')
            .delete()
            .eq('id', participantId);

        if (error) throw error;
    },

    async getMinistryMembers(ministryId: string) {
        // Passo 1: obtém IDs de usuários vinculados ao ministério
        const { data: vinculos, error: err1 } = await supabase
            .from('ministry_members')
            .select('user_id')
            .eq('ministry_id', ministryId)
            .eq('role', 'member');

        if (err1) throw err1;

        const ids = (vinculos as any[]).map(v => v.user_id);
        if (ids.length === 0) return [];

        // Passo 2: busca perfis na tabela pública `users`
        const { data: perfis, error: err2 } = await supabase
            .from('users')
            .select('id, name')
            .in('id', ids);

        if (err2) throw err2;

        return (perfis as any[]) as { id: string; name: string }[];
    },
}; 