import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { loadProfile, clearProfile } from "./profile";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

const auth = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuth: false,
    loading: true,
  },
  reducers: {
    login_user: (state, action) => {
      localStorage.setItem("isAuth", "true");
      return {
        ...state,
        isAuth: true,
        loading: false,
      };
    },
    load_user: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false,
      };
    },
    logout_user: (state, action) => {
      localStorage.removeItem("isAuth");
      return {
        ...state,
        user: {},
        isAuth: false,
        loading: true,
      };
    },
  },
});

export default auth.reducer;

const { login_user, load_user, logout_user } = auth.actions;

export const loadUser = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/user");
    dispatch(load_user(data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const login = user => async dispatch => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/api/user", user, config);

    setAuthToken(data.accessToken);

    dispatch(loadUser());
    dispatch(loadProfile());
    dispatch(login_user());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const register = user => async dispatch => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post("/api/user/register", user, config);

    setAuthToken(data.accessToken);

    dispatch(loadUser());
    dispatch(login_user());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const refreshUser = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/auth/token");

    setAuthToken(data.accessToken);

    if (data.accessToken) {
      dispatch(loadUser());
      dispatch(loadProfile());
      dispatch(login_user());
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(clearProfile());
    dispatch(logout_user());

    await axios.delete("/api/auth/logout");
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};
