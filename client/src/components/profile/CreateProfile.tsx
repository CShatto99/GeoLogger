import { FC, useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { IoInformationCircle } from 'react-icons/io5';
import { BsCheckCircle } from 'react-icons/bs';
import { Divider } from '../settings/Account';
import { PasswordLabelStyle } from '../auth/PasswordLabel';
import MapType from '../MapType';
import colors from '../../json/colors.json';
import darkV10 from '../../img/dark-v10.png';
import lightV10 from '../../img/light-v10.png';
import outdoorsV11 from '../../img/outdoors-v11.png';
import streetsV11 from '../../img/streets-v11.png';
import satelliteV9 from '../../img/satellite-v9.png';

import Button from '../styles/Buttons';

const CreateProfileContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;
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
  text-align: center;

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

const SectionTitle = styled(PasswordLabelStyle)`
  & > svg {
    margin: 0 0 -4px 5px;
    font-size: 1.2rem;
  }
`;

const ColorContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;

  & > p {
    width: 100%;
  }

  & .cb-active {
    transform: scale(1.05);
    border: 2px solid ${({ theme }) => theme.colors.success};
  }
`;

const ColorBox = styled.div`
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
    transform: scale(1.05);
  }
`;

const ColorBlockLabel = styled.div`
  height: 1.2rem;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius 0.3rem 0.3rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.2);

  & > svg {
    margin: 0 0 -1px 0.15rem;
    font-size: 0.9rem;
  }

  & > svg > path {
    fill: ${({ theme }) => theme.colors.success};
  }
`;

const CreateProfile: FC = () => {
  const [mapStyle, setMapStyle] = useState('');
  const [fillColor, setFillColor] = useState('');
  const [colorIndex, setColorIndex] = useState(-1);

  const onSubmit = () => {
    console.log({ fillColor, colorIndex });
  };

  console.log(fillColor, mapStyle);

  return (
    <CreateProfileContainer>
      <CreateProfileContent>
        {/* <h3>Please complete the following steps to set up your profile.</h3> */}
        <h3>Choose a Map Style</h3>
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
        <SectionTitle>
          <h3>Choose a Highlight Color</h3>
          <IoInformationCircle data-tip data-for="pass-info" />
          <ReactTooltip id="pass-info" aria-haspopup="true">
            <small>This is the color your visited regions will be on your map.</small>
          </ReactTooltip>
        </SectionTitle>
        <Divider />
        <ColorContent>
          {colors.map(({ name, hex }, index) => (
            <ColorBox
              key={hex}
              className={colorIndex === index ? 'cb-active' : undefined}
              onClick={() => {
                setFillColor(hex);
                setColorIndex(index);
              }}
              style={{
                backgroundColor: hex,
              }}
            >
              <ColorBlockLabel>
                {name} {colorIndex === index && <BsCheckCircle />}
              </ColorBlockLabel>
            </ColorBox>
          ))}
        </ColorContent>
        <Button text="Finish" onClick={onSubmit} disabled={!mapStyle || !fillColor} />
      </CreateProfileContent>
    </CreateProfileContainer>
  );
};

export default CreateProfile;
