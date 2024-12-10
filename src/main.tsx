import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SearchMovieProvider } from './context/SearchMovieContext.tsx';
import { AuthProvider } from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchMovieProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SearchMovieProvider>
  </StrictMode>
);
