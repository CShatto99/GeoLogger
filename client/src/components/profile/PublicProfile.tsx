import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FcGlobe } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../../store';
import ProfilePicture from './publicProfile/ProfilePicture';
import PhotoAlbum from './publicProfile/PhotoAlbum';
import { getPublicProfile } from '../../store/profile';
import GeoLoggerSpinner from '../layout/GeoLoggerSpinner';

const PublicProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;
  min-height: calc(100vh - 7.5rem);

  @media ${({ theme }) => theme.mediaQueries.md} {
    & h1 {
      font-size: 2rem;
    }
  }
`;

const PublicProfileContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2.5rem;

  @media ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.mediaQueries.md} {
    & > div:nth-child(2) {
      height: fit-content;
      align-self: center;
    }

    & > div:nth-child(2) > h3 {
      font-size: 1.2rem;
    }
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
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();
  // const { user } = useAppSelector((state) => state.auth);
  const { publicProfile, loading } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getPublicProfile(username));
  }, []);

  return loading ? (
    <GeoLoggerSpinner />
  ) : (
    <PublicProfileContainer>
      <PublicProfileContent>
        <ProfileInfo>
          <ProfilePicture pfp={''} />
          <div>
            <h1>{publicProfile.username}</h1>
            <h3>{publicProfile.email}</h3>
          </div>
          <div>
            <Bio>{publicProfile.bio && publicProfile.bio}</Bio>
            <VisitedInfo>
              <VisitedIcon />
              <small>
                <span>{publicProfile.visited.length}</span> states visited
              </small>
            </VisitedInfo>
          </div>
        </ProfileInfo>
        <PhotoAlbum markers={publicProfile.markers} />
      </PublicProfileContent>
    </PublicProfileContainer>
  );
};

export default PublicProfile;
