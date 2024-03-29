import { FC } from 'react';
import { Marker } from 'react-map-gl';
import { MarkerType } from '../../../../store/types';
import MarkerIcon from '../../../common/styles/MarkerIcon';
import GlTooltip from '../../../common/GLTooltip';

type GLMarkerProps = {
  onClick: React.Dispatch<React.SetStateAction<MarkerType | null>>;
} & MarkerType;

const GLMarker: FC<GLMarkerProps> = ({ onClick, ...rest }: GLMarkerProps) => {
  // const handleClick = () => {
  //   onClick(null);
  //   if (rest === null) onClick(rest);
  // };

  return (
    <Marker longitude={rest.longitude} latitude={rest.latitude} offsetTop={-20} offsetLeft={-10}>
      <GlTooltip content={rest.title ? rest.title : 'Click to edit'} direction="top">
        <MarkerIcon onClick={() => onClick(rest)} />
      </GlTooltip>
    </Marker>
  );
};

export default GLMarker;
