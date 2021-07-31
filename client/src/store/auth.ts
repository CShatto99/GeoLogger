import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { loadProfile, clearProfile } from './profile';
import { clearAlert, setAlert } from './alert';
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
    users: [],
    isAuth: false,
    loading: true,
  },
  reducers: {
    action_started: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    action_ended: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    login_user: (state) => {
      localStorage.setItem('gl_is_auth', 'true');
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
      localStorage.removeItem('gl_is_auth');
      return {
        ...state,
        user: { date: '', username: '', email: '', profileSetUp: false },
        users: [],
        isAuth: false,
        loading: true,
      };
    },
    load_users: (state, action) => {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    },
  },
});

export default auth.reducer;

const { login_user, load_user, logout_user, load_users, action_ended, action_started } = auth.actions;

export const loadUser: Actions['auth'] = () => async (dispatch) => {
  try {
    dispatch(action_started());
    const { data } = await axios.get('/api/user');

    dispatch(load_user(data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
  dispatch(action_ended());
};

export const login: Actions['auth'] = (user) => async (dispatch) => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(action_started());
    const { data } = await axios.post('/api/user', user, config);

    setAuthToken(data.accessToken);

    dispatch(loadUser());
    dispatch(loadProfile());
    dispatch(login_user());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_LOGIN', err.response.status));
  }
  dispatch(action_ended());
};

export const register: Actions['auth'] = (user) => async (dispatch) => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(action_started());
    const { data } = await axios.post('/api/user/register', user, config);

    setAuthToken(data.accessToken);

    dispatch(loadUser());
    dispatch(login_user());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_REGISTER', err.response.status));
  }
  dispatch(action_ended());
};

export const updateUser: Actions['auth'] = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(action_started());
    const { data } = await axios.put('/api/user', user, config);

    dispatch(load_user(data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
  dispatch(action_ended());
};

export const changePassword: Actions['auth'] = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(action_started());
    const { data } = await axios.put('/api/user/reset-password', body, config);

    dispatch(load_user(data));
    dispatch(setAlert('Password reset successfully!', 'SUCC_CHANGE_PASSWORD', 200));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_CHANGE_PASSWORD', err.response.status));
  }
  dispatch(action_ended());
};

export const refreshUser: Actions['auth'] = () => async (dispatch) => {
  try {
    dispatch(action_started());
    const { data } = await axios.get('/api/auth/token');

    setAuthToken(data.accessToken);

    if (data.accessToken) {
      dispatch(loadUser());
      dispatch(loadProfile());
      dispatch(login_user());
      dispatch(clearAlert());
    } else {
      dispatch(logout());
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
  dispatch(action_ended());
};

export const logout: Actions['auth'] = () => async (dispatch) => {
  try {
    dispatch(action_started());
    dispatch(clearProfile());
    dispatch(logout_user());

    await axios.delete('/api/auth/logout');
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
  dispatch(action_ended());
};

export const deleteUser: Actions['auth'] = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(action_started());
    await axios.delete('/api/user/delete-user', { data: body, headers: config });
    dispatch(logout());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_DELETE_ACCOUNT', err.response.status));
  }
  dispatch(action_ended());
};

export const loadUsers: Actions['auth'] = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/user/users');

    dispatch(load_users(data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_LOAD_USERS', err.response.status));
  }
};
