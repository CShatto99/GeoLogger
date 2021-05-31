import styled from 'styled-components';
import { FcGlobe } from 'react-icons/fc';

const MarkerIcon = styled(FcGlobe)`
  font-size: 2rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  & > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.primary};
    transition: all 100ms ease-out;
  }

  &:hover > path:nth-child(2) {
    fill: ${({ theme }) => theme.colors.darkPrimary};
    transition: all 100ms ease-in;
  }
`;

export default MarkerIcon;
