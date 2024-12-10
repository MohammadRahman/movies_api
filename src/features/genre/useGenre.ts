import { useQuery } from '@tanstack/react-query';
import { genreService } from '../../service/genre/genre';

export function useGenre() {
  const { data: genres, isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const response = await genreService.findAllGenres();
      return response.data;
    },
  });
  return { genres, isLoading };
}
