import { FC, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { IoInformationCircle } from 'react-icons/io5';
import styled from 'styled-components';
import GLModal from '../GLModal';

export const PasswordLabelStyle = styled.div`
  display: flex;
  align-items: center;

  & > div {
    max-width: 300px;
    width: 100%;
  }

  & > svg {
    margin: 0 0 0px 3px;
    cursor: pointer;
  }

  & > svg > path {
    fill: ${({ theme }) => theme.colors.dark};
    transition: fill ease-out 100ms;
  }

  & > svg:hover > path {
    fill: ${({ theme }) => theme.colors.primary};
    transition: fill ease-in 100ms;
  }
`;

const Requirement = styled.li`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 0.5rem;
  }
`;

const PasswordLabel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PasswordLabelStyle>
      <label>Password</label>
      <IoInformationCircle onClick={() => setIsOpen(true)} />
      <GLModal isOpen={isOpen} title="Password Requirements" onClose={() => setIsOpen(false)}>
        <ul>
          <Requirement>
            <BsCheck />
            At least 8 characters
          </Requirement>
          <Requirement>
            <BsCheck />
            At least 1 number
          </Requirement>
          <Requirement>
            <BsCheck />
            One uppercase + lowercase character
          </Requirement>
          <Requirement>
            <BsCheck />
            At least 1 special character
          </Requirement>
        </ul>
      </GLModal>
    </PasswordLabelStyle>
  );
};

export default PasswordLabel;
