import React, { createContext, useContext, useState, useCallback } from 'react';

// Define the shape of the context data
interface SearchMovieContextType {
  searchResults: any;
  setSearchResults: (data: any) => void;
}

// Create the context with default values
const SearchMovieContext = createContext<SearchMovieContextType | undefined>(
  undefined
);

// Create a provider component
export const SearchMovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<any>(null);

  const updateSearchResults = useCallback((data: any) => {
    setSearchResults(data);
  }, []);

  return (
    <SearchMovieContext.Provider
      value={{ searchResults, setSearchResults: updateSearchResults }}
    >
      {children}
    </SearchMovieContext.Provider>
  );
};

// Custom hook to use the SearchMovieContext
export const useSearchMovieContext = (): SearchMovieContextType => {
  const context = useContext(SearchMovieContext);
  if (!context) {
    throw new Error(
      'useSearchMovieContext must be used within a SearchMovieProvider'
    );
  }
  return context;
};
