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

const GeoLoggerMarker: FC<MarkerType> = ({ latitude, longitude }: MarkerType) => {
  const [marker, setMarker] = useState({
    latitude,
    longitude,
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
      <MarkerIcon />
    </Marker>
  );
};

export default GeoLoggerMarker;
