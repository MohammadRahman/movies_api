import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movieService } from '../../service/movie/movie';

export function useUpdateMovie() {
  const queryClient = useQueryClient();

  const { mutate: updateMovie, isPending } = useMutation({
    mutationKey: ['movies'],
    mutationFn: async (data: any) => {
      const response = await movieService.updateMovie(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
  return { updateMovie, isPending };
}
