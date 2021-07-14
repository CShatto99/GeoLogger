import { FC } from 'react';
import styled from 'styled-components';
import { MarkerType } from '../../../store/types';
import { DefaultLink } from '../../common/Links';
import Divider from '../../common/styles/Divider';
import Photo from './Photo';

const PhotoAblumContainer = styled.div`
  grid-column: 2 / span 4;

  & img {
    box-shadow: none;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    grid-column: 1 / span 1;
  }
`;

const Photos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 1rem;
  }
`;

type PhotoAlbumProps = {
  markers: MarkerType[];
  userViewingSelf: boolean;
  username: string;
};

const PhotoAlbum: FC<PhotoAlbumProps> = ({ markers, userViewingSelf, username }: PhotoAlbumProps) => {
  const noPhotosMsg = userViewingSelf ? (
    <h3>
      You have no photos. Add a photo by <DefaultLink to="/map"> creating a marker</DefaultLink>.
    </h3>
  ) : (
    <h3>{username} has no public photos.</h3>
  );

  return (
    <PhotoAblumContainer>
      <h1>Photo Album</h1>
      <Divider />
      {markers.length <= 0 ? (
        noPhotosMsg
      ) : (
        <Photos>
          {markers.map((m: MarkerType) => <Photo key={m._id} title={m.title} image={m.image} />).reverse()}
        </Photos>
      )}
    </PhotoAblumContainer>
  );
};

export default PhotoAlbum;
