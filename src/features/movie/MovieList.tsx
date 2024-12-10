import styled from 'styled-components';
import Movie from './Movie';

interface MovieListProps {
  movies: [];
}
const StyledUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const MovieList = ({ movies }: MovieListProps) => {
  console.log('movies from MovieList', movies);
  if (movies?.length == null) return <div>no movies</div>;
  return (
    <StyledUl>
      {movies?.map((movie: any) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </StyledUl>
  );
};

export default MovieList;
