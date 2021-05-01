import React, { FC, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/auth';

const LoginContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.success};
`;

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const { msg } = useAppSelector((state) => state.alert);
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user = {
      email: state.email,
      password: state.password,
    };

    dispatch(login(user));
  };

  if (isAuth && JSON.stringify(profile) === '{}') return <Redirect to="/create" />;
  else if (isAuth && JSON.stringify(profile) !== '{}') return <Redirect to="/map" />;

  return (
    <LoginContainer>
      <div>
        {msg && <div>{msg}</div>}
        <div>
          <h2>Login</h2>
          <p>* required</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label>
              Email<span className="text-red-600"> *</span>
            </label>
            <input type="text" name="email" className="cust-input" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-3">
            <label>
              Password<span className="text-red-600"> *</span>
            </label>
            <input type="password" name="password" className="cust-input" onChange={(e) => onChange(e)} />
          </div>
          <div className="flex items-center">
            <button className="gen-btn form-btn">Login</button>
            <Link to="/" className="gen-btn danger-btn">
              Cancel
            </Link>
          </div>
          <p className="mt-2 mb-0">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="std-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    </LoginContainer>
  );
};

export default Login;
