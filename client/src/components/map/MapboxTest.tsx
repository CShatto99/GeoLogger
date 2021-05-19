import { FC, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import ReactMapGL from 'react-map-gl';
// import { useAppSelector } from '../../store';

type Viewport = {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

const MapboxTest: FC = () => {
  // const dispatch = useAppDispatch();
  // const { profile } = useAppSelector((state) => state.profile);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 40,
    longitude: -92,
    zoom: 3,
  });

  return (
    <ReactMapGL
      {...viewport}
      // mapStyle={`mapbox://styles/mapbox/${profile.mapStyle}`}
      onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //onClick={({ lngLat }) => markerMode && !modeJustChanged && addMarker(lngLat)}
    />
  );
};

export default MapboxTest;
