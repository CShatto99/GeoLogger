import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store';
import GeneralLink from '../common/Links';
import MarkerIcon from '../common/styles/MarkerIcon';
import satelliteV9 from '../../assets/img/satellite-v9.png';

const NotFoundContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${satelliteV9});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 1rem;
  }
`;

const NotFoundContent = styled.div`
  max-width: 100rem;
  height: 100%;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  & > h1 {
    font-size: 7rem;
  }

  & > h2 {
    font-size: 3rem;
  }

  & > h3 {
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }

  & > *:not(:first-child) {
    margin-top: 2rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    align-items: center;
    text-align: center;

    & > h1 {
      font-size: 5rem;
    }

    & > h2 {
      font-size: 2rem;
    }

    & > h3 {
      font-size: 1.25rem;
    }

    & > *:not(:first-child) {
      margin-top: 1rem;
    }
  }
`;

const SiteLinkButtons = styled.div`
  box-sizing: border-box;
  display: flex;
  border-radius: 0.3rem;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    width: 100%;

    & > *:not(:last-child) {
      margin: 0 0 0.5rem 0;
    }
  }
`;

const SiteLinkButton = styled(GeneralLink)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  margin: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
  }
`;

const IconSection = styled.div`
  display: grid;
  place-items: center;
  border-radius: 50%;

  & > svg {
    font-size: 40rem;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    & > svg {
      font-size: 30rem;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`;

const NotFound: FC = () => {
  const { user, isAuth } = useAppSelector((state) => state.auth);

  const guestLinks = (
    <>
      <SiteLinkButton to="/">Home</SiteLinkButton>
      <SiteLinkButton to="/login">Login</SiteLinkButton>
      <SiteLinkButton to="/register">Register</SiteLinkButton>
    </>
  );

  const userLinks = (
    <>
      <SiteLinkButton to="/map">Map</SiteLinkButton>
      <SiteLinkButton to={`/profile/${user.username}`}>Profile</SiteLinkButton>
      <SiteLinkButton to="/settings/profile">Settings</SiteLinkButton>
    </>
  );

  return (
    <NotFoundContainer>
      <NotFoundContent>
        <InformationSection>
          <h1>404</h1>
          <h2>We could not find this page on our map!</h2>
          <h3>No problem, try using one of the site links below:</h3>
          <SiteLinkButtons>{isAuth ? userLinks : guestLinks}</SiteLinkButtons>
        </InformationSection>
        <IconSection>
          <MarkerIcon />
        </IconSection>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;
