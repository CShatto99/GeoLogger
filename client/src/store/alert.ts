import { createSlice } from '@reduxjs/toolkit';
import { Actions } from './types';

const alert = createSlice({
  name: 'alert',
  initialState: {
    SUCC_change_password: '',
    ERR_change_password: '',
    ERR_delete_account: '',
    ERR_login: '',
    ERR_register: '',
    SUCC_contact: '',
    ERR_contact: '',
    SUCC_POPUP_IMG: '',
    status: undefined,
  },
  reducers: {
    set_alert: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        [action.payload.key]: action.payload.msg,
        status: action.payload.status,
      };
    },
    clear_alert: (state) => {
      return {
        ...state,
        SUCC_change_password: '',
        ERR_change_password: '',
        ERR_delete_account: '',
        ERR_login: '',
        ERR_register: '',
        SUCC_contact: '',
        ERR_contact: '',
        SUCC_POPUP_IMG: '',
        status: undefined,
      };
    },
  },
});

export default alert.reducer;

const { set_alert, clear_alert } = alert.actions;

export const setAlert: Actions['alert'] = (msg, key, status) => (dispatch) => {
  dispatch(set_alert({ msg, key, status }));
  setTimeout(() => dispatch(clear_alert()), 10000);
};

export const clearAlert: Actions['alert'] = () => (dispatch) => {
  dispatch(clear_alert());
};
