import React, { FC } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/index';
import isAuthenticated from '../../../utils/isAuthenticated';

type PublicRouteProps = {
  component: React.FC;
} & RouteProps;

const PublicRoute: FC<PublicRouteProps> = ({ component: Component, ...rest }: PublicRouteProps) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { loading: profileLoading } = useAppSelector((state) => state.profile);

  const getDestination = () => {
    if (isAuthenticated() && user.profileSetUp) {
      return <Redirect to={{ pathname: '/map', state: { from: location } }} />;
    } else if (isAuthenticated() && !user.profileSetUp && !profileLoading && location.pathname !== '/create') {
      return <Redirect to={{ pathname: '/create', state: { from: location } }} />;
    }

    return <Component />;
  };

  return <Route {...rest}>{getDestination()}</Route>;
};

export default PublicRoute;
