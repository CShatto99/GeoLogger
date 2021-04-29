import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
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
import './App.css';

const App: FC = () => {
    // useEffect(() => {
    //     store.dispatch(refreshUser());
    // }, []);

    return (
        <Router>
            <AppNavbar />
            {/* <Provider store={store}> */}
            {/* {location.pathname !== '/create' && <AppNavbar />} */}
            {/* <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/map" component={Mapbox} />
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/settings" component={Settings} />
                    <PrivateRoute exact path="/create" component={CreateProfile} />
                </Switch>
                {location.pathname !== '/map' && location.pathname !== '/create' && <Footer />} */}
            {/* </Provider> */}
        </Router>
    );
};

export default App;
