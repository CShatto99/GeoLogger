import { FC, useState, useEffect, memo } from 'react';
import ReactMapGL, { Layer, Popup, Source, ViewportProps } from 'react-map-gl';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateMapActionStatus, updateProfile } from '../../store/profile';
import geoJSON from '../../json/geoJSON.json';
import GeoLoggerSpinner from '../layout/GeoLoggerSpinner';
import useWindowDimensions from '../../hooks/windowDimensions';
import MapActions from './mapActions/MapActions';
import Markers from './Markers';
// import MarkerPopup from './MarkerPopup';
import { MarkerType } from '../../store/types';
import MarkerPopup from './MarkerPopup';

const MapContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
`;

const Mapbox: FC = () => {
  const dispatch = useAppDispatch();
  const { profile, actionsStatus, loading } = useAppSelector((state) => state.profile);
  const { width, height } = useWindowDimensions();
  const [popupInfo, setPopupInfo] = useState<MarkerType | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [sources, setSources] = useState<React.ReactElement[]>([]);
  const [viewport, setViewport] = useState<ViewportProps>({
    width: width,
    height: height,
    latitude: 40,
    longitude: -92,
    zoom: 3,
    bearing: 0,
    pitch: 0,
    altitude: 0,
    maxZoom: 23,
    minZoom: 0,
    maxPitch: 0,
    minPitch: 0,
  });

  const geoJSONRegions: React.ReactElement[] = [];

  useEffect(() => {
    profile.visited.map((region: string) => {
      const regionFound = geoJSON.regions.find(({ source }) => source === region);

      if (regionFound) {
        geoJSONRegions.push(
          <Source
            key={regionFound.source}
            id={regionFound.source}
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: { type: 'Polygon', coordinates: regionFound.coordinates },
                },
              ],
            }}
          >
            <Layer
              id={regionFound.source}
              type="fill"
              paint={{
                'fill-color': profile.fillColor,
                'fill-opacity': 0.5,
              }}
            />
          </Source>,
        );
      }
    });
    setSources(geoJSONRegions);
    setMarkers(profile.markers);
  }, [profile]);

  const addMarker = ([longitude, latitude]: [number, number]) => {
    const newMarker = {
      _id: uuidv4(),
      longitude,
      latitude,
    };
    setMarkers([...profile.markers, newMarker]);
    dispatch(updateProfile({ ...profile, ...{ markers: [...profile.markers, newMarker] } }));
  };

  return loading ? (
    <GeoLoggerSpinner />
  ) : (
    <MapContainer>
      <MapActions />
      <ReactMapGL
        style={{ zIndex: '0' }}
        {...viewport}
        mapStyle={`mapbox://styles/mapbox/${profile.mapStyle}`}
        onViewportChange={(nextViewport: ViewportProps) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onClick={({ lngLat }) => {
          actionsStatus[1] && addMarker(lngLat);
          dispatch(updateMapActionStatus([false, false, false, false]));
        }}
      >
        {sources}
        <Markers markers={markers} onClick={setPopupInfo} />
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <MarkerPopup marker={popupInfo} onClick={setPopupInfo} />
          </Popup>
        )}
      </ReactMapGL>
    </MapContainer>
  );
};

export default memo(Mapbox);
