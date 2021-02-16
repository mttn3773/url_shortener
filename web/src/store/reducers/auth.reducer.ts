import { IAuthPayload } from "./../../interface/authGlobal.interface";
import { IAuthState } from "../../interface/authGlobal.interface";

export interface IAuthAction {
  type: string;
  payload: IAuthPayload;
}

export const authReducer = (
  state: IAuthState = {},
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
