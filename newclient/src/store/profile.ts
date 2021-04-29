import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setAlert } from './alert';
import { Actions } from './types';

const profile = createSlice({
  name: 'profile',
  initialState: {
    profile: {
      date: '',
      theme: '',
      fillColor: '',
      mapStyle: '',
      visited: [],
      markers: [],
      user: {
        date: '',
        email: '',
        username: '',
      },
    },
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
    clear_profile: (state) => {
      return {
        ...state,
        profile: {
          date: '',
          theme: '',
          fillColor: '',
          mapStyle: '',
          visited: [],
          markers: [],
          user: {
            date: '',
            email: '',
            username: '',
          },
        },
        loading: true,
      };
    },
  },
});

export default profile.reducer;

const { load_profile, clear_profile } = profile.actions;

export const loadProfile: Actions['profile'] = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile`);
    res.data ? dispatch(load_profile(res.data)) : dispatch(load_profile({}));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
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
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const clearProfile: Actions['profile'] = () => (dispatch) => {
  dispatch(clear_profile());
};
