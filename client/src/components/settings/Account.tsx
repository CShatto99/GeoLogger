import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { changePassword } from '../../store/auth';
import GeoLoggerModal from '../GeoLoggerModal';
import PasswordLabel from '../auth/PasswordLabel';
import { PasswordInput } from '../styles/Inputs';
import Button, { DangerButton } from '../styles/Buttons';
import { DefaultLink } from '../styles/Links';
import Alert from '../styles/Alert';

const ChangePassword = styled.div`
  margin: 1rem 0 2.5rem 0;

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

const ModalBody = styled.div`
  & > p {
    color: ${({ theme }) => theme.colors.danger};
  }

  & > button {
    width: 100%;
  }
`;

const ModalFormGroup = styled.div`
  margin: 1rem 0;

  & > label {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

const Account: FC = () => {
  const dispatch = useAppDispatch();
  const { msg, status } = useAppSelector((state) => state.alert);
  const [isOpen, setIsOpen] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [deletePass, setDeletePass] = useState('');

  useEffect(() => {
    !isOpen && setDeletePass('');
  }, [isOpen]);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(changePassword({ oldPass, password, confirmPass }));
  };

  return (
    <>
      <h1 style={{ marginBottom: '2rem' }}>Account</h1>
      {msg && <Alert type={status === 200 ? 'success' : 'error'} msg={msg} />}
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
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Confirm password</label>
            <PasswordInput value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
          </FormGroup>
          <Button text="Change Password" disabled={!oldPass || !password || !confirmPass} onClick={onSubmit} />
          <DefaultLink to="/forgot-password">Forgot your password?</DefaultLink>
        </form>
      </ChangePassword>
      <DeleteAccount>
        <h3>Delete account</h3>
        <Divider />
        <p>This action is irreversible. Once you delete your account you can no longer recover it.</p>
        <DangerButton text="Delete Account" onClick={() => setIsOpen(!isOpen)} />
        <GeoLoggerModal
          title="Are you sure you want to delete your account?"
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        >
          <ModalBody>
            <p>* If you delete your account, all data associated with your account will be unrecoverable.</p>
            <ModalFormGroup>
              <label>Enter your password:</label>
              <PasswordInput value={deletePass} onChange={(e) => setDeletePass(e.target.value)} />
            </ModalFormGroup>
            <DangerButton text="Delete My Account" disabled={!deletePass} onClick={() => setIsOpen(!isOpen)} />
          </ModalBody>
        </GeoLoggerModal>
      </DeleteAccount>
    </>
  );
};

export default Account;