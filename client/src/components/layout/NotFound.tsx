import { FC } from 'react';
// import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import satelliteV9 from '../../assets/img/satellite-v9.png';
import GeneralLink from '../common/Links';

const NotFoundContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${satelliteV9});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 1rem 0 1rem;
  }
`;

const NotFoundLanding = styled.div`
  width: 100%;
  height: 930px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  & > h1 {
    font-size: 10rem;
    font-weight: 100;
    margin-bottom: 1.5rem;
  }

  & > h3 {
    margin-bottom: 1.5rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & > h1 {
      font-size: 7rem;
    }

    & > h3 {
      font-size: 1.3rem;
    }

    & a {
      font-size: 1rem;
    }
  }
`;

const NotFoundFooter = styled.div`
  height: 300px;
  width: 100%;
  // background-color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 1rem;
  }
`;

const HomeButton = styled(GeneralLink)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  margin: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
  }
`;

const NotFound: FC = () => {
  return (
    <NotFoundContainer>
      <NotFoundLanding>
        <h1>404</h1>
        <h3>Hmm, we could not find this location on our world map!</h3>
        <HomeButton to="/">Go Home</HomeButton>
      </NotFoundLanding>
      <NotFoundFooter></NotFoundFooter>
    </NotFoundContainer>
  );
};

export default NotFound;
