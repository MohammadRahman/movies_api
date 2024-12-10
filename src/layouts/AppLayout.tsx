import styled from 'styled-components';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  /* position: relative; */
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  overflow-y: auto;
  position: relative;
  padding: 1rem 3rem;
  min-height: 100vh;
  border: 1px solid black;
`;

const AppLayout = () => {
  return (
    <StyledLayout>
      <Header />
      <Main>
        <div>
          <Outlet />
        </div>
      </Main>
    </StyledLayout>
  );
};

export default AppLayout;
