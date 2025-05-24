import React, { JSXElementConstructor, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

/**
 * Hook zwracający funkcję, która zabezpiecza trasę dla zalogowanych użytkowników.
 */
export const usePrivateRoute = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (element: ReactElement<any, string | JSXElementConstructor<any>>) => {
    return user ? element : <Navigate to="/login" replace />;
  };
};
