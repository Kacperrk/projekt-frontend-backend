import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface Props {
  children: JSX.Element;
  requiredRole?: 'ADMIN' | 'USER'; // lub inne role, jeśli masz
}

const PrivateRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  const isAuthenticated = token !== null;
  const hasRequiredRole = requiredRole ? user?.role === requiredRole : true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;