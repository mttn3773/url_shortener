import { IUser } from "./user.interface";

export interface IAuthState {
  user?: IUser;
}

export interface IAuthPayload {
  user?: IUser;
}
