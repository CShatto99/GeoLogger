import React, { FC } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/index';

type PrivateRouteProps = {
  component: React.FC;
} & RouteProps;

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return (
    <Route {...rest}>
      {isAuth && !user.profileSetUp && location.pathname !== '/create' ? (
        <Redirect to={{ pathname: '/create', state: { from: location } }} />
      ) : !isAuth ? (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ) : (
        <Component />
      )}
    </Route>
  );
};

export default PrivateRoute;
