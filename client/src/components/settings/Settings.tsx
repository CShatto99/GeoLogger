import { FC } from 'react';
import styled from 'styled-components';
import PrivateRoute from '../routing/PrivateRoute';
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
  return (
    <SettingsContainer>
      <SettingsContent>
        <SettingsNav />
        <SettingsTabContent>
          <PrivateRoute exact path="/settings/profile" component={Profile} />
          <PrivateRoute exact path="/settings/account" component={Account} />
          <PrivateRoute exact path="/settings/appearance" component={Appearance} />
        </SettingsTabContent>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;
