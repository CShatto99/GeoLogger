import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/auth';
import Brand from '../layout/Brand';
import GeneralInput from '../styles/GeneralInput';
import Button from '../styles/Buttons';
import { DefaultLink, DangerLink } from '../styles/Links';
import satelliteV9 from '../../img/satellite-v9.png';
import Alert from '../styles/Alert';

const LoginContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  background-image: url(${satelliteV9});
  background-repeat: no-repeat;
  background-size: cover;
  grid-template-columns: 1fr 1fr;

  & img {
    border-radius: 0;
  }
`;

const LoginContent = styled.div`
  height: 100vh;
  width: 484px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  padding: 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    color: ${({ theme }) => theme.colors.black};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`;

const FormContent = styled.form`
  width: 400px;

  & > h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 30px;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    margin-bottom: 2rem;
  }

  & > div {
    margin-bottom: 2rem;
  }

  & > div:first-child {
    margin-bottom: 4rem;
  }

  & > div:nth-child(4) a {
    float: right;
  }

  & > p {
    margin-top: 3rem;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`;

const FooterContent = styled.span`
  font-size: 14px;
  width: 400px;

  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoginInput = styled(GeneralInput)`
  padding: 0.5rem 0.25rem;
`;

const PasswordInput = styled(LoginInput)`
  margin-bottom: 0.25rem;

  & a {
    font-size: 14px !important;
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
    <LoginContainer>
      <LoginContent>
        <FormContent onSubmit={onSubmit}>
          <Brand />
          <h2>Log in to your account</h2>
          <div>
            <label>Email</label>
            <LoginInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <PasswordInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <DefaultLink to="/forgot-password">Forgot Password?</DefaultLink>
          </div>
          {msg && <Alert type="error" msg={msg} />}
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
        </FormContent>
        <FooterContent>
          &copy; GeoLogger {new Date().getFullYear()} &bull;{' '}
          <DefaultLink to="/terms-conditions">Terms &#38; Conditions</DefaultLink>
        </FooterContent>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;
