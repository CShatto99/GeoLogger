import { FC, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { IoEarthSharp } from 'react-icons/io5';
import GeoLoggerModal from '../../GLModal';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateProfile, updateMapActionStatus } from '../../../store/profile';
import { BsCheck } from 'react-icons/bs';
import MapType from '../../MapType';
import darkV10 from '../../../img/dark-v10.png';
import lightV10 from '../../../img/light-v10.png';
import outdoorsV11 from '../../../img/outdoors-v11.png';
import streetsV11 from '../../../img/streets-v11.png';
import satelliteV9 from '../../../img/satellite-v9.png';
import mapStyles from '../../../utils/mapStyles';

const ApplyButton = styled.div`
  & > svg {
    stroke: ${({ theme }) => theme.colors.success};
    stroke-width: 2px;
    cursor: pointer;
    transition: all 100ms ease-out;
  }

  & > svg:hover {
    transform: scale(1.4);
    transition: all 100ms ease-in;
  }
`;

const MapContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
  }
`;

const MapStyle: FC = () => {
  const dispatch = useAppDispatch();
  const { profile, actionsStatus, loading } = useAppSelector((state) => state.profile);
  const [mapStyle, setMapStyle] = useState('');

  useEffect(() => {
    setMapStyle(profile.mapStyle);
  }, [profile]);

  const onSubmit = () => {
    dispatch(updateProfile({ ...profile, ...{ mapStyle } }));
  };

  return (
    <>
      <IoEarthSharp
        data-tip
        data-for="map-style-action"
        onClick={() => dispatch(updateMapActionStatus([false, false, false, true]))}
      />
      <ReactTooltip id="map-style-action" effect="solid" aria-haspopup="true">
        <small>Map Style</small>
      </ReactTooltip>
      <GeoLoggerModal
        title="Map Style"
        isOpen={actionsStatus[3]}
        onClose={() => dispatch(updateMapActionStatus([false, false, false, false]))}
        toggler={
          !loading &&
          mapStyle !== profile.mapStyle && (
            <ApplyButton onClick={onSubmit}>
              <BsCheck />
            </ApplyButton>
          )
        }
      >
        <MapContent>
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.streets)}
            mapTitle="Streets V11"
            image={streetsV11}
            demo="https://www.mapbox.com/maps/streets"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.outdoors)}
            mapTitle="Outdoors V11"
            image={outdoorsV11}
            demo="https://www.mapbox.com/maps/outdoors"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.light)}
            mapTitle="Light V10"
            image={lightV10}
            demo="https://www.mapbox.com/maps/light"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.dark)}
            mapTitle="Dark V10"
            image={darkV10}
            demo="https://www.mapbox.com/maps/dark"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.satellite)}
            mapTitle="Satellite V9"
            image={satelliteV9}
            demo="https://www.mapbox.com/maps/satellite"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.satelliteStreets)}
            mapTitle="Satellite Streets V11"
            image={satelliteV9}
            demo="https://docs.mapbox.com/help/getting-started/satellite-imagery/"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.navigationDay)}
            mapTitle="Navigation Day V1"
            image={satelliteV9}
            demo="https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#13/40.41695/-3.70192"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.navigationNight)}
            mapTitle="Navigation Night V1"
            image={satelliteV9}
            demo="https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#13/40.41695/-3.70192"
          />
        </MapContent>
      </GeoLoggerModal>
    </>
  );
};

export default MapStyle;
