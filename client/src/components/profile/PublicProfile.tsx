import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';

const PublicProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;
  min-height: calc(100vh - 7.5rem);
`;

const PublicProfile: FC = () => {
  const { profile } = useAppSelector((state) => state.profile);

  console.log(profile);
  return <PublicProfileContainer>PUBLIC PROFILE</PublicProfileContainer>;
};

export default PublicProfile;
