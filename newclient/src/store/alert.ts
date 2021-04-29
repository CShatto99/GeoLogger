import { createSlice } from '@reduxjs/toolkit';
import { Actions } from './types';

const alert = createSlice({
  name: 'alert',
  initialState: {
    msg: '',
    status: 0,
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
        status: 0,
      };
    },
  },
});

export default alert.reducer;

const { set_alert, clear_alert } = alert.actions;

export const setAlert: Actions['alert'] = (msg, status) => (dispatch) => {
  dispatch(set_alert({ msg, status }));
  setTimeout(() => dispatch(clear_alert()), 4000);
};

export const clearAlert: Actions['alert'] = () => (dispatch) => {
  dispatch(clear_alert());
};
