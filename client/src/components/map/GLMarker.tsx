import { FC, useState, useCallback } from 'react';
import { Marker } from 'react-map-gl';
import styled from 'styled-components';
import { FcGlobe } from 'react-icons/fc';
import { MarkerType } from '../../store/types';

const MarkerIcon = styled(FcGlobe)`
  font-size: 2rem;

  & > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

type GLMarkerProps = {
  onClick: React.Dispatch<React.SetStateAction<MarkerType | null>>;
} & MarkerType;

const GLMarker: FC<GLMarkerProps> = ({ onClick, ...rest }: GLMarkerProps) => {
  const [marker, setMarker] = useState({
    latitude: rest.latitude,
    longitude: rest.longitude,
  });

  const onMarkerDragEnd = useCallback((event) => {
    setMarker({ longitude: event.lngLat[0], latitude: event.lngLat[1] });
  }, []);

  return (
    <Marker
      draggable
      longitude={marker.longitude}
      latitude={marker.latitude}
      offsetTop={-20}
      offsetLeft={-10}
      onDragEnd={onMarkerDragEnd}
    >
      <MarkerIcon onClick={() => onClick(rest)} />
    </Marker>
  );
};

export default GLMarker;
