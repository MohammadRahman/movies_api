import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movieService } from '../../service/movie/movie';

export function useCreateMovie() {
  const queryClient = useQueryClient();

  const { mutate: createMovie, isPending } = useMutation({
    mutationKey: ['movies'],
    mutationFn: async (data: any) => {
      const response = await movieService.createMovie(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
  return { createMovie, isPending };
}
