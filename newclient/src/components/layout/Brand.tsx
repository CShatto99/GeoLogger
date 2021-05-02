import { FC } from 'react';
import styled from 'styled-components';

const BrandStyle = styled.div`
  display: flex;
  align-items: center;

  & .fa-globe {
    position: relative;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem;
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.black};
    z-index: 1;
  }

  & div {
    background-color: green;
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    height: 80%;
    width: 100%;
    border-radius: 50%;
  }

  & > h2 {
    margin-left: 1rem;
    font-size: 1.875rem;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;

const Brand: FC = () => {
  return (
    <BrandStyle>
      <i className="fa fa-globe" aria-hidden="true">
        <div />
      </i>
      <h2>GeoLogger</h2>
    </BrandStyle>
  );
};

export default Brand;
