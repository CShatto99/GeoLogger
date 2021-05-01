import styled from 'styled-components';

const GeneralInput = styled.input`
  width: 100%;
  color: #1a202c;
  border-radius: 0.2rem;
  box-shadow: 0 0 1pt 0 #1a202c;
  transition: ease-out 100ms;
  border: none;
  margin-bottom: 1rem;
  box-sizing: border-box;
  padding: 0.25rem;

  &:focus {
    transition: ease-in 100ms;
    outline: none;
    box-shadow: 0 0 3pt 1pt #4299e1;
  }

  &::placeholder {
    color: #b8b8b8;
  }
`;

export default GeneralInput;
