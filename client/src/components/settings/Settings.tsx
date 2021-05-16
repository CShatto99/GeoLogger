import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import SettingsNav from './SettingsNav';
import ProfileInfo from './ProfileInfo';
import Account from './Account';
import Appearance from './Appearance';
import { useAppSelector } from '../../store';
import GeoLoggerSpinner from '../layout/GeoLoggerSpinner';

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
  const { profile, loading } = useAppSelector((state) => state.profile);

  return loading ? (
    <GeoLoggerSpinner />
  ) : (
    <SettingsContainer>
      <SettingsContent>
        <SettingsNav />
        <SettingsTabContent>
          <Route path={`${url}/profile`}>
            <ProfileInfo profile={profile} />
          </Route>
          <Route path={`${url}/account`}>
            <Account />
          </Route>
          <Route path={`${url}/appearance`}>
            <Appearance profile={profile} />
          </Route>
        </SettingsTabContent>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;
