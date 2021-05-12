import { FC } from 'react';
import styled from 'styled-components';
import { BsCheckCircle } from 'react-icons/bs';

const MapTypeContainer = styled.div`
  & .map-active {
    transform: scale(1.05);
  }
`;

const MapTypeContent = styled.div`
  cursor: pointer;
  transition: all ease-out 100ms;
  max-width: 300px;

  &:hover {
    transition: all ease-in 100ms;
    transform: scale(1.05);
  }

  & > img {
    max-width: 300px;
    box-sizing: border-box;
  }
`;

const MapTypeLabel = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.3rem 0.3rem 0 0;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.2);
  padding: 0.2rem;
  margin-bottom: -20px;
  position: relative;

  & > svg {
    margin: 0 0 -1px 0.15rem;
    font-size: 0.9rem;
  }

  & > svg > path {
    fill: ${({ theme }) => theme.colors.success};
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
        <MapTypeLabel>
          {mapTitle} {selectedMapStyle === mapStyle && <BsCheckCircle />}
        </MapTypeLabel>
        <img src={image} alt={`mapbox ${selectedMapStyle} theme`} onClick={setSelectedMapStyle} />
      </MapTypeContent>
    </MapTypeContainer>
  );
};

export default MapType;
