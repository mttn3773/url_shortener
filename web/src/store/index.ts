import { allReducers } from "./reducers/index";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
export const store = createStore(allReducers, composeWithDevTools());
