import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useApp();

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
