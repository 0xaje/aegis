import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

export interface ProtectedRouteProps {
  redirectPath?: string;
}

export function ProtectedRoute({ redirectPath = '/' }: ProtectedRouteProps) {
  const { isConnected: realIsConnected } = useAccount();
  const demoMode =
    typeof window !== 'undefined' && localStorage.getItem('aegis_demo_mode') === 'true';
  const isConnected = realIsConnected || demoMode;

  if (!isConnected) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}
