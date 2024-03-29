import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { changePassword, deleteUser } from '../../../store/auth';
import GLModal from '../../common/GLModal';
import { PasswordInput } from '../../common/Inputs';
import Button, { DangerButton } from '../../common/Buttons';
import { DefaultLink } from '../../common/Links';
import Alert from '../../common/Alert';

const ChangePassword = styled.div`
  margin: 1rem 0 2.5rem 0;

  & > form > a {
    margin-left: 0.5rem;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
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
    margin-top: 0.5rem;
  }
`;

const ModalFormGroup = styled.div`
  margin: 1rem 0 0.5rem 0;

  & > label {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

const Account: FC = () => {
  const dispatch = useAppDispatch();

  const { SUCC_CHANGE_PASSWORD, ERR_CHANGE_PASSWORD, ERR_DELETE_ACCOUNT } = useAppSelector((state) => state.alert);
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
      <Alert type="success" msg={SUCC_CHANGE_PASSWORD} />
      <Alert type="error" msg={ERR_CHANGE_PASSWORD} />
      <ChangePassword>
        <h3>Change password</h3>
        <Divider />
        <form onSubmit={onSubmit}>
          <FormGroup>
            <label>Password</label>
            <PasswordInput value={oldPass} maxLength={100} onChange={(e) => setOldPass(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>New Password</label>
            <PasswordInput value={password} maxLength={100} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Confirm password</label>
            <PasswordInput value={confirmPass} maxLength={100} onChange={(e) => setConfirmPass(e.target.value)} />
          </FormGroup>
          <Button disabled={!oldPass || !password || !confirmPass} onClick={onSubmit}>
            Change Password
          </Button>
          <DefaultLink to="/forgot-password">Forgot your password?</DefaultLink>
        </form>
      </ChangePassword>
      <DeleteAccount>
        <h3>Delete account</h3>
        <Divider />
        <p>This action is irreversible. Once you delete your account you can no longer recover it.</p>
        <DangerButton onClick={() => setIsOpen(!isOpen)}>Delete Account</DangerButton>
        <GLModal
          title="Are you sure you want to delete your account?"
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        >
          <ModalBody>
            <p>
              Once you delete your account, you will be logged out and all data associated with your account will be
              unrecoverable.
            </p>
            <ModalFormGroup>
              <label>Enter your password:</label>
              <PasswordInput value={deletePass} maxLength={100} onChange={(e) => setDeletePass(e.target.value)} />
            </ModalFormGroup>
            <Alert type="error" msg={ERR_DELETE_ACCOUNT} />
            <DangerButton disabled={!deletePass} onClick={() => dispatch(deleteUser({ deletePass }))}>
              Delete My Account
            </DangerButton>
          </ModalBody>
        </GLModal>
      </DeleteAccount>
    </>
  );
};

export default Account;
