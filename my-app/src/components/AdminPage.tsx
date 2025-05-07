import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../slices/usersSlice';

const AdminPage = () => {
  const users = useSelector((state: RootState) => state.users.list);

  return (
    <div>
      <h2>Panel administratora</h2>
      <h3>Zarejestrowani użytkownicy:</h3>

      {users.length === 0 ? (
        <p>Brak zarejestrowanych użytkowników.</p>
      ) : (
        <ul>
          {users.map((user: User, index: number) => (
            <li key={index}>
              <strong>{user.name}</strong> – {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
