import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import profile from "./profile";
import auth from "./auth";
import alert from "./alert";

const reducer = combineReducers({
  profile,
  auth,
  alert,
});

const store = configureStore({ reducer });

export default store;
