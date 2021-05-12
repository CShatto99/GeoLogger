import React, { FC, useState } from 'react';
import styled from 'styled-components';
import PasswordLabel from '../auth/PasswordLabel';
import { PasswordInput } from '../styles/Inputs';
import Button, { DangerButton } from '../styles/Buttons';
import { DefaultLink } from '../styles/Links';

const ChangePassword = styled.div`
  margin-bottom: 2.5rem;

  & > form > a {
    margin-left: 0.5rem;
    font-size: 14px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.darkBorder};
  margin: 0.5rem 0 1rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const DeleteAccount = styled.div`
  & > p {
    margin-bottom: 0.5rem;
  }
`;

const Account: FC = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log({ oldPass, newPass, confirmPass });
  };

  return (
    <>
      <ChangePassword>
        <h3>Change password</h3>
        <Divider />
        <form onSubmit={onSubmit}>
          <FormGroup>
            <label>Old password</label>
            <PasswordInput value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <PasswordLabel />
            <PasswordInput value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Confirm password</label>
            <PasswordInput value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
          </FormGroup>
          <Button text="Change Password" disabled={!oldPass || !newPass || !confirmPass} />
          <DefaultLink to="/forgot-password">Forgot your password?</DefaultLink>
        </form>
      </ChangePassword>
      <DeleteAccount>
        <h3>Delete account</h3>
        <Divider />
        <p>This action is irreversible. Once you delete your account you can no longer recover it.</p>
        <DangerButton text="Delete Account" />
      </DeleteAccount>
    </>
  );
};

export default Account;
