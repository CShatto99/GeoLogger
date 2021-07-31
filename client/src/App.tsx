import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './hooks/useTheme';
import store, { useAppSelector } from './store/index';
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
import getToast from './utils/getToast';

const AppContent: FC = () => {
  const { ERR_AUTHORIZE } = useAppSelector((state) => state.alert);

  const { addToast, removeToast, toastStack } = useToasts();

  useEffect(() => {
    if (ERR_AUTHORIZE) {
      addToast(
        <>
          <div>{ERR_AUTHORIZE}</div>
        </>,
        {
          id: 'user-unauthorized',
          appearance: 'warning',
        },
      );
    } else if (getToast(toastStack, 'user-unauthorized')) {
      removeToast('user-unauthorized');
    }
  }, [ERR_AUTHORIZE]);

  return (
    <>
      <NavigationBar />
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
      <Footer />
    </>
  );
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
          <ToastProvider placement="top-left">
            <AppContent />
          </ToastProvider>
        </Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
