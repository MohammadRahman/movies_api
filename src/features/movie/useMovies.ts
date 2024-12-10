import { useQuery } from '@tanstack/react-query';
import { movieService } from '../../service/movie/movie';

export function useMovies() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await movieService.findAllMovies();
      return response.data;
    },
  });
  return { movies, isLoading };
}
