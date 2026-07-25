import { Navigate, Outlet } from 'react-router-dom';

export interface ProtectedRouteProps {
  isConnected: boolean;
  redirectPath?: string;
}

export function ProtectedRoute({ isConnected, redirectPath = '/' }: ProtectedRouteProps) {
  if (!isConnected) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}
