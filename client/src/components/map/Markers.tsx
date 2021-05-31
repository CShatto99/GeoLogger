import { FC, memo } from 'react';
import { MarkerType } from '../../store/types';
import GLMarker from './GLMarker';

type MarkersProps = {
  markers: MarkerType[];
  onClick: React.Dispatch<React.SetStateAction<MarkerType | null>>;
};

const Markers: FC<MarkersProps> = ({ markers, onClick }: MarkersProps) => {
  return (
    <>
      {markers.map((m, index) => (
        <GLMarker {...m} key={index} onClick={onClick} />
      ))}
    </>
  );
};

export default memo(Markers);
