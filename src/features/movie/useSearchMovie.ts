import { useQuery } from '@tanstack/react-query';
import { movieService } from '../../service/movie/movie';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSearchMovieContext } from '../../context/SearchMovieContext';

export const useSearchMovie = (enabled = false) => {
  const [searchParam] = useSearchParams();
  const { setSearchResults } = useSearchMovieContext();

  const title = searchParam.get('title') || '';

  const {
    data: findMovie,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      try {
        console.log('title receive in hook', title);
        const response = await movieService.findMovieByTitle(title);
        if (response.data.list.length > 0) {
          setSearchResults(response.data.list);
        }
        toast.success('search found');
        return response.data;
      } catch (error) {
        throw new Error('Error');
      }
    },
    enabled,
  });
  return { findMovie, isLoading, isFetched };
};
