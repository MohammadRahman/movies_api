import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import Spinner from '../spinner/Spinner';
import styled from 'styled-components';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
type ProtectedRouteProps = {
  children: any;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { role, loading } = useUserContext();

  console.log('Role in ProtectedRoute:', role); // Debugging

  // If role is still being fetched, don't render ProtectedRoute yet
  // Optionally display a loading state

  // If no role, redirect to login page
  useEffect(
    function () {
      if (!role && !loading) navigate('/login');
    },
    [role, loading, navigate]
  );

  if (loading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // If role exists, render the protected route content
  if (role) {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
