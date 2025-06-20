import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eventService, Event } from '@/services/eventService';

const QUERY_KEY = ['events'];

export const useEventos = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Event[]>({
    queryKey: QUERY_KEY,
    queryFn: () => eventService.getEvents(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const refetchEvents = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  return {
    ...query,
    refetchEvents,
  };
}; 