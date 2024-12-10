import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface DropdownProps {
  options: {
    id: number;
    name: string;
    movies: [];
  }[];
  setCloseDropdown: (close: boolean) => void;
}
const StyledUL = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const StyledListItem = styled.li`
  list-style: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
interface DropdownProps {
  options: {
    id: number;
    name: string;
    movies?: []; // Optional since actors don't have movies
  }[];
  setCloseDropdown: (close: boolean) => void;
  type: 'genre' | 'actor'; // New prop to distinguish between types
}

const Dropdown = ({ options, setCloseDropdown, type }: DropdownProps) => {
  const [searchParams, setSearchParams] = useSearchParams(); // Get and update search params

  // function handleClick(id: number) {
  //   // Update the URL parameter based on the dropdown type
  //   setSearchParams({
  //     ...Object.fromEntries(searchParams.entries()), // Preserve existing params
  //     [type]: id.toString(), // Dynamically set 'genre' or 'actor'
  //   });
  //   setCloseDropdown(false); // Close the dropdown after selection
  // }

  function handleClick(id: number) {
    const newParams = {
      [type]: id.toString(), // Set the selected type (genre or actor)
    };

    // Remove the other type parameter
    if (type === 'genre') {
      delete newParams.actor; // Remove 'actor' if current type is 'genre'
    } else if (type === 'actor') {
      delete newParams.genre; // Remove 'genre' if current type is 'actor'
    }

    setSearchParams(newParams); // Update search parameters
    setCloseDropdown(false); // Close the dropdown after selection
  }

  return (
    <StyledUL>
      {options.length === 0 ? (
        <span>No options available.</span>
      ) : (
        options.map((opt) => (
          <StyledListItem key={opt.id} onClick={() => handleClick(opt.id)}>
            {opt.name}
          </StyledListItem>
        ))
      )}
    </StyledUL>
  );
};

export default Dropdown;

// const Dropdown = ({ options, setCloseDropdown }: DropdownProps) => {
//   const [genre, setGenre] = useState<string | number>('');
//   const [searchParams, setSearchParams] = useSearchParams(); // Get and update search params

//   function handleClick(id: number) {
//     setGenre(id);
//     // Update the URL parameter 'genre' when a genre is selected
//     setSearchParams({ genre: id.toString() });
//     setCloseDropdown(false);
//   }

//   return (
//     <StyledUL>
//       {options.length === 0 ? (
//         <span>No genres available.</span>
//       ) : (
//         options.map((opt) => (
//           <StyledListItem key={opt.id} onClick={() => handleClick(opt.id)}>
//             {opt.name}
//           </StyledListItem>
//         ))
//       )}
//     </StyledUL>
//   );
// };

// export default Dropdown;
