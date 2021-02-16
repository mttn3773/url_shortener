import { IUser } from "./user.interface";
import { Document } from "mongoose";
export interface ILink extends Document {
  owner: IUser;
  from: string;
  to: string;
  created_at: Date;
  updated_at: Date;
  clicks: number;
  code: string;
}
