import { IError } from "./../interfaces/error.interface";
import { NextFunction, Request, Response } from "express";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.session.user;
    if (!user) return next();
    return res
      .status(401)
      .send({
        error: {
          msg: "Not authenticated",
          param: "authentication",
        } as IError,
      })
      .end();
    return next();
  } catch (e) {
    return res
      .status(500)
      .send({
        errors: [{ msg: e.message, param: "authentication" }] as IError[],
      })
      .end();
  }
};
