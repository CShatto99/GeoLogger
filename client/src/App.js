import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import AppNavbar from "./components/layout/AppNavbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreateProfile from "./components/layout/CreateProfile";
import Home from "./components/Home";
import Mapbox from "./components/Mapbox";
import Settings from "./components/Settings";
import Footer from "./components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index";
import { refreshUser } from "./store/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(refreshUser());
  }, []);

  return (
    <div>
      <Router>
        <Provider store={store}>
          <AppNavbar />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/map" component={Mapbox} />
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute exact path="/create" component={CreateProfile} />
          </Switch>
          <Footer />
        </Provider>
      </Router>
    </div>
  );
};

export default App;
