import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './hooks/useTheme';
import store from './store/index';
import { refreshUser } from './store/auth';
import NavigationBar from './components/layout/NavigationBar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/privateRoute/PrivateRoute';
import PublicRoute from './components/routing/publicRoute/PublicRoute';
import Map from './components/map/Map';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Home from './components/home/Home';
import Settings from './components/settings/Settings';
import CreateProfile from './components/profile/createProfile/CreateProfile';
import PublicProfile from './components/profile/publicProfile/PublicProfile';
import Explore from './components/explore/Explore';
import NotFound from './components/layout/NotFound';
import './App.css';

const RenderNavbar: FC = () => {
  const location = useLocation();

  return location.pathname !== '/login' && location.pathname !== '/register' ? <NavigationBar /> : null;
};

const RenderFooter: FC = () => {
  const location = useLocation();

  return location.pathname === '/' || location.pathname === '/settings' ? <Footer /> : null;
};

const App: FC = () => {
  const { siteTheme } = useTheme();

  useEffect(() => {
    store.dispatch(refreshUser());
  }, []);

  return (
    <Router>
      <ThemeProvider theme={siteTheme}>
        <Provider store={store}>
          <RenderNavbar />
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/explore" component={Explore} />
            <PrivateRoute exact path="/map" component={Map} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute exact path="/create" component={CreateProfile} />
            <PrivateRoute exact path="/profile/:username" component={PublicProfile} />
            <Route component={NotFound} />
          </Switch>
          <RenderFooter />
        </Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
