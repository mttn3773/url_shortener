import { IUser } from "./user.interface";

export interface ILink {
  _id: string;
  owner: IUser;
  from: string;
  to: string;
  created_at: Date;
  updated_at: Date;
  clicks: number;
  code: string;
}
