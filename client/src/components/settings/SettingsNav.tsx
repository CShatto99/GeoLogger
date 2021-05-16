import { FC } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SettingsNavContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.darkBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;

  & > * {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkBorder};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  & > *:first-child {
    color: rgba(0, 0, 0, 0.7);
  }

  & > *:last-child {
    border-bottom: none;
  }

  & > .active-tab {
    background-color: ${({ theme }) => theme.colors.light};
    border-left: 2px solid ${({ theme }) => theme.colors.primary};
  }

  & > .active-tab:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: ease-out 100ms;

  &:hover {
    transition ease-in 100ms;
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:last-child:hover {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

const paths = ['/settings/profile', '/settings/account', '/settings/appearance'];

const SettingsNav: FC = () => {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const getClassName = (index: number) => (pathname === paths[index] ? 'active-tab' : undefined);

  return (
    <div>
      <SettingsNavContainer>
        <div>Settings</div>
        <NavItem to={`${url}/profile`} className={getClassName(0)}>
          Profile
        </NavItem>
        <NavItem to={`${url}/account`} className={getClassName(1)}>
          Account
        </NavItem>
        <NavItem to={`${url}/appearance`} className={getClassName(2)}>
          Appearance
        </NavItem>
      </SettingsNavContainer>
    </div>
  );
};

export default SettingsNav;
