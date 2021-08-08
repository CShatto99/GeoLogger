import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoEarthSharp } from 'react-icons/io5';
import { BsCheck } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateProfile, updateMapActionStatus } from '../../../store/profile';
import GeoLoggerModal from '../../common/GLModal';
import MapType from '../../common/MapType';
import GLTooltip from '../../common/GLTooltip';
import { ApplyButton } from '../../common/Buttons';
import mapTypes from '../../../utils/getMapTypes';

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
          {mapTypes.map((mapType) => (
            <MapType
              key={mapType.style}
              selectedMapStyle={mapStyle}
              setSelectedMapStyle={() => setMapStyle(mapType.style)}
              mapTitle={mapType.title}
              image={mapType.image}
              demo={mapType.demo}
            />
          ))}
        </MapContent>
      </GeoLoggerModal>
    </>
  );
};

export default MapStyle;
