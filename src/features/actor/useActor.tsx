import { useQuery } from '@tanstack/react-query';
import { actorService } from '../../service/actor/actor';

export function useActor() {
  const { data: actors, isLoading } = useQuery({
    queryKey: ['actors'],
    queryFn: async () => {
      const response = await actorService.findAllActors();
      return response.data;
    },
  });
  return { actors, isLoading };
}
