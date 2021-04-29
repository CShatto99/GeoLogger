import { createSlice } from '@reduxjs/toolkit';
import { Action } from './types';

const alert = createSlice({
  name: 'alert',
  initialState: {
    msg: '',
    status: '',
  },
  reducers: {
    set_alert: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
      };
    },
    clear_alert: (state) => {
      return {
        ...state,
        msg: '',
        status: '',
      };
    },
  },
});

export default alert.reducer;

const { set_alert, clear_alert } = alert.actions;

export const setAlert: Action = (msg, status) => (dispatch) => {
  dispatch(set_alert({ msg, status }));
  setTimeout(() => dispatch(clear_alert()), 4000);
};

export const clearAlert: Action = () => (dispatch) => {
  dispatch(clear_alert());
};
