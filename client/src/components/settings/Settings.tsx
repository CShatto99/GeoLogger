import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import SettingsNav from './SettingsNav';
import Profile from './Profile';
import Account from './Account';
import Appearance from './Appearance';

const SettingsContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;
`;

const SettingsContent = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  & > * {
    height: auto;
  }
`;

const SettingsTabContent = styled.div``;

const Settings: FC = () => {
  const { url } = useRouteMatch();

  return (
    <SettingsContainer>
      <SettingsContent>
        <SettingsNav />
        <SettingsTabContent>
          <Route path={`${url}/profile`}>
            <Profile />
          </Route>
          <Route path={`${url}/account`}>
            <Account />
          </Route>
          <Route path={`${url}/appearance`}>
            <Appearance />
          </Route>
        </SettingsTabContent>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;
