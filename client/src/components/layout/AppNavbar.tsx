import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import Brand from './Brand';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth';
import GeneralLink from '../styles/Links';

const NavbarContainer = styled.nav`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  background-color: rgba(14, 16, 18, 0.6);
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 10;
`;

const NavbarContents = styled.div`
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
    padding: 5.5rem 1rem 1rem 1rem;
    background-color: ${({ theme }) => theme.colors.black};
    z-index: -1;
  }
`;

const NavbarLink = styled(GeneralLink)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 0 0.5rem 0;
  }
`;

const NavbarRegister = styled(GeneralLink)`
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

const DropdownContent = styled.div`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 140px;
  margin: 1.5rem 0 0 6.5rem;
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

  & > a:first-child > svg {
    font-size: 14px;
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }

  & > a:last-child {
    color: ${({ theme }) => theme.colors.danger};
  }

  & > a:last-child > svg {
    margin: 0.05rem -0.1rem 0 0.1rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    position: absolute;
    margin: 5.5rem 0 0 0;
    right: 4.5rem;
    left: 4.5rem;
  }
`;

const DropdownToggler = styled(NavbarLink)`
  &:hover + div,
  & + div:hover {
    visibility: visible;
    opacity: 1;
    max-height: 500px;
    transition: ease-in 100ms;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0;
  }
`;

const AppNavbar: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  // const { profile } = useAppSelector((state) => state.profile);
  const [navIcon, setNavIcon] = useState('nav-items-hide');

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
      <DropdownToggler to={location.pathname}>Profile</DropdownToggler>
      <DropdownContent>
        <Link to="/profile" onClick={() => setNavIcon('nav-items-hide')}>
          <VscAccount />
          <span>Profile</span>
        </Link>
        <Link to="/settings/profile" onClick={() => setNavIcon('nav-items-hide')}>
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
    </>
  );

  return (
    <NavbarContainer>
      <NavbarContents>
        <Brand />
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
