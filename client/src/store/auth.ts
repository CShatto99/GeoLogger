import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { loadProfile, clearProfile } from './profile';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { Actions } from './types';

const auth = createSlice({
  name: 'auth',
  initialState: {
    user: {
      date: '',
      username: '',
      email: '',
      profileSetUp: false,
    },
    isAuth: false,
    loading: true,
  },
  reducers: {
    login_user: (state) => {
      localStorage.setItem('isAuth', 'true');
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
    logout_user: (state) => {
      localStorage.removeItem('isAuth');
      return {
        ...state,
        user: { date: '', username: '', email: '', profileSetUp: false },
        isAuth: false,
        loading: true,
      };
    },
  },
});

export default auth.reducer;

const { login_user, load_user, logout_user } = auth.actions;

export const loadUser: Actions['auth'] = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/user');

    console.log(data);
    dispatch(load_user(data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const login: Actions['auth'] = (user) => async (dispatch) => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/api/user', user, config);

    setAuthToken(data.accessToken);

    dispatch(loadUser());
    dispatch(loadProfile());
    dispatch(login_user());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const register: Actions['auth'] = (user) => async (dispatch) => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/api/user/register', user, config);

    setAuthToken(data.accessToken);

    dispatch(loadUser());
    dispatch(login_user());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const updateUser: Actions['auth'] = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put('/api/user', user, config);

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const refreshUser: Actions['auth'] = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/auth/token');

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

export const logout: Actions['auth'] = () => async (dispatch) => {
  try {
    dispatch(clearProfile());
    dispatch(logout_user());

    await axios.delete('/api/auth/logout');
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};
