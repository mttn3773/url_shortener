import { IUser } from "./interfaces/user.interface";
import { Session, SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    views: number;
    user?: IUser;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
