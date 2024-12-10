import { useSearchParams } from 'react-router-dom';
import MovieList from './MovieList';
import { useGenre } from '../genre/useGenre';
import { useMovies } from './useMovies';
import Movie from './Movie';
import styled from 'styled-components';
import { useActor } from '../actor/useActor';
import { useSearchMovieContext } from '../../context/SearchMovieContext';

const StyledUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const Movies = () => {
  const { genres } = useGenre();
  const { searchResults } = useSearchMovieContext();
  const [searchParms] = useSearchParams();
  const genreIdFromParams = searchParms.get('genre');
  const actorIdFromParams = searchParms.get('actor');
  const titleInParams = searchParms.get('title');
  const { movies } = useMovies();
  const { actors } = useActor();

  const allMoviesFromGenre = genres
    ? [
        ...genres, // Spread the genres array
        { id: 102930, name: 'All Movies', movies: movies }, // Add the 'All Movies' genre at the end
      ]
    : [];

  // Find the selected genre from the URL params, default to null if none
  const selectedGenre = genreIdFromParams
    ? allMoviesFromGenre?.find(
        (genre) => genre.id === Number(genreIdFromParams)
      )
    : null;

  const actorsWithMovies = actors?.map((actor: any) => ({
    ...actor,
    movies: movies?.filter((movie: any) =>
      movie.actors.some((a: any) => a.id === actor.id)
    ), // Match movies with actor
  }));
  const selectedActor = actorIdFromParams
    ? actorsWithMovies.find(
        (actor: any) => actor.id === Number(actorIdFromParams)
      )
    : null;

  if (titleInParams && searchResults?.length != 0) {
    return <MovieList movies={searchResults} />;
  } else {
    <div>
      No movies found for this {actorIdFromParams ? 'actor' : 'genre'}.
    </div>;
  }

  return (
    <>
      {!genreIdFromParams && !actorIdFromParams ? (
        <StyledUl
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}
        >
          {movies?.map((movie: any) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </StyledUl>
      ) : genreIdFromParams && selectedGenre?.movies?.length > 0 ? (
        <div>
          <MovieList movies={selectedGenre.movies} />
        </div>
      ) : actorIdFromParams && selectedActor?.movies?.length > 0 ? (
        <div>
          <MovieList movies={selectedActor.movies} />
        </div>
      ) : titleInParams && searchResults?.length != 0 ? (
        <div>
          <MovieList movies={searchResults} />
        </div>
      ) : (
        <div>
          No movies found for this {actorIdFromParams ? 'actor' : 'genre'}.
        </div>
      )}
    </>
  );
};

export default Movies;
