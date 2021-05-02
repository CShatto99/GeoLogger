import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import AppNavbar from './components/layout/AppNavbar';
import Footer from './components/layout/Footer';
import store from './store/index';
import { refreshUser } from './store/auth';
import { RouteType } from './routes';
import isAuthenticated from './utils/isAuthenticated';
import theme from './theme';
import routes from './routes';
import './App.css';
import Login from './components/auth/Login';

const RenderRoute = (route: RouteType) => {
  const history = useHistory();

  console.log(console.log());

  document.title = `${route.title} - Geologger` || 'GeoLogger';
  if (route.needsAuth && !isAuthenticated()) history.push('/login');
  else if (!route.needsAuth && isAuthenticated()) history.push('/map');

  return <Route path={route.path} exact component={route.component} />;
};

const RenderNavbar: FC = () => {
  const location = useLocation();

  return location.pathname !== '/create' && location.pathname !== '/login' && location.pathname !== '/register' ? (
    <AppNavbar />
  ) : null;
};

const App: FC = () => {
  useEffect(() => {
    store.dispatch(refreshUser());
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RenderNavbar />
          <Switch>
            <Login />
            {routes.map((route, index) => (
              <RenderRoute {...route} key={index} />
            ))}
          </Switch>
          {location.pathname !== '/map' &&
            location.pathname !== '/create' &&
            location.pathname !== '/login' &&
            location.pathname !== '/register' && <Footer />}
        </Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
