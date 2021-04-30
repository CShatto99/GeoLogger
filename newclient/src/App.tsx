import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
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

const RenderRoute = (route: RouteType) => {
  const history = useHistory();

  document.title = `${route.title} - Geologger` || 'GeoLogger';
  if (route.needsAuth && !isAuthenticated()) history.push('/login');
  else if (!route.needsAuth && isAuthenticated()) history.push('/map');

  return <Route path={route.path} exact component={route.component} />;
};

const App: FC = () => {
  useEffect(() => {
    store.dispatch(refreshUser());
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {location.pathname !== '/create' && <AppNavbar />}
          <Switch>
            {routes.map((route, index) => (
              <RenderRoute {...route} key={index} />
            ))}
          </Switch>
          {location.pathname !== '/map' && location.pathname !== '/create' && <Footer />}
        </Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
