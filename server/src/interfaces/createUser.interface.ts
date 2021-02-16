import { IUser } from "./user.interface";

export interface ICreateUser {
  email: IUser["email"];
  password: IUser["password"];
}
