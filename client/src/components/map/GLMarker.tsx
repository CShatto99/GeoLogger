import { FC } from 'react';
import { Marker } from 'react-map-gl';
import styled from 'styled-components';
import { FcGlobe } from 'react-icons/fc';
import { MarkerType } from '../../store/types';
import ReactTooltip from 'react-tooltip';

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
  return (
    <Marker longitude={rest.longitude} latitude={rest.latitude} offsetTop={-20} offsetLeft={-10}>
      <MarkerIcon data-tip data-for={`marker-${rest._id}`} onClick={() => onClick(rest)} />
      <ReactTooltip id={`marker-${rest._id}`}>
        <small>{rest.title ? rest.title : 'Click to edit!'}</small>
      </ReactTooltip>
    </Marker>
  );
};

export default GLMarker;
