import { FC } from 'react';
import styled from 'styled-components';
import { MarkerType } from '../../../store/types';
import Divider from '../../styles/Divider';

const PhotoAblumContainer = styled.div`
  grid-column: 2 / span 4;

  @media ${({ theme }) => theme.mediaQueries.md} {
    grid-column: 1 / span 1;
  }
`;

type PhotoAlbumProps = {
  markers: MarkerType[];
};

const PhotoAlbum: FC<PhotoAlbumProps> = ({ markers }: PhotoAlbumProps) => {
  return (
    <PhotoAblumContainer>
      <h1>Photo Album</h1>
      <Divider />
      {markers.map((m: MarkerType) => (
        <p key={m._id}>{m.title}</p>
      ))}
    </PhotoAblumContainer>
  );
};

export default PhotoAlbum;
