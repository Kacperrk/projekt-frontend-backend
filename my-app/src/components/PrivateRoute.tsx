import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
