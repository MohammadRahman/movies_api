import styled from 'styled-components';
import { Modal } from '../../components/modal/Modal';
import MovieDetails from './MovieDetails';

const StyledMovie = styled.div`
  width: 100%;
  height: 240px;
  border: 1px solid var(--color-grey-100);
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
type MovieProps = {
  movie: any;
};
const Movie = ({ movie }: MovieProps) => {
  return (
    <Modal>
      <Modal.Open opens="movieDetails">
        <StyledMovie>
          <span>{movie.title}</span>
        </StyledMovie>
      </Modal.Open>
      <Modal.Window name="movieDetails" type="modal">
        <MovieDetails movie={movie} />
      </Modal.Window>
    </Modal>
  );
};

export default Movie;
