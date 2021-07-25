import { FC } from 'react';
import styled from 'styled-components';
import trackYourMarkers from '../../../assets/img/trackYourVacations.png';

const CreateMarkersContainer = styled.div`
  max-width: 100rem;
  padding: 5rem 1.5rem;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    padding: 4rem 1rem;
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
    color: ${({ theme }) => theme.colors.light};
    font-size: 20px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & > h1 {
      font-size: 28px;
    }

    & > p {
      margin-top: 1rem;
      font-size: 16px;
    }
  }
`;

const CreateMarkers: FC = () => {
  return (
    <CreateMarkersContainer>
      <Information>
        <h1>Create Custom Markers</h1>
        <p>
          Phasellus vitae rhoncus magna. Cras euismod mi eget eros congue porta. Suspendisse pulvinar lobortis nisl, id
          cursus nulla sollicitudin et. Ut at ornare est. Mauris vel tincidunt sem.
        </p>
      </Information>
      <Image>
        <img src={trackYourMarkers} alt="Visual of tracked Markers" />
      </Image>
    </CreateMarkersContainer>
  );
};

export default CreateMarkers;
