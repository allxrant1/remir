import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService, EventParticipant } from '@/services/eventService';

const participantsKey = (eventId: string) => ['event', eventId, 'participants'];

export function useEventParticipants(eventId: string) {
  return useQuery<EventParticipant[]>({
    queryKey: participantsKey(eventId),
    queryFn: () => eventService.getEventParticipants(eventId),
    enabled: !!eventId,
  });
}

export function useAddParticipants() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, participants }: { eventId: string; participants: { user_id: string }[] }) =>
      eventService.addEventParticipants(eventId, participants),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: participantsKey(variables.eventId) });
    },
  });
}

export function useUpdateParticipantStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, eventId }: { id: string; status: 'pending' | 'confirmed' | 'declined'; eventId: string }) =>
      eventService.updateParticipantStatus(id, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: participantsKey(variables.eventId) });
    },
  });
}

export function useRemoveParticipant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, eventId }: { id: string; eventId: string }) => eventService.removeParticipant(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: participantsKey(variables.eventId) });
    },
  });
} 