import { FC } from 'react';
import styled from 'styled-components';
import Landing from './sections/Landing';
import TrackVacations from './sections/TrackVacations';
import CreateMarkers from './sections/CreateMarkers';
import CustomizeMap from './sections/CustomizeMap';

const HomeContainer = styled.div`
  & p {
    line-height: 1.5;
  }
`;

const NewHome: FC = () => {
  return (
    <HomeContainer>
      <Landing />
      <TrackVacations />
      <CreateMarkers />
      <CustomizeMap />
    </HomeContainer>
  );
};

export default NewHome;
