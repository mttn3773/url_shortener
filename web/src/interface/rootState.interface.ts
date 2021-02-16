import { IAuthState } from "./authGlobal.interface";
import { INotifyState } from "./notifyGlobal.interface";
export interface IRootState {
  notifyReducer: INotifyState;
  authReducer: IAuthState;
}
