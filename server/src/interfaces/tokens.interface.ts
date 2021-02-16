import { IUser } from "src/interfaces/user.interface";
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  email: IUser["email"];
  userId: string;
}
