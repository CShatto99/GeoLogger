import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import profile from './profile';
import auth from './auth';
import alert from './alert';

const rootReducer = combineReducers({
  profile,
  auth,
  alert,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
