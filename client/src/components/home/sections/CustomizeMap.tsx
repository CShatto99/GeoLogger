import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { RiShareForwardBoxLine } from 'react-icons/ri';
import styled from 'styled-components';
import GeneralLink from '../../common/Links';
import mapTypes from '../../../utils/getMapTypes';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CustomizeMapContainer = styled.div`
  padding: 8rem 1.5rem 8rem 1.5rem;
  max-width: 100rem;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  place-items: start center;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 2rem;
    padding: 4rem 1rem 3rem 1rem;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

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

const CarouselContainer = styled.div`
  width: 60%;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`;

const Legend = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DemoIcon = styled.a`
  display: grid;
  place-items: center;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  transition: ease-out 100ms;

  &:hover {
    transition: ease-in 100ms;
    transform: scale(1.1);
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

const CustomizeMap: FC = () => {
  return (
    <CustomizeMapContainer>
      <Information>
        <h1>Customize Your Map</h1>
        <p>Choose bewteen six unique map styles to give your map dashboard a fresh look.</p>
      </Information>
      <CarouselContainer>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {mapTypes.map((mapType) => (
            <div key={mapType.style}>
              <img src={mapType.image} />
              <Legend className="legend">
                {mapType.title}
                <DemoIcon href={mapType.demo} title="View Demo" target="_blank" rel="noopener noreferrer">
                  <RiShareForwardBoxLine />
                </DemoIcon>
              </Legend>
            </div>
          ))}
        </Carousel>
      </CarouselContainer>
      <LandingLink to="/register">Start Logging</LandingLink>
    </CustomizeMapContainer>
  );
};

export default CustomizeMap;
