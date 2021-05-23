import { FC } from 'react';
import ReactTooltip from 'react-tooltip';
import { IoInformationCircle } from 'react-icons/io5';
import styled from 'styled-components';

export const PasswordLabelStyle = styled.div`
  display: flex;
  align-items: center;

  & > div {
    max-width: 300px;
    width: 100%;
  }

  & > svg {
    margin: 0 0 -2px 3px;
  }

  & > svg > path {
    fill: ${({ theme }) => theme.colors.dark};
  }
`;

const PasswordLabel: FC = () => {
  return (
    <PasswordLabelStyle>
      <label>Password</label>
      <IoInformationCircle data-tip data-for="pass-info" />
      <ReactTooltip id="pass-info" effect="solid" aria-haspopup="true">
        <small>
          Your password must contain at least 8 characters, 1 number, 1 lowercase letter, 1 uppercase letter, and 1
          special character.
        </small>
      </ReactTooltip>
    </PasswordLabelStyle>
  );
};

export default PasswordLabel;
