import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoInformationCircle } from 'react-icons/io5';
import { useAppDispatch } from '../../../store';
import { updateProfile } from '../../../store/profile';
import { Profile } from '../../../store/types';
import { ColorContent as OldColorContent, ColorBox, SectionTitle } from '../../profile/createProfile/CreateProfile';
import Divider from '../../common/styles/Divider';
import MapType from '../../common/MapType';
import Button from '../../common/Buttons';
import { DefaultLinkHTML } from '../../common/Links';
import { AuthInput } from '../../common/Inputs';
import CardLabel from '../../common/CardLabel';
import GLTooltip from '../../common/GLTooltip';
import colors from '../../../assets/json/colors.json';
import mapTypes from '../../../utils/getMapTypes';

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
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 2.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ColorContent = styled(OldColorContent)`
  margin-bottom: 1rem;
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
    (theme !== profile.theme || mapStyle !== profile.mapStyle || fillColor !== profile.fillColor) &&
      setSettingsChanged(true);
  }, [mapStyle, fillColor]);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateProfile({ ...profile, ...{ theme, mapStyle, fillColor } }));

    setSettingsChanged(false);
  };

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
          {/* <CardLabel onClick={() => setTheme('dark')} label="Dark" active={theme === 'dark'} /> */}
          {/* <CardLabel onClick={() => setTheme('sync')} label="Sync" active={theme === 'sync'} /> */}
        </Themes>
      </SiteTheme>
      <MapStyle>
        <h3>Map Style</h3>
        <Divider />
        <MapContent>
          {mapTypes.map((mapType) => (
            <MapType
              key={mapType.style}
              selectedMapStyle={mapStyle}
              setSelectedMapStyle={() => setMapStyle(mapType.style)}
              mapTitle={mapType.title}
              image={mapType.image}
              demo={mapType.demo}
            />
          ))}
        </MapContent>
      </MapStyle>
      <HighlightColor>
        <ColorContent>
          <div>
            <SectionTitle>
              <h3>Highlight Color</h3>
              <GLTooltip content="This is the color your visited regions will be on your map">
                <IoInformationCircle />
              </GLTooltip>
            </SectionTitle>
            <Divider />
          </div>

          {colors.map(({ name, hex }) => (
            <ColorBox
              key={hex}
              className={fillColor === hex ? 'item-active' : undefined}
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
            maxLength={6}
            onChange={(e) => setFillColor('#' + e.target.value)}
          />
        </HexInput>
      </HighlightColor>
    </>
  );
};

export default Appearance;
