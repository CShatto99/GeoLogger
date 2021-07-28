import { FC } from 'react';
import styled from 'styled-components';
import GeneralLink from '../../common/Links';
import satelliteV9 from '../../../assets/img/satellite-v9.png';

const LandingSection = styled.div`
  background-image: url(${satelliteV9});
  background-size: cover;
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const LandingContent = styled.div`
  max-width: 100rem;
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  & > h1 {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: 4rem;
  }

  & > p {
    margin: 2rem 0 3rem 0;
    font-size: 1.5rem;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    & > h1 {
      font-size: 3rem;
    }

    & > p {
      font-size: 1.25rem;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 1rem;

    & > h1 {
      font-size: 2rem;
    }

    & > p {
      margin: 1rem 0 2rem 0;
      font-size: 1rem;
    }
  }
`;

const LandingLink = styled(GeneralLink)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  padding: 0.5rem 1rem;
  margin: 0;
  font-size: 1.1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
  }
`;

const Landing: FC = () => {
  return (
    <>
      <LandingSection>
        <LandingContent>
          <h1>Log your vacation history with GeoLogger</h1>
          <p>
            Keep track of countries you&apos;ve visited, create meaningful markers detailing your vacations, share your
            vacation history with others, and much more on GeoLogger.
          </p>
          <LandingLink to="/register">Start Logging</LandingLink>
        </LandingContent>
      </LandingSection>
    </>
  );
};

export default Landing;
