import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actorService } from '../../service/actor/actor';

export function useUpdateActor() {
  const queryClient = useQueryClient();

  const { mutate: updateActor, isPending } = useMutation({
    mutationKey: ['actors'],
    mutationFn: async (data: any) => {
      console.log('received data', data);
      const response = await actorService.updateActor(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] });
    },
  });
  return { updateActor, isPending };
}
