import { useEffect } from 'react';
import { Navigate, Routes } from 'react-router-dom';

import { useAuth } from './core/Auth';

export const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    document.location.reload();
  }, [logout]);

  return (
    <Routes>
      <Navigate to="/auth/login" />
    </Routes>
  );
};
