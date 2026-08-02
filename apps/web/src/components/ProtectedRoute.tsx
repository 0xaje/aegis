import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

export interface ProtectedRouteProps {
  redirectPath?: string;
}

export function ProtectedRoute({ redirectPath = '/' }: ProtectedRouteProps) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
