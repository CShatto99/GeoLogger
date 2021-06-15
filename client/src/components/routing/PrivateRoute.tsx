import React, { FC } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/index';
import isAuthenticated from '../../utils/isAuthenticated';

type PrivateRouteProps = {
  component: React.FC;
} & RouteProps;

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return (
    <Route {...rest}>
      {!isAuthenticated() && !user.profileSetUp && location.pathname !== '/create' ? (
        <Redirect to={{ pathname: '/create', state: { from: location } }} />
      ) : !isAuthenticated() ? (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ) : (
        <Component />
      )}
    </Route>
  );
};

export default PrivateRoute;
