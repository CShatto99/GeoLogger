import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth';
import '../../css/navbar.css';

const AppNavbar: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const [navIcon, setNavIcon] = useState('nav-items-hide');
  const [navLinkCol, setNavLinkCol] = useState('');

  useEffect(() => {
    if (JSON.stringify(profile) === '{}') setNavLinkCol('text-gray-400');
    else
      profile.mapStyle === 'dark-v10' || profile.mapStyle === 'satellite-v9' || location.pathname === '/'
        ? setNavLinkCol('text-gray-400')
        : setNavLinkCol('text-gray-900');
  }, [profile, location.pathname]);

  const guestLinks = (
    <>
      <div>
        {' '}
        {/*Needs to be styled */}
        <Link
          to="/login"
          className="nav-link text-gray-400 hover:text-gray-200"
          onClick={() => setNavIcon('nav-items-hide')}
        >
          Login
        </Link>
      </div>
      <div>
        {' '}
        {/*Needs to be styled */}
        <Link
          to="/register"
          className="nav-link reg-btn hover:bg-blue-800"
          onClick={() => setNavIcon('nav-items-hide')}
        >
          Register
        </Link>
      </div>
    </>
  );

  const userLinks = (
    <>
      <div>
        {' '}
        {/*Needs to be styled */}
        <Link
          to="/map"
          className={`nav-link ${navLinkCol} hover:text-gray-200`}
          onClick={() => setNavIcon('nav-items-hide')}
        >
          Map
        </Link>
      </div>
      <div>
        {' '}
        {/*Needs to be styled */}
        <div className="dropdown">
          <div className={`nav-link ${navLinkCol} hover:text-gray-200`}>Profile</div>
          <div className="dropdown-content">
            <Link to="/settings" onClick={() => setNavIcon('nav-items-hide')}>
              Settings
            </Link>
            <a
              onClick={() => {
                setNavIcon('nav-items-hide');
                dispatch(logout());
              }}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
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
          <div>
            {' '}
            {/*Needs to be styled */}
            <Link
              to="/"
              className={`nav-link ${navLinkCol} hover:text-gray-200`}
              onClick={() => setNavIcon('nav-items-hide')}
            >
              Home
            </Link>
          </div>
          {isAuth ? userLinks : guestLinks}
        </ul>
        <div
          className="nav-hamburger"
          onClick={() => {
            navIcon === 'nav-items-hide' ? setNavIcon('nav-items-show') : setNavIcon('nav-items-hide');
          }}
        >
          <div className="nav-hamburger-content">
            <div
              className="bar1"
              style={{
                transform: navIcon === 'nav-items-show' ? 'rotate(-45deg) translate(-3px, 6px)' : 'undefined',
              }}
            />
            <div
              className="bar2"
              style={{
                opacity: navIcon === 'nav-items-show' ? '0' : 'undefined',
              }}
            />
            <div
              className="bar3"
              style={{
                transform: navIcon === 'nav-items-show' ? 'rotate(45deg) translate(-5px, -8px)' : 'undefined',
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppNavbar;
