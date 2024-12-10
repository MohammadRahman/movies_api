import styled from 'styled-components';
import { Modal } from '../../components/modal/Modal';
import ConfirmDelete from '../../components/confirm-delete/ConfirmDelete';
import { CreateMovieForm } from './MovieForm';
import { useDeleteMovie } from './useDelete';

type MovieDetailProps = {
  movie: any;
};
const StyledMovieDetails = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  border: 1px solid black;
`;
const MovePoster = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;
const StyledImage = styled.div`
  width: 100%;
  height: 240px;
  border: 1px solid black;
`;
const StyledActions = styled.div`
  width: 70%;
  border: 1px solid black;
`;
const StyledButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;
const MovieDetails = ({ movie }: MovieDetailProps) => {
  const { deleteMovie } = useDeleteMovie();

  return (
    <StyledMovieDetails>
      <MovePoster>
        <StyledImage>movie poster</StyledImage>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Genre: {movie?.genres?.map((g) => g.name)}</span>
          <span>Durations: {movie.duration} minutes</span>
          <span>Casts: {movie?.actors?.map((a) => a.name)}</span>
        </div>
      </MovePoster>
      <StyledActions>
        <span>movie descriptions</span>
        <Modal>
          <StyledButtonGroup>
            <Modal.Open opens="updateMovie">
              <button type="button">update</button>
            </Modal.Open>
            <Modal.Window name="updateMovie" type="aside">
              <CreateMovieForm formData={movie} />
            </Modal.Window>
            <Modal.Open opens="deleteMovieWindow">
              <button type="button">delete</button>
            </Modal.Open>
            <Modal.Window name="deleteMovieWindow" type="delete">
              <ConfirmDelete
                disabled={false}
                resourceName={movie.name}
                onConfirm={() => deleteMovie(movie.id)}
              />
            </Modal.Window>
          </StyledButtonGroup>
        </Modal>
      </StyledActions>
    </StyledMovieDetails>
  );
};

export default MovieDetails;
