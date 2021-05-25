import { FC } from 'react';
import styled from 'styled-components';

export const PrimaryButtonStyle = styled.button`
  color: #edf2f7;
  border-radius: 0.3rem;
  padding: 0.1rem 1rem;
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

export const DangerButtonStyle = styled(PrimaryButtonStyle)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.black};
  padding: 0 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ApplyButton = styled.div`
  & > svg {
    stroke: ${({ theme }) => theme.colors.success};
    stroke-width: 2px;
    cursor: pointer;
    transition: all 100ms ease-out;
    margin-right: 0 !important;
    font-size: 1.2rem;
  }

  & > svg:hover {
    transform: scale(1.4);
    transition: all 100ms ease-in;
  }
`;

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button: FC<ButtonProps> = ({ type, disabled, children, onClick }: ButtonProps) => {
  return disabled ? (
    <DisabledButton disabled={disabled}>{children}</DisabledButton>
  ) : (
    <PrimaryButtonStyle type={type} disabled={disabled} onClick={onClick}>
      {children}
    </PrimaryButtonStyle>
  );
};

export const DangerButton: FC<ButtonProps> = ({ type, disabled, children, onClick }: ButtonProps) => {
  return disabled ? (
    <DisabledButton disabled={disabled}>{children}</DisabledButton>
  ) : (
    <DangerButtonStyle type={type} disabled={disabled} onClick={onClick}>
      {children}
    </DangerButtonStyle>
  );
};

export default Button;
