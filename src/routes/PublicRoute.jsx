import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PublicRoute({ component: Component, ...rest }) {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route {...rest} component={(props) => (
      !authenticated ? <Component {...props} /> : <Redirect to="/" />
    )} />
  );
}
export default PublicRoute;
