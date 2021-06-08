import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { PublicUser } from '../../store/types';
import { loadUsers } from '../../store/auth';
import { DefaultLink } from '../styles/Links';
import Divider from '../styles/Divider';

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

  console.log(users);
  return (
    <ExploreContainer>
      {users.map((user: PublicUser) => (
        <>
          <DefaultLink key={user._id} to={`/profile/${user.username}`}>
            {user.username}
          </DefaultLink>
          <Divider />
        </>
      ))}
    </ExploreContainer>
  );
};

export default Explore;
