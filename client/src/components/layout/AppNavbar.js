import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { NavItem } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";
import "../../css/navbar.css";

const AppNavbar = withRouter(({ location }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.profile);
  const [navIcon, setNavIcon] = useState("nav-items-hide");
  const [navLinkCol, setNavLinkCol] = useState("");

  useEffect(() => {
    if (JSON.stringify(profile) === "{}") setNavLinkCol("text-gray-400");
    else
      profile.mapStyle === "dark-v10" ||
      profile.mapStyle === "satellite-v9" ||
      location.pathname === "/"
        ? setNavLinkCol("text-gray-400")
        : setNavLinkCol("text-gray-900");
  }, [profile, location.pathname]);

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link
          to="/login"
          className="nav-link text-gray-400 hover:text-gray-200"
          onClick={() => setNavIcon("nav-items-hide")}
        >
          Login
        </Link>
      </NavItem>
      <NavItem>
        <Link
          to="/register"
          className="nav-link reg-btn hover:bg-blue-800"
          onClick={() => setNavIcon("nav-items-hide")}
        >
          Register
        </Link>
      </NavItem>
    </Fragment>
  );

  const userLinks = (
    <Fragment>
      <NavItem>
        <Link
          to="/map"
          className={`nav-link ${navLinkCol} hover:text-gray-200`}
          onClick={() => setNavIcon("nav-items-hide")}
        >
          Map
        </Link>
      </NavItem>
      <NavItem>
        <div className="dropdown">
          <div className={`nav-link ${navLinkCol} hover:text-gray-200`}>
            Profile
          </div>
          <div className="dropdown-content">
            <Link to="/settings" onClick={() => setNavIcon("nav-items-hide")}>
              Settings
            </Link>
            <a
              onClick={() => {
                setNavIcon("nav-items-hide");
                dispatch(logout());
              }}
            >
              Logout
            </a>
          </div>
        </div>
      </NavItem>
    </Fragment>
  );

  return (
    <div className="nav-div">
      <nav className="nav-div-inner">
        <div className="nav-brand">
          <i className="gen-btn fa fa-globe" aria-hidden="true">
            <div className="navbrand-icon"></div>
          </i>
          <button className={`gen-btn logo ${navLinkCol}`}>GeoLogger</button>
        </div>
        <ul className={`nav-items ${navIcon}`}>
          <NavItem>
            <Link
              to="/"
              className={`nav-link ${navLinkCol} hover:text-gray-200`}
              onClick={() => setNavIcon("nav-items-hide")}
            >
              Home
            </Link>
          </NavItem>
          {isAuth ? userLinks : guestLinks}
        </ul>
        <div
          className="nav-hamburger"
          onClick={() => {
            navIcon === "nav-items-hide"
              ? setNavIcon("nav-items-show")
              : setNavIcon("nav-items-hide");
          }}
        >
          <div className="nav-hamburger-content">
            <div
              className="bar1"
              style={{
                transform:
                  navIcon === "nav-items-show" &&
                  "rotate(-45deg) translate(-5px, 5px)",
              }}
            />
            <div
              className="bar2"
              style={{
                opacity: navIcon === "nav-items-show" && "0",
              }}
            />
            <div
              className="bar3"
              style={{
                transform:
                  navIcon === "nav-items-show" &&
                  "rotate(45deg) translate(-6px, -6px)",
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
});

export default AppNavbar;
