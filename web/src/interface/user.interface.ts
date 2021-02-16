import { ILink } from "./link.interface";

export interface IUsers {
  users: IUser[];
}

export interface IUser {
  _id: string;
  links?: ILink[];
  email: string;
  created_at: Date;
  updated_at: Date;
}
