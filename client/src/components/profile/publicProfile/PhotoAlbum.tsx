import { FC } from 'react';
import { MarkerType } from '../../../store/types';
import Divider from '../../styles/Divider';

type PhotoAlbumProps = {
  markers: MarkerType[];
};

const PhotoAlbum: FC<PhotoAlbumProps> = ({ markers }: PhotoAlbumProps) => {
  return (
    <div>
      <h1>Photo Album</h1>
      <Divider />
      {markers.map((m: MarkerType) => (
        <p key={m._id}>{m.title}</p>
      ))}
    </div>
  );
};

export default PhotoAlbum;
