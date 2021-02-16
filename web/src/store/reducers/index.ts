import { authReducer } from "./auth.reducer";
import { notifyReducer } from "./notify.reducer";
import { combineReducers } from "redux";

export const allReducers = combineReducers({
  notifyReducer,
  authReducer,
});
