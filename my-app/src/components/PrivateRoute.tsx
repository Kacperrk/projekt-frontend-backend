import React, { JSXElementConstructor, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export const usePrivateRoute = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    element: ReactElement<any, string | JSXElementConstructor<any>>,
    options?: { onlyAdmin?: boolean }
  ) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (options?.onlyAdmin && user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    return element;
  };
};
