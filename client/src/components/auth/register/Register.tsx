import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { register } from '../../../store/auth';
import Brand from '../../common/Brand';
import { AuthInput, PasswordInput } from '../../common/Inputs';
import Button from '../../common/Buttons';
import { DefaultLink, DangerLink } from '../../common/Links';
import satellite from '../../../assets/img/satellite.png';
import Alert from '../../common/Alert';

export const AuthContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url(${satellite});
  background-repeat: no-repeat;
  background-size: cover;
  grid-template-columns: 1fr 1fr;

  & img {
    border-radius: 0;
  }
`;

export const AuthContent = styled.div`
  min-height: 100vh;
  width: 468px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & a {
    color: ${({ theme }) => theme.colors.black};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    padding: 1rem;
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
    margin-bottom: 3rem;
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

    & > div:first-child {
      margin-bottom: 2rem;
    }

    & > p {
      margin-top: 2rem;
    }
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

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { ERR_REGISTER } = useAppSelector((state) => state.alert);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      register({
        username,
        email,
        password,
        confirmPass,
      }),
    );
  };

  return (
    <AuthContainer>
      <AuthContent>
        <FormContent onSubmit={onSubmit}>
          <Brand />
          <h2>Create an accoount</h2>
          <Alert type="error" msg={ERR_REGISTER} />
          <div>
            <label>Username</label>
            <AuthInput type="text" value={username} maxLength={15} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <AuthInput type="email" value={email} maxLength={100} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <PasswordInput value={password} maxLength={100} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Verify Password</label>
            <PasswordInput value={confirmPass} maxLength={100} onChange={(e) => setconfirmPass(e.target.value)} />
          </div>
          <div>
            <Button disabled={!username || !email || !password || !confirmPass}>Register</Button>
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
