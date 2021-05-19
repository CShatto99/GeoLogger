import { FC } from 'react';
import styled from 'styled-components';
import CardLabel from './styles/CardLabel';

const MapTypeContainer = styled.div`
  & > .map-active {
    transform: scale(1.05);
  }
`;

const MapTypeContent = styled.div`
  cursor: pointer;
  max-width: 300px;
  transition: all ease-out 100ms;

  &:hover {
    transition: all ease-in 100ms;
  }

  & > div:first-child {
    position: relative;
    z-index: 2;
    margin-bottom: -1.5rem;
    text-overflow: clip;
  }

  & > img {
    position: relative;
    max-width: 300px;
    box-sizing: border-box;
    z-index: 1;
  }
`;

type MapTypeProps = {
  selectedMapStyle: string;
  setSelectedMapStyle?: () => void;
  mapTitle: string;
  image: string;
};

const MapType: FC<MapTypeProps> = ({ selectedMapStyle, setSelectedMapStyle, mapTitle, image }: MapTypeProps) => {
  const mapStyle = mapTitle.replace(' ', '-').toLowerCase();

  return (
    <MapTypeContainer>
      <MapTypeContent
        onClick={setSelectedMapStyle}
        className={selectedMapStyle === mapStyle ? 'map-active' : undefined}
      >
        <CardLabel label={mapTitle} active={selectedMapStyle === mapStyle} />
        <img src={image} alt={`mapbox ${selectedMapStyle} theme`} onClick={setSelectedMapStyle} />
      </MapTypeContent>
    </MapTypeContainer>
  );
};

export default MapType;
