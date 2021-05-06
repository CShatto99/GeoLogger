import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const SettingsNav: FC = () => {
  // const [tab, setTab] = useState('/settings/profile');

  const location = useLocation();

  console.log(location.pathname);

  return (
    <div>
      <SettingsNavContainer>
        <div>Settings</div>
        <NavItem to="/settings/profile">Profile</NavItem>
        <NavItem to="/settings/account">Account</NavItem>
        <NavItem to="/settings/appearance">Appearance</NavItem>
      </SettingsNavContainer>
    </div>
  );
};

export default SettingsNav;
