import { FC, useState } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import styled from 'styled-components';

export const GeneralInputStyle = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  transition: ease-out 100ms;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  -webkit-border-radius: 0px;
  border-radius: 0px;
  box-sizing: border-box;
  margin-top: 0.25rem;
  padding: 0.25rem;

  &:focus {
    transition: ease-in 100ms;
    outline: none;
    box-shadow: 0px 1px 1px 0px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const AuthInputStyle = styled(GeneralInputStyle)`
  padding: 0.5rem 0.25rem;
`;

const Toggler = styled.span`
  position: relative;
  float: right;
  margin-top: -24px;
  margin-right: 10px;

  & > svg:hover {
    cursor: pointer;
  }

  & > svg > path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

type InputProps = {
  type?: string | undefined;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const GeneralInput: FC<InputProps> = ({ type, value, placeholder, onChange }: InputProps) => (
  <GeneralInputStyle type={type} value={value} placeholder={placeholder} onChange={onChange} />
);

export const AuthInput: FC<InputProps> = ({ type, value, placeholder, onChange }: InputProps) => (
  <AuthInputStyle type={type} value={value} placeholder={placeholder} onChange={onChange} />
);

export const PasswordInput: FC<InputProps> = ({ value, placeholder, onChange }: InputProps) => {
  const [passVisible, setPassVisible] = useState(false);

  return (
    <>
      <AuthInputStyle
        type={passVisible ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {value && (
        <Toggler onClick={() => setPassVisible(!passVisible)}>{passVisible ? <IoMdEye /> : <IoMdEyeOff />}</Toggler>
      )}
    </>
  );
};

export default GeneralInput;
