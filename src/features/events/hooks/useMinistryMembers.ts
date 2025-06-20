import { useQuery } from '@tanstack/react-query';
import { eventService } from '@/services/eventService';

export function useMinistryMembers(ministryId: string) {
  return useQuery({
    queryKey: ['ministry', ministryId, 'members'],
    queryFn: () => eventService.getMinistryMembers(ministryId),
    enabled: !!ministryId,
  });
} 