import { FC } from 'react';
import styled from 'styled-components';

const PrimaryButtonStyle = styled.button`
  color: #edf2f7;
  border-radius: 0.3rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: ease-out 100ms;
  border: none;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
    transition: ease-in 100ms;
  }
`;

const DisabledButton = styled(PrimaryButtonStyle)`
  cursor: default;
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;

type PrimaryButtonProps = {
  disabled?: boolean;
  text: string;
};

const Button: FC<PrimaryButtonProps> = ({ disabled, text }: PrimaryButtonProps) => {
  return disabled ? (
    <DisabledButton disabled={disabled}>{text}</DisabledButton>
  ) : (
    <PrimaryButtonStyle disabled={disabled}>{text}</PrimaryButtonStyle>
  );
};

export default Button;
