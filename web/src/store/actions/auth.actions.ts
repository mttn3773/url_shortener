import { IAuthState, IAuthPayload } from "../../interface/authGlobal.interface";
import { IAuthAction } from "../reducers/auth.reducer";
export const setUser = (payload: IAuthPayload): IAuthAction => {
  return {
    type: "SET_USER",
    payload,
  };
};
