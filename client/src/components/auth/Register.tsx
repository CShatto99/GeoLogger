import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { IoInformationCircle } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '../../store';
import { register } from '../../store/auth';
import Brand from '../layout/Brand';
import { AuthInput, PasswordInput } from '../styles/Inputs';
import Button from '../styles/Buttons';
import { DefaultLink, DangerLink } from '../styles/Links';
import satelliteV9 from '../../img/satellite-v9.png';
import Alert from '../styles/Alert';

export const AuthContainer = styled.div`
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

export const AuthContent = styled.div`
  height: 100vh;
  width: 484px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  padding: 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & a {
    color: ${({ theme }) => theme.colors.black};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    padding: 2rem;
  }
`;

export const FormContent = styled.form`
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
    color: ${({ theme }) => theme.colors.black};
  }

  & > p {
    margin-top: 3rem;
  }

  & > p > a {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`;

export const FooterContent = styled.span`
  font-size: 14px;
  width: 400px;

  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PasswordLabel = styled.div`
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

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const { msg } = useAppSelector((state) => state.alert);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVerify, setPassVerify] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      register({
        username,
        email,
        password,
        passVerify,
      }),
    );
  };

  if (isAuth && JSON.stringify(profile) === '{}') return <Redirect to="/create" />;
  else if (isAuth && JSON.stringify(profile) !== '{}') return <Redirect to="/map" />;

  return (
    <AuthContainer>
      <AuthContent>
        <FormContent onSubmit={onSubmit}>
          <Brand />
          <h2>Create an accoount</h2>
          {msg && <Alert type="error" msg={msg} />}
          <div>
            <label>Username</label>
            <AuthInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <AuthInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <PasswordLabel>
              <label>Password</label>
              <IoInformationCircle data-tip data-for="pass-info" />
              <ReactTooltip id="pass-info" aria-haspopup="true">
                <small>
                  Your password must contain at least 8 characters, 1 number, 1 lowercase letter, 1 uppercase letter,
                  and 1 special character.
                </small>
              </ReactTooltip>
            </PasswordLabel>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Verify Password</label>
            <PasswordInput value={passVerify} onChange={(e) => setPassVerify(e.target.value)} />
          </div>
          <div>
            <Button disabled={!username || !email || !password || !passVerify} text="Register" />
            <DangerLink to="/">Cancel</DangerLink>
          </div>
          <p>
            Already have an account?{' '}
            <DefaultLink to="/login" className="std-link">
              Login
            </DefaultLink>
          </p>
        </FormContent>
        <FooterContent>
          &copy; GeoLogger {new Date().getFullYear()} &bull;{' '}
          <DefaultLink to="/terms-conditions">Terms &#38; Conditions</DefaultLink>
        </FooterContent>
      </AuthContent>
    </AuthContainer>
  );
};

export default Register;
