import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreService } from '../../service/genre/genre';

export function useCreateGenre() {
  const queryClient = useQueryClient();

  const { mutate: createGenre, isPending } = useMutation({
    mutationKey: ['genres'],
    mutationFn: async (data: any) => {
      const response = await genreService.createGenre(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
  return { createGenre, isPending };
}
