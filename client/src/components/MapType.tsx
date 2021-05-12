import { FC } from 'react';
import styled from 'styled-components';

const MapTypeContainer = styled.div`
  z-index: 0;

  & > img {
    max-width: 300px;
  }

  & > h3 {
    margin-top: 0.5rem;
  }
`;

const MapTypeLabel = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.3rem 0;
  padding: 0.2rem;
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
    <>
      <MapTypeContainer onClick={setSelectedMapStyle}>
        <img
          className={selectedMapStyle === mapStyle ? 'cust-img-active' : 'cust-img'}
          src={image}
          alt={`mapbox ${selectedMapStyle} theme`}
          onClick={setSelectedMapStyle}
        />
      </MapTypeContainer>
      <MapTypeLabel>
        <h3>Dark V10</h3>
      </MapTypeLabel>
    </>
  );
};

export default MapType;
