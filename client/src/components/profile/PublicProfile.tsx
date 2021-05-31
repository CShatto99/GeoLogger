import { FC } from 'react';
import styled from 'styled-components';
import { FcGlobe } from 'react-icons/fc';
import { useAppSelector } from '../../store';
import ProfilePicture from './publicProfile/ProfilePicture';
import PhotoAlbum from './publicProfile/PhotoAlbum';

const PublicProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;
  min-height: calc(100vh - 7.5rem);
`;

const PublicProfileContent = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2.5rem;

  &:first-child {
    grid-column: 2 / span 4;
  }
`;

const Bio = styled.p`
  margin: 1rem 0;
  line-height: 1.4rem;
`;

const VisitedInfo = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 0.25rem;
    font-size: 1.5rem;
  }

  & > svg > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.primary};
  }

  & > small > span {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

const VisitedIcon = styled(FcGlobe)``;

const PublicProfile: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);

  console.log(profile);
  return (
    <PublicProfileContainer>
      <PublicProfileContent>
        <div>
          <ProfilePicture pfp={''} />
          <h1>{user.username}</h1>
          <h3>{user.email}</h3>
          <Bio>{profile.bio && profile.bio}</Bio>
          <VisitedInfo>
            <VisitedIcon />
            <small>
              <span>{profile.visited.length}</span> states visited
            </small>
          </VisitedInfo>
        </div>
        <PhotoAlbum markers={profile.markers} />
      </PublicProfileContent>
    </PublicProfileContainer>
  );
};

export default PublicProfile;
