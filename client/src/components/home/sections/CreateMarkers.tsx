import { FC } from 'react';
import styled from 'styled-components';
import createMarkers from '../../../assets/img/createMarkers.png';

const CreateMarkersContainer = styled.div`
  max-width: 100rem;
  padding: 8rem 1.5rem;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5rem;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    padding: 4rem 1rem;
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
        <h1>Create Markers</h1>
        <p>
          Create and manage fully customizable markers that detail your vacation history. Add an image, title, date, or
          description to your markers.
        </p>
      </Information>
      <Image>
        <img src={createMarkers} alt="Visual of tracked Markers" />
      </Image>
    </CreateMarkersContainer>
  );
};

export default CreateMarkers;
