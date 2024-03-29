import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { login } from '../../../store/auth';
import { AuthContainer, AuthContent, FormContent, FooterContent } from '../register/Register';
import { AuthInput, PasswordInput } from '../../common/Inputs';
import Brand from '../../common/Brand';
import Button from '../../common/Buttons';
import { DefaultLink, DangerLink } from '../../common/Links';
import Alert from '../../common/Alert';

const LoginFormContent = styled(FormContent)`
  & > .forgot-pass > a {
    float: right;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.25rem;
  }
`;

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { ERR_LOGIN } = useAppSelector((state) => state.alert);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      login({
        identifier,
        password,
      }),
    );
  };

  return (
    <AuthContainer>
      <AuthContent>
        <LoginFormContent onSubmit={onSubmit}>
          <Brand />
          <h2>Log in to your account</h2>
          <Alert type="error" msg={ERR_LOGIN} />
          <div>
            <label>Username or email</label>
            <AuthInput type="text" value={identifier} maxLength={100} onChange={(e) => setIdentifier(e.target.value)} />
          </div>
          <div className="forgot-pass">
            <label>Password</label>
            <PasswordInput value={password} maxLength={100} onChange={(e) => setPassword(e.target.value)} />
            <DefaultLink to="/forgot-password">Forgot Password?</DefaultLink>
          </div>
          <div>
            <Button disabled={!identifier || !password}>Login</Button>
            <DangerLink to="/">Cancel</DangerLink>
          </div>
          <p>
            Don&apos;t have an account?{' '}
            <DefaultLink to="/register" className="std-link">
              Register
            </DefaultLink>
          </p>
        </LoginFormContent>
        <FooterContent>
          &copy; GeoLogger {new Date().getFullYear()} &bull;{' '}
          <DefaultLink to="/terms-conditions">Terms &#38; Conditions</DefaultLink>
        </FooterContent>
      </AuthContent>
    </AuthContainer>
  );
};

export default Login;
