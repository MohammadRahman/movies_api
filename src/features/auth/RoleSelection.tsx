import React from 'react';
import { useAuth } from '../../context/UserContext';
// import useAuth from './useAuth';

const RoleSelectionForm: React.FC = () => {
  const { role, setRole } = useAuth();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '400px',
          height: '400px',
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div>
          <h2>Select Role</h2>
        </div>

        <select
          value={role}
          onChange={handleRoleChange}
          style={{ padding: '0.5rem' }}
        >
          <option value="">None</option>
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
};

export default RoleSelectionForm;
