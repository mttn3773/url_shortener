import { ITokenPayload, ITokens } from "./../interfaces/tokens.interface";
import { sign } from "jsonwebtoken";
import config from "../config/config";
import { IUser } from "src/interfaces/user.interface";

export const createRefreshToken = (
  payload: IUser
): ITokens["refreshToken"] | undefined => {
  try {
    const refreshToken = sign(
      { userId: payload._id, email: payload.email } as ITokenPayload,
      config.jwt.refreshTokenSecret!,
      {
        expiresIn: "10d",
      }
    );
    return refreshToken;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const createAccessToken = (
  payload: IUser
): ITokens["accessToken"] | undefined => {
  try {
    const accessToken = sign(
      { userId: payload._id, email: payload.email } as ITokenPayload,
      config.jwt.accessTokenSecret!,
      {
        expiresIn: "10d",
      }
    );
    return accessToken;
  } catch (error) {
    console.log(error);
    return;
  }
};
