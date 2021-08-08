import { FC } from 'react';
import styled from 'styled-components';
import trackVacations from '../../../assets/img/trackVacations.png';

const TrackVacationsContainer = styled.div`
  max-width: 100rem;
  padding: 8rem 1.5rem 8rem 1.5rem;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    padding: 4rem 1rem 3rem 1rem;
    text-align: center;
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  transition: transform 100ms ease-out;

  &:hover {
    transition: transform 100ms ease-in;
    transform: scale(1.01);
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > h1 {
    font-size: 44px;
  }

  & > p {
    margin-top: 1.5rem;
    color: ${({ theme }) => theme.colors.dark};
    font-size: 20px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    order: -1;

    & > h1 {
      font-size: 28px;
    }

    & > p {
      margin-top: 1rem;
      font-size: 16px;
    }
  }
`;

const TrackVacations: FC = () => {
  return (
    <TrackVacationsContainer>
      <Image>
        <img src={trackVacations} alt="Visual of tracked vacations" />
      </Image>
      <Information>
        <h1>Track Vacations</h1>
        <p>
          GeoLogger allows you to keep track of places you have visited with customizable highlights. Add a location to
          your list of visited regions and apply any highlight color you want.
        </p>
      </Information>
    </TrackVacationsContainer>
  );
};

export default TrackVacations;
