import {
  INotifyPayload,
  INotifyState,
} from "../../interface/notifyGlobal.interface";

export interface INotifyAction {
  type: string;
  payload: INotifyPayload;
}

export const notifyReducer = (
  state: INotifyState = { errors: [], loading: false },
  action: INotifyAction
): INotifyState => {
  switch (action.type) {
    case "SET_NOTIFY":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
