import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreService } from '../../service/genre/genre';

export function useDeleteGenre() {
  const queryClient = useQueryClient();

  const { mutate: deleteGenre, isPending } = useMutation({
    mutationKey: ['genres'],
    mutationFn: async (id: number) => {
      const response = await genreService.deleteGenre(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
  return { deleteGenre, isPending };
}
