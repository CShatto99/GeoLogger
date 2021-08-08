import { FC } from 'react';
import { FcGlobe } from 'react-icons/fc';
import styled from 'styled-components';
import GeneralLink from '../../common/Links';

const LandingContainer = styled.div`
  max-width: 100rem;
  padding: 10rem 1.5rem 5rem 1.5rem;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  text-align: center;

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
    grid-gap: 2rem;
    padding: 8rem 1rem 3rem 1rem;

    & > h1 {
      font-size: 2rem;
    }

    & > p {
      margin: 1rem 0 2rem 0;
      font-size: 1rem;
    }
  }
`;

const Information = styled.div`
  & > h1 {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: 4rem;
  }

  & > p {
    margin: 2rem 0 3rem 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.dark};
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

  @media ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1rem;
  }
`;

const Image = styled.div`
  display: grid;
  place-items: center;

  & > svg {
    font-size: 40rem;
    animation: earthspin 30s infinite linear;
  }

  & > svg > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.primary};
  }

  @keyframes earthspin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    & > svg {
      font-size: 30rem;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & > svg {
      font-size: 20rem;
    }
  }
`;

const Landing: FC = () => {
  return (
    <LandingContainer>
      <Information>
        <h1>Vacation logging for travelers</h1>
        <p>
          Keep track of places you&apos;ve visited, create meaningful markers detailing your vacations, and much more on
          GeoLogger.
        </p>
        <LandingLink to="/register">Start Logging</LandingLink>
      </Information>
      <Image>
        <FcGlobe />
      </Image>
    </LandingContainer>
  );
};

export default Landing;
