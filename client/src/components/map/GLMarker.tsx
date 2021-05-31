import { FC } from 'react';
import { Marker } from 'react-map-gl';
import ReactTooltip from 'react-tooltip';
import { MarkerType } from '../../store/types';
import MarkerIcon from '../styles/MarkerIcon';

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
