import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user';
import { Loading } from '@/components/ui/loading';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export function PrivateRoute({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: PrivateRouteProps) {
  const { user, role, isLoading, profileLoading } = useAuth();
  const location = useLocation();

  // Aguarda o carregamento GERAL da autenticação E o carregamento do perfil
  if (isLoading || profileLoading) {
    return <Loading message="Verificando autenticação e perfil..." />;
  }

  // Se não requer autenticação, permite o acesso
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Se requer autenticação e não há usuário, redireciona para login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se há roles específicas e o usuário não tem permissão, redireciona para home
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Se passou por todas as verificações, renderiza o conteúdo
  return <>{children}</>;
}
