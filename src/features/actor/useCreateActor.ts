import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actorService } from '../../service/actor/actor';

export function useCreateActor() {
  const queryClient = useQueryClient();

  const { mutate: createActor, isPending } = useMutation({
    mutationKey: ['actors'],
    mutationFn: async (data: any) => {
      console.log('data received in actor', data);
      const response = await actorService.createActor(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] });
    },
  });
  return { createActor, isPending };
}
