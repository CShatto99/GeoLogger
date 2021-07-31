import React, { FC } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAppSelector } from '../../../store/index';
import getToast from '../../../utils/getToast';
import isAuthenticated from '../../../utils/isAuthenticated';

type PrivateRouteProps = {
  component: React.FC;
} & RouteProps;

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const location = useLocation();
  const { addToast, removeToast, toastStack } = useToasts();
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
  } else {
    removeToast('account-set-up');
  }

  return (
    <Route {...rest}>
      {isAuthenticated() && !user.profileSetUp && location.pathname !== '/create' ? (
        <Redirect
          to={{
            pathname: '/create',
            state: { from: location },
          }}
        />
      ) : !isAuthenticated() ? (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ) : (
        <Component />
      )}
    </Route>
  );
};

export default PrivateRoute;
