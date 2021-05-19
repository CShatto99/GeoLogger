import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import usa from '../json/US.json';
import darkV10 from '../img/dark-v10.png';
import lightV10 from '../img/light-v10.png';
import outdoorsV11 from '../img/outdoors-v11.png';
import streetsV11 from '../img/streets-v11.png';
import satelliteV9 from '../img/satellite-v9.png';
import vacaEx from '../img/vaca-ex.png';
import GeneralLink from './styles/Links';

const HomePage = styled.div`
  & img {
    transition: ease-out 100ms;
  }

  & img:hover {
    transform: scale(1.01);
    transition: ease-in 100ms;
  }
`;

const LandingSection = styled.div`
  background-image: url(${satelliteV9});
  background-size: cover;
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const LandingContent = styled.div`
  max-width: 72rem;
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  & > h1 {
    margin-bottom: 0;
  }

  & > p {
    font-weight: ${({ theme }) => theme.fontWeights.light};
    margin: 0.5rem 0 2rem 0;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 1rem;
  }
`;

const LandingLink = styled(GeneralLink)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  padding: 0.5rem 1rem;
  margin: 0;
  font-size: 1.1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
  }
`;

const MapSection = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  display: grid;
  place-items: center;
`;

const MapContent = styled.div`
  max-width: 72rem;
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
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
    padding: 1rem;
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

const LoggingSection = styled.div`
  display: grid;
  place-items: center;
`;

const LoggingContent = styled.div`
  max-width: 72rem;
  text-align: center;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;

  & > h1 {
    color: ${({ theme }) => theme.colors.white};
    margin: 0;
    grid-column: 1 / span 2;
  }

  & > div:not(:last-child) {
    display: grid;
    place-items: center;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 1em;

    & > div {
      grid-column: 1 / span 2;
    }
  }
`;

const ModalProp = styled.div`
  border-radius: 0.5rem;
  background-color: #e2e8f0;
  padding: 1rem;

  & > div {
    border: none;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
  }

  & > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  & > div > span {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }

  & > div > span:nth-child(2) {
    color: ${({ theme }) => theme.colors.success};
  }
`;

const modalDemo: React.ReactElement[] = [];

for (let i = 0; i < 10; i++) {
  modalDemo.push(
    <div key={usa[i].name} id={usa[i].name}>
      <span>{usa[i].name}</span>
      {Math.random() > 0.6 && <span>VISITED</span>}
    </div>,
  );
}

const Home: FC = () => {
  const [landingDiv, setLandingDiv] = useState(false);

  useEffect(() => {
    setLandingDiv(!landingDiv);
  }, []);

  return (
    <HomePage>
      <LandingSection>
        <LandingContent>
          <h1>Welcome To GeoLogger</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames.
          </p>
          <LandingLink to="/register">Start Logging</LandingLink>
        </LandingContent>
      </LandingSection>
      <MapSection>
        <MapContent>
          <h1>Customize Your Map Style</h1>
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
      </MapSection>
      <LoggingSection>
        <LoggingContent>
          <h1>Log Your Vacation History</h1>
          <div>
            <img className="home-img" src={vacaEx} alt="mapbox outdoors-v11 theme" />
          </div>
          <ModalProp>{modalDemo}</ModalProp>
        </LoggingContent>
      </LoggingSection>
    </HomePage>
  );
};

export default Home;
