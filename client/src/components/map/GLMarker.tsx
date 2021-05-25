import { FC, useCallback, useState } from 'react';
import { Marker } from 'react-map-gl';
import styled from 'styled-components';
import { FcGlobe } from 'react-icons/fc';
import { MarkerType } from '../../store/types';
import ReactTooltip from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateProfile } from '../../store/profile';

const MarkerIcon = styled(FcGlobe)`
  font-size: 2rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  & > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.primary};
    transition: all 100ms ease-out;
  }

  &:hover > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.darkPrimary};
    transition: all 100ms ease-in;
  }
`;

type GLMarkerProps = {
  onClick: React.Dispatch<React.SetStateAction<MarkerType | null>>;
} & MarkerType;

const GLMarker: FC<GLMarkerProps> = ({ onClick, ...rest }: GLMarkerProps) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const [marker, setMarker] = useState(rest);

  const onMarkerDragEnd = useCallback((event) => {
    setMarker({ ...marker, ...{ longitude: event.lngLat[0], latitude: event.lngLat[1] } });
    dispatch(
      updateProfile({
        ...profile,
        ...{
          markers: profile.markers.map((m: MarkerType) =>
            m._id === rest._id ? { ...m, ...{ longitude: event.lngLat[0], latitude: event.lngLat[1] } } : m,
          ),
        },
      }),
    );
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
      <MarkerIcon data-tip data-for={`marker-${rest.date}`} onClick={() => onClick(marker)} />
      <ReactTooltip id={`marker-${rest.date}`}>
        <small>{rest.title ? rest.title : 'Double-click to edit!'}</small>
      </ReactTooltip>
    </Marker>
  );
};

export default GLMarker;
