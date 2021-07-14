import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { PublicUser } from '../../store/types';
import { loadUsers } from '../../store/auth';
import { DefaultLink } from '../common/Links';
import Divider from '../common/styles/Divider';

const ExploreContainer = styled.div`
  min-height: calc(100vh - 7.5rem);
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6rem 1.5rem 1.5rem 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 6rem 1rem 1rem 1rem;
  }
`;

const Explore: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <ExploreContainer>
      <h5 style={{ color: 'red', marginBottom: '1rem' }}>NOTE: this page is experimental and may contain bugs</h5>
      {users.map((user: PublicUser) => (
        <div key={user._id}>
          <DefaultLink to={`/profile/${user.username}`}>{user.username}</DefaultLink>
          <Divider />
        </div>
      ))}
    </ExploreContainer>
  );
};

export default Explore;
