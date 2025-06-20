import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService, CreateEventDTO, Event } from '@/services/eventService';

const QUERY_KEY = ['events'];

export const useCreateEvento = () => {
  const queryClient = useQueryClient();

  return useMutation<Event, unknown, CreateEventDTO>({
    mutationFn: (evento) => eventService.createEvent(evento),
    onSuccess: () => {
      // Invalida lista para refetch; futuro: podemos usar update otimista
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}; 