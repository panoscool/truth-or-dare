import { Navigate } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';

interface PrivateRouteProps {
  children: JSX.Element;
  redirectTo: string;
}

function PrivateRoute({ children, redirectTo }: PrivateRouteProps) {
  const { authenticated } = useAuthentication();

  return authenticated ? children : <Navigate to={redirectTo} />;
}
export default PrivateRoute;
