import { FC, useState, useCallback } from 'react';
import { Marker } from 'react-map-gl';
import { FcGlobe } from 'react-icons/fc';

const GeoLoggerMarker: FC = () => {
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
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
      <FcGlobe size="2rem" />
    </Marker>
  );
};

export default GeoLoggerMarker;
