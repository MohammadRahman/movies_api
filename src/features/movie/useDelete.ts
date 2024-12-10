import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movieService } from '../../service/movie/movie';

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  const { mutate: deleteMovie, isPending } = useMutation({
    mutationKey: ['movies'],
    mutationFn: async (id: number) => {
      const response = await movieService.deleteMovie(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
  return { deleteMovie, isPending };
}
