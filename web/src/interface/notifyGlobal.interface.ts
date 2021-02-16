import { IErrors } from "./errors.interface";

export interface INotifyState {
  errors: IErrors["errors"];
  loading: boolean;
}
export interface INotifyPayload {
  errors?: INotifyState["errors"];
  loading?: INotifyState["loading"];
}
