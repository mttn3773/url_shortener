import { ICreateLink } from "./../interfaces/createLink.interface";
import Link from "../models/link.model";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import shortid from "shortid";
import config from "../config/config";

export const findAllLinks = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const user = req.session.user;
    const links = await Link.find({ owner: user?._id });
    return res.send({ links }).end();
  } catch (error) {
    return res.status(500).send({ error }).end();
  }
};

export const findLinkById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const id = req.params.id;
    const link = await Link.findById(id);
    return res.send({ link }).end();
  } catch (error) {
    return res.status(500).send({ error }).end();
  }
};

export const generate = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { to } = req.body;
    const code = shortid.generate();
    const from = config.server.baseUrl + "/t/" + code;
    const owner = req.session.user;
    const session = await Link.startSession();
    await session.withTransaction(async () => {
      const link = new Link({ from, to, owner, code } as ICreateLink);
      await User.findByIdAndUpdate(
        { _id: owner?._id },
        { $push: { links: link.id } },
        { new: true }
      );
      await link.save();
      return res.status(201).send({ link, msg: "Link created" }).end();
    });
    session.endSession();
  } catch (errors) {
    return res.status(500).send({ errors }).end();
  }
};

export const deleteLink = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const id = req.params.id;
    const link = await Link.findByIdAndDelete(id);
    return res.status(201).send({ link }).end();
  } catch (errors) {
    return res.status(500).send({ errors }).end();
  }
};
