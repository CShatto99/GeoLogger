import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store/index';
import { refreshUser } from './store/auth';
import AppNavbar from './components/layout/AppNavbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import Mapbox from './components/map/Mapbox';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import Settings from './components/settings/Settings';
import CreateProfile from './components/profile/CreateProfile';
import theme from './theme';
import './App.css';

const RenderNavbar: FC = () => {
  const location = useLocation();

  return location.pathname !== '/create' && location.pathname !== '/login' && location.pathname !== '/register' ? (
    <AppNavbar />
  ) : null;
};

const RenderFooter: FC = () => {
  const location = useLocation();

  return location.pathname === '/' || location.pathname === '/settings' ? <Footer /> : null;
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
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/map" component={Mapbox} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route exact path="/create-profile">
              <CreateProfile />
            </Route>
          </Switch>
          <RenderFooter />
        </Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
