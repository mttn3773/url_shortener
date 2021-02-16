import { INotifyPayload } from "../../interface/notifyGlobal.interface";
import { INotifyAction } from "../reducers/notify.reducer";
export const setNotify = (payload: INotifyPayload): INotifyAction => {
  return {
    type: "SET_NOTIFY",
    payload,
  };
};
