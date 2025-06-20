import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '@/services/eventService';

const QUERY_KEY = ['events'];

export const useDeleteEvento = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (id) => eventService.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}; 