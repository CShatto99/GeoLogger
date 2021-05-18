import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { IoInformationCircle } from 'react-icons/io5';
import { useAppDispatch } from '../../store';
import { updateProfile } from '../../store/profile';
import { Divider } from './Account';
import MapType from '../MapType';
import { Profile } from '../../store/types';
import Button from '../styles/Buttons';
import { DefaultLinkHTML } from '../styles/Links';
import { AuthInput } from '../styles/Inputs';
import { ColorContent as OldColorContent, ColorBox, SectionTitle } from '../profile/CreateProfile';
import colors from '../../json/colors.json';
import darkV10 from '../../img/dark-v10.png';
import lightV10 from '../../img/light-v10.png';
import outdoorsV11 from '../../img/outdoors-v11.png';
import streetsV11 from '../../img/streets-v11.png';
import satelliteV9 from '../../img/satellite-v9.png';
import CardLabel from '../styles/CardLabel';

const TitleSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SiteTheme = styled.div`
  margin-bottom: 2.5rem;

  & > h2 {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const Themes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;

  & > div {
    transition: all 100ms ease-out;
  }

  & > div:hover {
    transform: scale(1.05);
    transition: all 100ms ease-in;
  }

  & > div > div {
    border-radius: 0.3rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

const MapStyle = styled.div`
  margin-bottom: 2.5rem;
`;

const MapContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 2.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    & > div:last-child {
      grid-column: 1 / span 2;
      width: 50%;
      margin: 0 auto;
    }
  }
`;

const ColorContent = styled(OldColorContent)`
  justify-content: start;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
  }
`;

const HighlightColor = styled.div`
  margin-bottom: 2.5rem;
`;

const HexInput = styled.div`
  display: flex;
  align-items: center;

  & > label {
    margin-right: 0.25rem;
  }
`;

type AppearanceProps = {
  profile: Profile;
};

const Appearance: FC<AppearanceProps> = ({ profile }: AppearanceProps) => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState(profile.theme);
  const [mapStyle, setMapStyle] = useState(profile.mapStyle);
  const [fillColor, setFillColor] = useState(profile.fillColor);
  const [settingsChanged, setSettingsChanged] = useState(false);

  useEffect(() => {
    (mapStyle !== profile.mapStyle || fillColor !== profile.fillColor) && setSettingsChanged(true);
  }, [mapStyle, fillColor]);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateProfile({ ...profile, ...{ mapStyle, fillColor } }));

    setSettingsChanged(false);
  };

  console.log(theme, setTheme);

  return (
    <>
      <TitleSection>
        <h1>Appearance</h1>
        {settingsChanged && <Button onClick={onSubmit}>Apply</Button>}
      </TitleSection>
      <SiteTheme>
        <h3>Site Theme</h3>
        <Divider />
        <Themes>
          <CardLabel onClick={() => setTheme('light')} label="Light" active={theme === 'light'} />
          <CardLabel onClick={() => setTheme('dark')} label="Dark" active={theme === 'dark'} />
          {/* <CardLabel onClick={() => setTheme('sync')} label="Sync" active={theme === 'sync'} /> */}
        </Themes>
      </SiteTheme>
      <MapStyle>
        <h3>Map Style</h3>
        <Divider />
        <MapContent>
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle('dark-v10')}
            mapTitle="Dark V10"
            image={darkV10}
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle('light-v10')}
            mapTitle="Light V10"
            image={lightV10}
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle('outdoors-v11')}
            mapTitle="Outdoors V11"
            image={outdoorsV11}
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle('streets-v11')}
            mapTitle="Streets V11"
            image={streetsV11}
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle('satellite-v9')}
            mapTitle="Satellite V9"
            image={satelliteV9}
          />
        </MapContent>
      </MapStyle>
      <HighlightColor>
        <ColorContent>
          <SectionTitle>
            <h3>Highlight Color</h3>
            <IoInformationCircle data-tip data-for="pass-info" />
            <ReactTooltip id="pass-info" aria-haspopup="true">
              <small>This is the color your visited regions will be on your map.</small>
            </ReactTooltip>
          </SectionTitle>
          <Divider />
          {colors.map(({ name, hex }) => (
            <ColorBox
              key={hex}
              onClick={() => setFillColor(hex)}
              style={{
                backgroundColor: hex,
              }}
            >
              <CardLabel label={name} active={fillColor === hex} />
            </ColorBox>
          ))}
        </ColorContent>
        <p style={{ marginBottom: '0.5rem' }}>
          Not seeing your favorite color? Click{' '}
          <DefaultLinkHTML href="https://htmlcolorcodes.com/color-picker/" target="_blank" rel="noopener noreferrer">
            here
          </DefaultLinkHTML>{' '}
          for hex color codes and enter the 6-digit hex code below:
        </p>
        <HexInput>
          <label>#</label>
          <AuthInput
            type="text"
            value={fillColor.slice(1, fillColor.length)}
            onChange={(e) => setFillColor('#' + e.target.value)}
          />
        </HexInput>
      </HighlightColor>
    </>
  );
};

export default Appearance;
