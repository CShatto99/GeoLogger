import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../store/index';

type PrivateRouteProps = {
  path: string;
} & RouteProps;

const PrivateRoute: FC<PrivateRouteProps> = ({ path, ...routeProps }: PrivateRouteProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return isAuth ? <Route exact path={path} {...routeProps} /> : <Redirect to={{ pathname: '/login' }} />;
};

export default PrivateRoute;
