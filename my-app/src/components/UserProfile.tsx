import React from 'react';
import { useAppSelector } from '../hooks';

const UserProfile = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <div style={{ padding: 20, color: '#fff' }}>
      <h2>Twój profil</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rola:</strong> {user.role}</p>
      {user.firstName && <p><strong>Imię:</strong> {user.firstName}</p>}
      {user.lastName && <p><strong>Nazwisko:</strong> {user.lastName}</p>}
    </div>
  );
};

export default UserProfile;
