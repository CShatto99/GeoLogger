import { FC } from 'react';
import styled from 'styled-components';
import darkV10 from '../../img/dark-v10.png';
import lightV10 from '../../img/light-v10.png';
import outdoorsV11 from '../../img/outdoors-v11.png';
import streetsV11 from '../../img/streets-v11.png';
import satelliteV9 from '../../img/satellite-v9.png';
// import Button from '../styles/Buttons';

const CreateProfileContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;
`;

const CreateProfileContent = styled.div`
  max-width: 72rem;
  margin: 0 auto;
`;

const MapContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  text-align: center;

  & > h1 {
    margin: 0;
    grid-column: 1 / span 2;
  }

  & > div:last-child {
    grid-column: 1 / span 2;
    width: 50%;
    margin: 0 auto;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 1rem;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: 1fr;

    & > div:last-child,
    h1 {
      grid-column: 1 / 1;
      width: 100%;
    }
  }
`;

const MapStyleContainer = styled.div`
  & > h3 {
    margin-top: 0.5rem;
  }
`;

const CreateProfile: FC = () => {
  return (
    <CreateProfileContainer>
      <CreateProfileContent>
        <h3>Please complete the following steps to set up your profile.</h3>
        <br />
        <p>Choose a map style:</p>
        <MapContent>
          <MapStyleContainer>
            <img src={darkV10} alt="mapbox dark-v10 theme" />
            <h3>Dark V10</h3>
          </MapStyleContainer>
          <MapStyleContainer>
            <img src={lightV10} alt="mapbox light-v10 theme" />
            <h3>Light V10</h3>
          </MapStyleContainer>
          <MapStyleContainer>
            <img src={outdoorsV11} alt="mapbox outdoors-v11 theme" />
            <h3>Outdoors V11</h3>
          </MapStyleContainer>
          <MapStyleContainer>
            <img src={streetsV11} alt="mapbox streets-v11 theme" />
            <h3>Streets V11</h3>
          </MapStyleContainer>
          <MapStyleContainer className="md:col-span-2 sm:col-span-1">
            <img src={satelliteV9} alt="mapbox satellite-v9 theme" />
            <h3>Satellite V9</h3>
          </MapStyleContainer>
        </MapContent>
      </CreateProfileContent>
    </CreateProfileContainer>
  );
};

export default CreateProfile;
