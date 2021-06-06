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
  -webkit-appearance: none;
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

export const TextareaStyle = styled.textarea`
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

  & > input {
    padding-right: 2rem;
  }
`;

const Toggler = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  right: 0;
  padding: 0 0.5rem 0 0;
  margin-top: -26px;

  & > svg:hover {
    cursor: pointer;
  }

  & > svg > path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

type InputProps = {
  type?: string;
  value?: string | number | readonly string[];
  placeholder?: string;
  maxLength?: number;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onTextareaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const GeneralInput: FC<InputProps> = ({ style, type, value, placeholder, maxLength, onChange }: InputProps) => (
  <GeneralInputStyle
    style={style}
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    maxLength={maxLength}
  />
);

export const AuthInput: FC<InputProps> = ({ style, type, value, placeholder, maxLength, onChange }: InputProps) => (
  <AuthInputStyle
    style={style}
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    maxLength={maxLength}
  />
);

export const PasswordInput: FC<InputProps> = ({ style, value, placeholder, maxLength, onChange }: InputProps) => {
  const [passVisible, setPassVisible] = useState(false);

  return (
    <InputContainer>
      <AuthInputStyle
        style={style}
        type={passVisible ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
      />
      <Toggler onClick={() => setPassVisible(!passVisible)}>
        {value && (passVisible ? <IoMdEye /> : <IoMdEyeOff />)}
      </Toggler>
    </InputContainer>
  );
};

export const Textarea: FC<InputProps> = ({ value, placeholder, maxLength, onTextareaChange }: InputProps) => (
  <TextareaStyle
    value={value}
    placeholder={placeholder}
    onChange={onTextareaChange}
    maxLength={maxLength}
  ></TextareaStyle>
);

export default GeneralInput;
