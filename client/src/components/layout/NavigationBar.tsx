import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import Brand from '../common/Brand';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth';
import GeneralLink from '../common/Links';

const NavbarContainer = styled.nav`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  background-color: rgba(14, 16, 18, 0.6);
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 1;
`;

const NavbarContents = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 1rem;

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

    & > a:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`;

const NavbarLink = styled(GeneralLink)`
  padding: 0.25rem 1rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0;
    padding: 0.75rem 0;
  }
`;

const NavbarRegister = styled(GeneralLink)`
  background-color: ${({ theme }) => theme.colors.primary};
  display: grid;
  place-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0.75rem 0;
    margin: 0;
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
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  min-width: 140px;
  border-radius: 0.3rem;
  transition: ease-out 100ms;
  right: 1.5rem;
  top: 3.1rem;

  & > a {
    color: ${({ theme }) => theme.colors.black};
    padding: 0.75rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: ease-out 100ms;
    cursor: pointer;
    border-radius: 0;
  }

  & > a:hover {
    transition: ease-in 100ms;
    background-color: #ddd;
    color: #2b6cb0;
  }

  & > a > span {
    margin-left: 0.5rem;
  }

  & > a:first-child:hover {
    border-radius: 0.3rem 0.3rem 0 0;
  }

  & > a:first-child > svg {
    font-size: 14px;
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }

  & > a:last-child {
    color: ${({ theme }) => theme.colors.danger};
  }

  & > a:last-child:hover {
    border-radius: 0 0 0.3rem 0.3rem;
  }

  & > a:last-child > svg {
    margin: 0.05rem -0.1rem 0 0.1rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: 11rem 0 0 0;
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

const NavigationBar: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const [navIcon, setNavIcon] = useState('nav-items-hide');

  const isAuthPage = () => location.pathname === '/login' || location.pathname === '/register';

  const guestLinks = (
    <>
      <NavbarLink to="/" onClick={() => setNavIcon('nav-items-hide')}>
        Home
      </NavbarLink>
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
      <NavbarLink to="/explore" onClick={() => setNavIcon('nav-items-hide')}>
        Explore
      </NavbarLink>
      <NavbarLink to="/map" onClick={() => setNavIcon('nav-items-hide')}>
        Map
      </NavbarLink>
      <DropdownToggler to={location.pathname}>Profile</DropdownToggler>
      <DropdownContent>
        <Link to={`/profile/${user.username}`} onClick={() => setNavIcon('nav-items-hide')}>
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

  return isAuthPage() ? null : (
    <NavbarContainer>
      <NavbarContents>
        <Brand />
        <NavbarLinks className={navIcon}>{isAuth ? userLinks : guestLinks}</NavbarLinks>
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

export default NavigationBar;
