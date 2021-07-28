import { FC, useState } from 'react';
import { useHistory, Redirect } from 'react-router';
import styled from 'styled-components';
import { IoInformationCircle } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../store/index';
import { updateProfile } from '../../../store/profile';
import { updateUser, logout } from '../../../store/auth';
import Divider from '../../common/styles/Divider';
import { PasswordLabelStyle } from '../../auth/PasswordLabel';
import GLSpinner from '../../common/GLSpinner';
import { DangerLink } from '../../common/Links';
import MapType from '../../common/MapType';
import CardLabel from '../../common/CardLabel';
import Button from '../../common/Buttons';
import GLTooltip from '../../common/GLTooltip';
import colors from '../../../assets/json/colors.json';
import mapTypes from '../../../utils/getMapTypes';

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

  & > h3 {
    font-size: 2rem;
  }

  & > button {
    width: 100%;
  }
`;

const MapContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 2.5rem;

  & > div:first-child {
    grid-column: 1 / span 3;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;

    & > div:first-child {
      grid-column: 1 / span 2;
    }
  }
`;

export const SectionTitle = styled(PasswordLabelStyle)`
  & > div {
    width: fit-content;
    margin: 0 0 -4px 5px;
    font-size: 1.2rem;
  }
`;

export const ColorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  margin-bottom: 2.5rem;

  & > div:first-child {
    grid-column: 1 / span 6;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr 1fr 1fr;

    & > div:first-child {
      grid-column: 1 / span 4;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: 1fr 1fr;

    & > div:first-child {
      grid-column: 1 / span 2;
    }
  }
`;

export const ColorBox = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 0.3rem;
  cursor: pointer;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  transition: all ease-out 100ms;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CPDangerLink = styled(DangerLink)`
  display: grid;
  place-items: center;
  margin: 0;
`;

const CreateProfile: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const [step, setStep] = useState(1);
  const [mapStyle, setMapStyle] = useState('');
  const [fillColor, setFillColor] = useState('');

  const onSubmit = () => {
    const newProfile = {
      theme: 'light',
      mapStyle,
      fillColor,
    };

    dispatch(updateProfile({ ...profile, ...newProfile }));
    dispatch(updateUser({ ...user, ...{ profileSetUp: true } }));
    history.push('/map');
  };

  return loading ? (
    <GLSpinner />
  ) : user.profileSetUp ? (
    <Redirect to="/map" />
  ) : (
    <CreateProfileContainer>
      <CreateProfileContent>
        <h3>Please complete the following steps to finish setting up your account</h3>
        <Divider />

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
        )}
        {step === 2 && (
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
        )}
      </CreateProfileContent>
    </CreateProfileContainer>
  );
};

export default CreateProfile;
