import { IError } from "./../interfaces/error.interface";
import { NextFunction, Request, Response } from "express";
import Link from "../models/link.model";

export const handleRedirect = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const code = req.params.code;

    const link = await Link.findOne({ code });
    if (!link) {
      return res
        .status(500)
        .send({ errors: [{ msg: "Couldnt find a link" }] as IError[] });
    }
    link.clicks++;
    link.save();
    return res.status(301).redirect(`${link.to}`);
  } catch (error) {
    return res.status(500).send({ error }).end();
  }
};
