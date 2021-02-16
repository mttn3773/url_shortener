import { ILink } from "./link.interface";
import { Document } from "mongoose";
export interface IUser extends Document {
  links?: ILink[];
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}
