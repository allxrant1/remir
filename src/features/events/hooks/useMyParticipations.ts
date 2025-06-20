import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface MyParticipation {
  id: string;
  event_id: string;
  status: 'pending' | 'confirmed' | 'declined';
  role: string;
  event: {
    id: string;
    titulo: string;
    tipo: string;
    data: string;
    hora: string;
    local: string;
    descricao?: string;
  };
}

export function useMyParticipations() {
  const { user } = useAuth();

  return useQuery<MyParticipation[]>({
    queryKey: ['my-participations', user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_participants')
        .select(`
          id,
          event_id,
          status,
          role,
          created_at,
          events (
            id, titulo, tipo, data, hora, local, descricao
          )
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      // cast to proper type
      return data as any;
    },
  });
} 