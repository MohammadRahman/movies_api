import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';

type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { role } = useAuth(); // Fetch role from AuthContext
  const location = useLocation();

  // Check if the role matches allowedRoles
  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
