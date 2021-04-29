import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
// import PrivateRoute from './components/routing/PrivateRoute';
import AppNavbar from './components/layout/AppNavbar';
// import Register from './components/auth/Register';
// import Login from './components/auth/Login';
// import CreateProfile from './components/layout/CreateProfile';
// import Home from './components/Home';
// import Mapbox from './components/Mapbox';
// import Settings from './components/Settings';
// import Footer from './components/layout/Footer';
// import store from './store/index';
// import { refreshUser } from './store/auth';
import { RouteType } from './routes';
import isAuthenticated from './utils/isAuthenticated';
import theme from './theme';
import './App.css';

const RenderRoute = (route: RouteType) => {
  const history = useHistory();

  document.title = route.title || 'GeoLogger';
  if (route.needsAuth && !isAuthenticated()) history.push('/login');
  else if (!route.needsAuth && isAuthenticated()) history.push('/map');

  return <Route path={route.path} exact component={route.component} />;
};

const App: FC = () => {
  // useEffect(() => {
  //     store.dispatch(refreshUser());
  // }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppNavbar />
        {/* <Provider store={store}> */}
        {/* {location.pathname !== '/create' && <AppNavbar />} */}
        {/* <Switch>
              {routes.map((route, index) => (
                <RenderRoute {...route} key={index} />
              ))}
            </Switch>
                {location.pathname !== '/map' && location.pathname !== '/create' && <Footer />} */}
        {/* </Provider> */}
      </ThemeProvider>
    </Router>
  );
};

export default App;
