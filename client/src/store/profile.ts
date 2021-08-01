import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setAlert } from './alert';
import { Actions } from './types';

const profile = createSlice({
  name: 'profile',
  initialState: {
    profile: {
      _id: '',
      pfp: '',
      bio: '',
      theme: '',
      fillColor: '',
      mapStyle: '',
      visited: [],
      markers: [],
    },
    publicProfile: {
      username: '',
      email: '',
      date: '',
      pfp: '',
      bio: '',
      visited: [],
      markers: [],
    },
    actionsStatus: [false, false, false, false],
    loading: true,
  },
  reducers: {
    load_profile: (state, action) => {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    },
    load_public_profile: (state, action) => {
      return {
        ...state,
        publicProfile: action.payload,
        loading: false,
      };
    },
    clear_profile: (state) => {
      return {
        ...state,
        profile: {
          _id: '',
          pfp: '',
          bio: '',
          theme: '',
          fillColor: '',
          mapStyle: '',
          visited: [],
          markers: [],
        },
        publicProfile: {
          username: '',
          email: '',
          date: '',
          pfp: '',
          bio: '',
          visited: [],
          markers: [],
        },
        actionsStatus: [false, false, false, false],
        loading: true,
      };
    },
    update_actions: (state, action) => {
      return {
        ...state,
        actionsStatus: action.payload,
        loading: false,
      };
    },
  },
});

export default profile.reducer;

const { load_profile, load_public_profile, clear_profile, update_actions } = profile.actions;

export const loadProfile: Actions['profile'] = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile`);
    dispatch(load_profile(res.data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_LOAD_PROFILE', err.response.status));
  }
};

export const updateProfile: Actions['profile'] = (profile) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post('/api/profile', profile, config);

    dispatch(load_profile(data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_UPDATE_PROFILE', err.response.status));
  }
};

export const getPublicProfile: Actions['profile'] = (username) => async (dispatch) => {
  try {
    const {
      data: { user, profile },
    } = await axios.get(`/api/profile/${username}`);

    dispatch(load_public_profile({ ...user, ...profile }));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'ERR_LOAD_PROFILE', err.response.status));
  }
};

export const updateMapActionStatus: Actions['profile'] = (newActionsStatus) => (dispatch) => {
  dispatch(update_actions(newActionsStatus));
};

export const clearProfile: Actions['profile'] = () => (dispatch) => {
  dispatch(clear_profile());
};
