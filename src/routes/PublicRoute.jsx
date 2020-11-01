import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';

function PublicRoute({ component: Component, ...rest }) {
  const { authenticated } = useAuthentication();

  return (
    <Route {...rest} component={(props) => (
      !authenticated ? <Component {...props} /> : <Redirect to="/" />
    )} />
  );
}
export default PublicRoute;
