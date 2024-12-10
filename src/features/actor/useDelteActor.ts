import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actorService } from '../../service/actor/actor';

export function useDeleteActor() {
  const queryClient = useQueryClient();

  const { mutate: deleteActor, isPending } = useMutation({
    mutationKey: ['actors'],
    mutationFn: async (id: number) => {
      const response = await actorService.deleteActor(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] });
    },
  });
  return { deleteActor, isPending };
}
