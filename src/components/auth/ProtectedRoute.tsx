import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../constants/roles';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user needs to complete their profile
  if (user && (!user.name || !user.email || !user.role)) {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles && user && !allowedRoles.includes(user.role as UserRole)) {
    // Redirect to appropriate page based on role
    if (user.role === 'borrower') {
      return <Navigate to="/verification" replace />;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};