import styled from 'styled-components';
import SearchByMovieName from '../search/SearchByMovieName';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../modal/Modal';
import { CreateMovieForm } from '../../features/movie/MovieForm';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;

const HeaderMenu = () => {
  return (
    <Modal>
      <StyledHeaderMenu>
        <li>
          <SearchByMovieName />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/actor">Actor</Link>
        </li>
        <li>
          <Link to="/genre">Genre</Link>
        </li>

        <li>
          <Modal.Open opens="addNewMovieForm">
            <Button style={{ padding: '0.5rem' }}>Add Movie</Button>
          </Modal.Open>
          <Modal.Window name="addNewMovieForm" type="aside">
            <CreateMovieForm />
          </Modal.Window>
        </li>
      </StyledHeaderMenu>
    </Modal>
  );
};

export default HeaderMenu;
