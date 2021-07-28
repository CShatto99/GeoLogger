import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GeneralLink = styled(Link)`
  color: #edf2f7;
  border-radius: 0.3rem;
  margin-left: 0.5rem;
  padding: 0.1rem 1rem;
  cursor: pointer;
  transition: ease-out 100ms;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    transition: ease-in 100ms;
  }
`;

export const DefaultLinkHTML = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: ease-out 100ms;

  &:hover {
    color: ${({ theme }) => theme.colors.darkPrimary};
    transition: ease-in 100ms;
  }
`;

export const DefaultLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
`;

export const DangerLink = styled(GeneralLink)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default GeneralLink;
