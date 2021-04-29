import { FC, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { register } from '../../store/auth';
// import '../../css/authForm.css';

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const { msg } = useAppSelector((state) => state.alert);
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passVerify: '',
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
      username: state.username,
      email: state.email,
      password: state.password,
      passVerify: state.passVerify,
    };

    dispatch(register(user));
  };

  if (isAuth && JSON.stringify(profile) === '{}') return <Redirect to="/create" />;
  else if (isAuth && JSON.stringify(profile) !== '{}') return <Redirect to="/map" />;

  return (
    <div className="form-div">
      <div className="form-div-inner">
        {msg && <div className="err-div">{msg}</div>}
        <div className="form-title">
          <h2>Register</h2>
          <p>* required</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label>
              Username<span className="text-red-600"> *</span>
            </label>
            <input type="text" name="username" className="cust-input" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-3">
            <label>
              Email<span className="text-red-600"> *</span>
            </label>
            <input type="email" name="email" className="cust-input" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-3">
            <label>
              Password<span className="text-red-600"> *</span>
            </label>
            <input type="password" name="password" className="cust-input" onChange={(e) => onChange(e)} />
          </div>
          <div className="mb-3">
            <label>
              Verify Password<span className="text-red-600"> *</span>
            </label>
            <input type="password" name="passVerify" className="cust-input" onChange={(e) => onChange(e)} />
          </div>
          <div className="flex items-center">
            <button className="gen-btn form-btn">Register</button>
            <Link to="/" className="gen-btn danger-btn">
              Cancel
            </Link>
          </div>
          <p className="mt-2 mb-0">
            Already have an account?{' '}
            <Link to="/login" className="std-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
