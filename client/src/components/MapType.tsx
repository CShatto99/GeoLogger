import { FC } from 'react';
import styled from 'styled-components';
import { RiShareForwardBoxLine } from 'react-icons/ri';
import CardLabel from './styles/CardLabel';
import ReactTooltip from 'react-tooltip';

const MapTypeContainer = styled.div`
  & > .map-active {
    position: relative;
  }

  & > .map-active > div:last-child {
    z-index: 2;
  }
`;

const MapTypeContent = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  transition: all ease-out 100ms;
  z-index: 2;

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
    box-sizing: border-box;
    z-index: 0;
  }
`;

const ViewEx = styled.a`
  position: absolute;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0.2rem;
  right: 0;
  bottom: 3px;
  border-bottom-right-radius: 0.3rem;
`;

type MapTypeProps = {
  selectedMapStyle: string;
  setSelectedMapStyle?: () => void;
  mapTitle: string;
  image: string;
  demo?: string;
};

const MapType: FC<MapTypeProps> = ({ selectedMapStyle, setSelectedMapStyle, mapTitle, image, demo }: MapTypeProps) => {
  const mapStyle = mapTitle.replaceAll(' ', '-').toLowerCase();

  return (
    <MapTypeContainer>
      <MapTypeContent
        onClick={setSelectedMapStyle}
        className={selectedMapStyle === mapStyle ? 'map-active' : undefined}
      >
        <CardLabel label={mapTitle} active={selectedMapStyle === mapStyle} />
        <img src={image} alt={`mapbox ${selectedMapStyle} theme`} onClick={setSelectedMapStyle} />
        <ViewEx data-tip data-for={mapStyle} href={demo} target="_blank" rel="noopener noreferrer">
          <RiShareForwardBoxLine />
        </ViewEx>
        <ReactTooltip id={mapStyle} aria-haspopup="true">
          <small>View {mapTitle} demo.</small>
        </ReactTooltip>
      </MapTypeContent>
    </MapTypeContainer>
  );
};

export default MapType;
