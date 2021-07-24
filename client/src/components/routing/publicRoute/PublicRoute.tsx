import React, { FC } from 'react';
import { Route, Redirect, RouteProps, useLocation, useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../store/index';
import isAuthenticated from '../../../utils/isAuthenticated';

type PublicRouteProps = {
  component: React.FC;
} & RouteProps;

const PublicRoute: FC<PublicRouteProps> = ({ component: Component, ...rest }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const history = useHistory();

  console.log(history);

  return (
    <Route {...rest}>
      {isAuthenticated() && user.profileSetUp ? (
        <Redirect to={{ pathname: '/create', state: { from: location } }} />
      ) : isAuthenticated() && !user.profileSetUp && location.pathname !== '/create' ? (
        <Redirect to={{ pathname: '/map', state: { from: location } }} />
      ) : (
        <Component />
      )}
    </Route>
  );
};

export default PublicRoute;
