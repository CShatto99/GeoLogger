import React, { FC } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAppSelector } from '../../../store/index';
import getToast from '../../../utils/getToast';
import isAuthenticated from '../../../utils/isAuthenticated';

type PublicRouteProps = {
  component: React.FC;
} & RouteProps;

const PublicRoute: FC<PublicRouteProps> = ({ component: Component, ...rest }: PublicRouteProps) => {
  const location = useLocation();
  const { addToast, toastStack } = useToasts();
  const { user } = useAppSelector((state) => state.auth);

  if (
    isAuthenticated() &&
    !user.profileSetUp &&
    location.pathname !== '/create' &&
    !getToast(toastStack, 'account-set-up')
  ) {
    addToast(<div>Please finish setting up your account.</div>, {
      id: 'account-set-up',
      appearance: 'warning',
      autoDismiss: true,
    });
  }

  return (
    <Route {...rest}>
      {isAuthenticated() && user.profileSetUp ? (
        <Redirect to={{ pathname: '/map', state: { from: location } }} />
      ) : isAuthenticated() && !user.profileSetUp && location.pathname !== '/create' ? (
        <Redirect to={{ pathname: '/create', state: { from: location } }} />
      ) : (
        <Component />
      )}
    </Route>
  );
};

export default PublicRoute;
