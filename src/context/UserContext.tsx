import React, { createContext, useState, useContext } from 'react';

// Define Auth Context
const AuthContext = createContext<{
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

// Custom hook for accessing the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string>(''); // Default role as empty string

  console.log('Current Role:', role); // Debug role

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
