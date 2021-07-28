import { FC } from 'react';
import styled from 'styled-components';
import trackYourVacations from '../../../assets/img/trackYourVacations.png';

const TrackVacationsContainer = styled.div`
  max-width: 100rem;
  padding: 10rem 1.5rem;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    padding: 8rem 1rem 4rem 1rem;
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
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
        <img src={trackYourVacations} alt="Visual of tracked vacations" />
      </Image>
      <Information>
        <h1>Track Your Vacations</h1>
        <p>
          Aliquam rhoncus tortor velit, et sodales erat placerat ut. Nulla non purus varius, aliquet felis ut, euismod
          purus. Etiam quis erat sed ipsum gravida pulvinar. Ut tempus nibh ut tellus elementum, quis auctor tellus
          euismod.
        </p>
      </Information>
    </TrackVacationsContainer>
  );
};

export default TrackVacations;
