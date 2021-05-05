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
  & > div:nth-child(4) a {
    float: right;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.25rem;
  }
`;

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const { msg } = useAppSelector((state) => state.alert);
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

  if (isAuth && JSON.stringify(profile) === '{}') return <Redirect to="/create" />;
  else if (isAuth && JSON.stringify(profile) !== '{}') return <Redirect to="/map" />;

  return (
    <AuthContainer>
      <AuthContent>
        <LoginFormContent onSubmit={onSubmit}>
          <Brand />
          {msg && <Alert type="error" msg={msg} />}
          <h2>Log in to your account</h2>
          <div>
            <label>Email</label>
            <AuthInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            <DefaultLink to="/forgot-password">Forgot Password?</DefaultLink>
          </div>

          <div>
            <Button disabled={!email || !password} text="Login" />
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