import { createSlice } from '@reduxjs/toolkit';
import { Actions } from './types';

const alert = createSlice({
  name: 'alert',
  initialState: {
    SUCC_CHANGE_PASSWORD: '',
    SUCC_POPUP_IMG: '',
    ERR_CONTACT: '',
    ERR_CHANGE_PASSWORD: '',
    ERR_DELETE_ACCOUNT: '',
    ERR_LOGIN: '',
    ERR_REGISTER: '',
    SUCC_CONTACT: '',
    ERR_AUTHORIZE: '',
    ERR_LOAD_PROFILE: '',
    ERR_UPDATE_PROFILE: '',
    ERR_LOAD_USERS: '',
    status: undefined,
  },
  reducers: {
    set_alert: (state, action) => {
      const { msg, key, status } = action.payload;
      return {
        ...state,
        [key]: msg,
        status,
      };
    },
    clear_alert: (state) => {
      return {
        ...state,
        SUCC_CHANGE_PASSWORD: '',
        SUCC_POPUP_IMG: '',
        SUCC_CONTACT: '',
        ERR_CHANGE_PASSWORD: '',
        ERR_DELETE_ACCOUNT: '',
        ERR_LOGIN: '',
        ERR_REGISTER: '',
        ERR_CONTACT: '',
        ERR_AUTHORIZE: '',
        ERR_LOAD_PROFILE: '',
        ERR_UPDATE_PROFILE: '',
        ERR_LOAD_USERS: '',
        status: undefined,
      };
    },
  },
});

export default alert.reducer;

const { set_alert, clear_alert } = alert.actions;

export const setAlert: Actions['alert'] = (msg, key, status) => (dispatch) => {
  if (status === 401) {
    dispatch(
      set_alert({
        msg: 'Your session expired, try refreshing the page and trying again',
        key: 'ERR_AUTHORIZE',
        status,
      }),
    );
  } else {
    dispatch(set_alert({ msg, key, status }));
  }
};

export const clearAlert: Actions['alert'] = () => (dispatch) => {
  dispatch(clear_alert());
};
