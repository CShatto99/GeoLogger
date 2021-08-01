import React, { FC } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/index';
import isAuthenticated from '../../../utils/isAuthenticated';

type PrivateRouteProps = {
  component: React.FC;
} & RouteProps;

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const getDestination = () => {
    if (!isAuthenticated()) {
      return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
    } else if (isAuthenticated() && !user.profileSetUp && location.pathname !== '/create') {
      <Redirect
        to={{
          pathname: '/create',
          state: { from: location },
        }}
      />;
    }

    return <Component />;
  };

  return <Route {...rest}>{getDestination()}</Route>;
};

export default PrivateRoute;
