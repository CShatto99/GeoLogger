import { FC, memo } from 'react';
import { Marker } from 'react-map-gl';
import GLTooltip from '../../common/GLTooltip';
import { MarkerType } from '../../../store/types';
import MarkerIcon from '../../common/styles/MarkerIcon';

type MarkersProps = {
  markers: MarkerType[];
  onClick: React.Dispatch<React.SetStateAction<MarkerType | null>>;
};

const Markers: FC<MarkersProps> = ({ markers, onClick }: MarkersProps) => {
  return (
    <>
      {markers.map((m, index) => (
        <Marker key={index} longitude={m.longitude} latitude={m.latitude} offsetTop={-20} offsetLeft={-10}>
          <GLTooltip content={m.title ? m.title : 'Click to edit'} direction="top">
            <MarkerIcon onClick={() => onClick(m)} />
          </GLTooltip>
        </Marker>
      ))}
    </>
  );
};

export default memo(Markers);
