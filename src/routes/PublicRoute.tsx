import { Navigate } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';

interface PublicRouteProps {
  children: JSX.Element;
  redirectTo: string;
}

function PublicRoute({ children, redirectTo }: PublicRouteProps) {
  const { authenticated } = useAuthentication();

  return authenticated ? <Navigate to={redirectTo} /> : children;
}
export default PublicRoute;
