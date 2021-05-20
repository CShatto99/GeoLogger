import { FC, useState } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import styled from 'styled-components';

export const GeneralInputStyle = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  transition: ease-out 100ms;
  background-color: ${({ theme }) => theme.colors.input};
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  -webkit-border-radius: 0px;
  border-radius: 0.3rem;
  box-sizing: border-box;
  margin-top: 0.25rem;
  padding: 0.25rem;

  &:focus {
    transition: ease-in 100ms;
    outline: none;
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
    -webkit-box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const AuthInputStyle = styled(GeneralInputStyle)`
  padding: 0.5rem 0.25rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Toggler = styled.div`
  height: 24px;
  background-color: ${({ theme }) => theme.colors.input};
  display: grid;
  place-items: center;
  position: absolute;
  right: 1px;
  padding: 0 0.5rem 0 0.25rem;
  margin-top: -30px;

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
    <InputContainer>
      <AuthInputStyle
        type={passVisible ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Toggler onClick={() => setPassVisible(!passVisible)}>
        {value && (passVisible ? <IoMdEye /> : <IoMdEyeOff />)}
      </Toggler>
    </InputContainer>
  );
};

export default GeneralInput;
