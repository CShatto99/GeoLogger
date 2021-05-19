import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/auth';
import { AuthContainer, AuthContent, FormContent, FooterContent } from './Register';
import { AuthInput, PasswordInput } from '../styles/Inputs';
import Brand from '../layout/Brand';
import Button from '../styles/Buttons';
import { DefaultLink, DangerLink } from '../styles/Links';
import Alert from '../styles/Alert';

const LoginFormContent = styled(FormContent)`
  & > .forgot-pass > a {
    float: right;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.25rem;
  }
`;

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const { ERR_login } = useAppSelector((state) => state.alert);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password,
      }),
    );
  };

  return isAuth && !user.profileSetUp ? (
    <Redirect to="/create" />
  ) : isAuth && user.profileSetUp ? (
    <Redirect to="/map" />
  ) : (
    <AuthContainer>
      <AuthContent>
        <LoginFormContent onSubmit={onSubmit}>
          <Brand />
          <h2>Log in to your account</h2>
          {ERR_login && <Alert type="error" msg={ERR_login} />}
          <div>
            <label>Email</label>
            <AuthInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="forgot-pass">
            <label>Password</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            <DefaultLink to="/forgot-password">Forgot Password?</DefaultLink>
          </div>
          <div>
            <Button disabled={!email || !password}>Login</Button>
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
