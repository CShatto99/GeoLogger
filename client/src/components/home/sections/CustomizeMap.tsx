import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { RiShareForwardBoxLine } from 'react-icons/ri';
import styled from 'styled-components';
import mapTypes from '../../../utils/getMapTypes';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import GLTooltip from '../../common/GLTooltip';

const CustomizeMapContainer = styled.div`
  padding: 5rem 1.5rem 3rem 1.5rem;
  max-width: 100rem;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  place-items: start center;

  & > h1 {
    font-size: 44px;
    text-align: center;
  }

  & > p {
    margin-top: 1.5rem;
    color: ${({ theme }) => theme.colors.light};
    font-size: 20px;
  }

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
const CarouselContainer = styled.div`
  width: 60%;
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

const CustomizeMap: FC = () => {
  return (
    <CustomizeMapContainer>
      <Information>
        <h1>Customize Your Map</h1>
        <p>
          Vestibulum vehicula odio urna, ac venenatis elit aliquet eleifend. Sed a odio pretium, tincidunt elit at,
          sagittis velit. Morbi vel leo eget nibh pharetra sagittis venenatis sit amet lectus.
        </p>
      </Information>
      <CarouselContainer>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {mapTypes.map((mapType) => (
            <div key={mapType.style}>
              <img src={mapType.image} />
              <Legend className="legend">
                {mapType.title}
                <GLTooltip content="View Demo">
                  <DemoIcon href={mapType.demo} target="_blank" rel="noopener noreferrer">
                    <RiShareForwardBoxLine />
                  </DemoIcon>
                </GLTooltip>
              </Legend>
            </div>
          ))}
        </Carousel>
      </CarouselContainer>
    </CustomizeMapContainer>
  );
};

export default CustomizeMap;
