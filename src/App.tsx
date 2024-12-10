import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import GlobalStyles from './styles/CreateGlobalSytles';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Homepage from './pages/home/Homepage';
import AppLayout from './layouts/AppLayout';

import ProtectedRoute from './components/protected-route/ProtectedRoute';
import RoleSelectionForm from './features/auth/RoleSelection';
import { useEffect } from 'react';
// import { useUserContext } from './context/UserContext';
import GenrePage from './pages/genre/GenrePage';
import Spinner from './components/spinner/Spinner';
import RequireAuth from './features/auth/RequireAuth';
import ActorPage from './pages/actor/ActorPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
const ROLES = {
  Guest: 'guest',
  Admin: 'admin',
};
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Homepage />} />
              <Route path="genre" element={<GenrePage />} />
              <Route path="actor" element={<ActorPage />} />
            </Route>
            <Route path="/" element={<RoleSelectionForm />} />
          </Routes>
          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)',
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
