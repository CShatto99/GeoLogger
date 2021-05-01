import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth';

const NavbarContainer = styled.nav`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  background-color: rgba(14, 16, 18, 0.6);
  backdrop-filter: blur(10px);
  position: fixed;
  z-index: 100;
`;

const NavbarContents = styled.div`
  max-width: 72rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & .nav-items-hide {
      margin-top: -100%;
      transition: ease-out 200ms;
    }
  }
`;

const NavbarBrand = styled.div`
  display: flex;
  align-items: center;

  & .fa-globe {
    position: relative;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem;
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.black};
  }

  & div {
    background-color: green;
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    height: 80%;
    width: 100%;
    border-radius: 50%;
  }

  & > h2 {
    margin-left: 1rem;
    font-size: 1.875rem;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;

const NavbarLinks = styled.ul`
  display: flex;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    transition: ease-out 200ms;
    position: absolute;
    flex-direction: column;
    height: auto;
    top: 0;
    right: 0;
    left: 0;
    padding: 1.5rem;
    margin-top: 4.5rem;
    background-color: ${({ theme }) => theme.colors.black};
    z-index: 10;
  }
`;

const NavbarLink = styled(Link)`
  color: #edf2f7;
  border-radius: 0.3rem;
  margin-left: 0.5rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
  transition: ease-out 100ms;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    transition: ease-in 100ms;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 0 0.5rem 0;
  }
`;

const NavbarRegister = styled(NavbarLink)`
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
  }
`;

const NavbarToggler = styled.div`
  display: none;
  margin: 0;
  cursor: pointer;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    border-radius: 0.3rem;

    & > div {
      width: 30px;
      height: 2px;
      background-color: white;
      border-radius: 0.3rem;
      transition: ease-out 100ms;
    }

    & > div:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;

const Dropdown = styled.div`
  & .dropdown {
    visibility: visible;
    opacity: 1;
    max-height: 500px;
    transition: ease-in 100ms;
  }
`;

const DropdownContent = styled.div`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  background-color: #edf2f7;
  min-width: 140px;
  margin: 2rem 0 0 -9.5rem;
  border-radius: 4px;
  transition: ease-out 100ms;

  & > a {
    color: ${({ theme }) => theme.colors.black};
    padding: 0.75rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: ease-out 100ms;
    cursor: pointer;
    border-radius: 4px;
  }

  & > a:hover {
    transition: ease-in 100ms;
    background-color: #ddd;
    color: #2b6cb0;
  }

  & > a > span {
    margin-left: 0.5rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    position: absolute;
    margin: 0;
    right: 4.5rem;
    left: 4.5rem;
  }
`;

const AppNavbar: FC = () => {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  // const { profile } = useAppSelector((state) => state.profile);
  const [navIcon, setNavIcon] = useState('nav-items-hide');
  const [dropdownOpen, setDropdownOpen] = useState('dropdown-closed');

  // useEffect(() => {
  // }, [profile, location.pathname]);

  const guestLinks = (
    <>
      <NavbarLink to="/login" onClick={() => setNavIcon('nav-items-hide')}>
        Login
      </NavbarLink>
      <NavbarRegister to="/register" onClick={() => setNavIcon('nav-items-hide')}>
        Register
      </NavbarRegister>
    </>
  );

  const userLinks = (
    <>
      <NavbarLink to="/map" onClick={() => setNavIcon('nav-items-hide')}>
        Map
      </NavbarLink>
      <NavbarLink
        to="/"
        onClick={() => (dropdownOpen === 'dropdown' ? setDropdownOpen('dropdown-closed') : setDropdownOpen('dropdown'))}
      >
        Profile
      </NavbarLink>
      <Dropdown>
        <DropdownContent className={dropdownOpen}>
          <Link to="/settings" onClick={() => setNavIcon('nav-items-hide')}>
            <IoSettingsOutline />
            <span>Settings</span>
          </Link>
          <a
            onClick={() => {
              setNavIcon('nav-items-hide');
              dispatch(logout());
            }}
          >
            <IoLogOutOutline />
            <span>Logout</span>
          </a>
        </DropdownContent>
      </Dropdown>
    </>
  );

  return (
    <NavbarContainer>
      <NavbarContents>
        <NavbarBrand>
          <i className="fa fa-globe" aria-hidden="true">
            <div />
          </i>
          <h2>GeoLogger</h2>
        </NavbarBrand>
        <NavbarLinks className={navIcon}>
          <NavbarLink to="/" onClick={() => setNavIcon('nav-items-hide')}>
            Home
          </NavbarLink>
          {isAuth ? userLinks : guestLinks}
        </NavbarLinks>
        <NavbarToggler
          onClick={() => {
            navIcon === 'nav-items-hide' ? setNavIcon('nav-items') : setNavIcon('nav-items-hide');
          }}
        >
          <div
            style={{
              transform: navIcon === 'nav-items' ? 'rotate(45deg) translate(6px, 5px)' : '',
            }}
          />
          <div
            style={{
              opacity: navIcon === 'nav-items' ? '0' : '',
            }}
          />
          <div
            style={{
              transform: navIcon === 'nav-items' ? 'rotate(-45deg) translate(5px, -4px)' : '',
            }}
          />
        </NavbarToggler>
      </NavbarContents>
    </NavbarContainer>
  );
};

export default AppNavbar;
