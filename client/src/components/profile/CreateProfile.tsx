import { FC, useState } from 'react';
import { useHistory, Redirect } from 'react-router';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { IoInformationCircle } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { updateProfile } from '../../store/profile';
import { updateUser, logout } from '../../store/auth';
import { Divider } from '../settings/Account';
import { PasswordLabelStyle } from '../auth/PasswordLabel';
import GeoLoggerSpinner from '../layout/GeoLoggerSpinner';
import { DangerLink } from '../styles/Links';
import MapType from '../MapType';
import CardLabel from '../styles/CardLabel';
import Button from '../styles/Buttons';
import colors from '../../json/colors.json';
import darkV10 from '../../img/dark-v10.png';
import lightV10 from '../../img/light-v10.png';
import outdoorsV11 from '../../img/outdoors-v11.png';
import streetsV11 from '../../img/streets-v11.png';
import satelliteV9 from '../../img/satellite-v9.png';
import mapStyles from '../../utils/mapStyles';

const TOTAL_STEPS = 2;

const CreateProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;
  min-height: calc(100vh - 7.5rem);

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 6rem 1rem 1rem 1rem;
  }
`;

const CreateProfileContent = styled.div`
  max-width: 72rem;
  margin: 0 auto;

  & > button {
    width: 100%;
  }
`;

const MapContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 2.5rem;

  & > div:first-child {
    grid-column: 1 / span 5;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    & > div:first-child {
      grid-column: 1 / span 2;
    }

    & > div:last-child {
      grid-column: 1 / span 2;
      width: 50%;
      margin: 0 auto;
    }
  }
`;

export const SectionTitle = styled(PasswordLabelStyle)`
  & > svg {
    margin: 0 0 -4px 5px;
    font-size: 1.2rem;
  }
`;

export const ColorContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;

  & > div:first-child {
    width: 100%;
  }

  & > .item-active {
    transform: scale(1.05);
  }
`;

export const ColorBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 0.25rem;
  border-radius: 0.3rem;
  cursor: pointer;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  transition: all ease-out 100ms;
  box-sizing: border-box;

  &:hover {
    transition: all ease-in 100ms;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CPDangerLink = styled(DangerLink)`
  margin: 0;
`;

const CreateProfile: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [mapStyle, setMapStyle] = useState('');
  const [fillColor, setFillColor] = useState('');

  const onSubmit = () => {
    const profile = {
      theme: 'light',
      mapStyle,
      fillColor,
      visited: [],
      markers: [],
    };

    dispatch(updateProfile(profile));
    dispatch(updateUser({ ...user, ...{ profileSetUp: true } }));
    history.push('/map');
  };

  return loading ? (
    <GeoLoggerSpinner />
  ) : user.profileSetUp ? (
    <Redirect to="/map" />
  ) : (
    <CreateProfileContainer>
      <CreateProfileContent>
        <ButtonGroup>
          {step <= 1 ? (
            <CPDangerLink to="/register" onClick={() => dispatch(logout())}>
              Cancel
            </CPDangerLink>
          ) : (
            <Button disabled={step <= 1} onClick={() => setStep((prevStep) => prevStep - 1)}>
              Go Back
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button
              disabled={step >= 2 || (!mapStyle && !fillColor)}
              onClick={() => setStep((prevStep) => prevStep + 1)}
            >
              Next
            </Button>
          ) : (
            <Button onClick={onSubmit} disabled={!mapStyle || !fillColor}>
              Finish
            </Button>
          )}
        </ButtonGroup>
        {step === 1 && (
          <MapContent>
            <div>
              <h3>Choose a Map Style</h3>
              <Divider />
            </div>
            <MapType
              selectedMapStyle={mapStyle}
              setSelectedMapStyle={() => setMapStyle(mapStyles.dark)}
              mapTitle="Dark V10"
              image={darkV10}
            />
            <MapType
              selectedMapStyle={mapStyle}
              setSelectedMapStyle={() => setMapStyle(mapStyles.light)}
              mapTitle="Light V10"
              image={lightV10}
            />
            <MapType
              selectedMapStyle={mapStyle}
              setSelectedMapStyle={() => setMapStyle(mapStyles.outdoors)}
              mapTitle="Outdoors V11"
              image={outdoorsV11}
            />
            <MapType
              selectedMapStyle={mapStyle}
              setSelectedMapStyle={() => setMapStyle(mapStyles.streets)}
              mapTitle="Streets V11"
              image={streetsV11}
            />
            <MapType
              selectedMapStyle={mapStyle}
              setSelectedMapStyle={() => setMapStyle(mapStyles.satellite)}
              mapTitle="Satellite V9"
              image={satelliteV9}
            />
          </MapContent>
        )}
        {step === 2 && (
          <ColorContent>
            <div>
              <SectionTitle>
                <h3>Choose a Highlight Color</h3>
                <IoInformationCircle data-tip data-for="pass-info" />
                <ReactTooltip id="pass-info" aria-haspopup="true">
                  <small>This is the color your visited regions will be on your map.</small>
                </ReactTooltip>
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
        )}
      </CreateProfileContent>
    </CreateProfileContainer>
  );
};

export default CreateProfile;
