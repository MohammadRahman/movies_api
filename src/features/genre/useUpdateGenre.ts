import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreService } from '../../service/genre/genre';

export function useUpdateGenre() {
  const queryClient = useQueryClient();

  const { mutate: updateGenre, isPending } = useMutation({
    mutationKey: ['genres'],
    mutationFn: async (data: any) => {
      const response = await genreService.updateGenre(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
  return { updateGenre, isPending };
}
