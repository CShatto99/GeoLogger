import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoEarthSharp } from 'react-icons/io5';
import { BsCheck } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateProfile, updateMapActionStatus } from '../../../store/profile';
import GeoLoggerModal from '../../common/GLModal';
import MapType from '../../common/MapType';
import GLTooltip from '../../common/GLTooltip';
import mapStyles from '../../../utils/getMapStyles';
import mapImages from '../../../utils/getMapImages';

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
      <GLTooltip content="Map Style">
        <IoEarthSharp onClick={() => dispatch(updateMapActionStatus([false, false, false, true]))} />
      </GLTooltip>
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
            image={mapImages.streetsV11}
            demo="https://www.mapbox.com/maps/streets"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.outdoors)}
            mapTitle="Outdoors V11"
            image={mapImages.outdoorsV11}
            demo="https://www.mapbox.com/maps/outdoors"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.light)}
            mapTitle="Light V10"
            image={mapImages.lightV10}
            demo="https://www.mapbox.com/maps/light"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.dark)}
            mapTitle="Dark V10"
            image={mapImages.darkV10}
            demo="https://www.mapbox.com/maps/dark"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.satellite)}
            mapTitle="Satellite V9"
            image={mapImages.satelliteV9}
            demo="https://www.mapbox.com/maps/satellite"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.satelliteStreets)}
            mapTitle="Satellite Streets V11"
            image={mapImages.satelliteV9}
            demo="https://docs.mapbox.com/help/getting-started/satellite-imagery/"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.navigationDay)}
            mapTitle="Navigation Day V1"
            image={mapImages.satelliteV9}
            demo="https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#13/40.41695/-3.70192"
          />
          <MapType
            selectedMapStyle={mapStyle}
            setSelectedMapStyle={() => setMapStyle(mapStyles.navigationNight)}
            mapTitle="Navigation Night V1"
            image={mapImages.satelliteV9}
            demo="https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#13/40.41695/-3.70192"
          />
        </MapContent>
      </GeoLoggerModal>
    </>
  );
};

export default MapStyle;
