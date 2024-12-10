import styled from 'styled-components';
import Header from '../../components/header/Header';

const StyledTopScreen = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;
const TopScreen = () => {
  return (
    <StyledTopScreen>
      <Header />
    </StyledTopScreen>
  );
};

export default TopScreen;
