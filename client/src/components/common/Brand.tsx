import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FcGlobe } from 'react-icons/fc';
import styled from 'styled-components';

const BrandStyle = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    font-size: 2.5rem;
  }

  & > svg > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.primary};
  }

  & > a {
    margin-left: 0.5rem;
    font-size: 1.875rem;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    text-decoration: none;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & > a {
      font-size: 1.5rem;
    }
  }
`;

const Brand: FC = () => {
  return (
    <BrandStyle>
      <FcGlobe />
      <Link to="/">GeoLogger</Link>
    </BrandStyle>
  );
};

export default Brand;
