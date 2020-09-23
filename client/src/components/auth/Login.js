import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth";
import { clearAlert } from "../../store/alert";
import "../../css/authForm.css";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { msg } = useSelector(state => state.alert);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: state.email,
      password: state.password,
    };

    dispatch(login(user));
  };

  if (isAuth) return <Redirect to="/map" />;

  if (msg)
    setTimeout(() => {
      dispatch(clearAlert());
    }, 4000);

  return (
    <div className="form-div">
      <div className="form-div-inner">
        {msg && <div className="err-div">{msg}</div>}
        <div className="form-title">
          <h2>Login</h2>
          <p>* required</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label>
              Email<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              name="email"
              className="cust-input"
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-3">
            <label>
              Password<span className="text-red-600"> *</span>
            </label>
            <input
              type="password"
              name="password"
              className="cust-input"
              onChange={e => onChange(e)}
            />
          </div>
          <div className="flex items-center">
            <button className="gen-btn form-btn">Login</button>
            <Link to="/" className="gen-btn danger-btn">
              Cancel
            </Link>
          </div>
          <p className="mt-2 mb-0">
            Don't have an account?{" "}
            <Link to="/register" className="std-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
