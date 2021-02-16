import { hash, verify } from "argon2";
import { NextFunction, Request, Response } from "express";
import { IUser } from "src/interfaces/user.interface";
import { ICreateUser } from "./../interfaces/createUser.interface";
import { IError } from "./../interfaces/error.interface";
import User from "./../models/user.model";

export const findAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<IUser[] | void> => {
  try {
    const users = await User.find().exec();
    res.status(200).send({ users }).end();
    return users;
  } catch (error) {
    return res.status(500).send({ message: error.message, error }).end();
  }
};

// USER VALIDATION -----> CHECK IF USER EXISTS => VERIFY PASSWORD

const validateUser = async (
  res: Response,
  email: string,
  password: string
): Promise<IUser | void> => {
  try {
    const query = User.findOne({ email });
    const user = await query.exec();
    if (!user) {
      return res
        .status(500)
        .send({
          errors: [
            {
              value: email,
              msg: "Couldn't find a user",
              param: "email",
              location: "body",
            },
          ] as IError[],
        })
        .end();
    }
    const userWithPassword = await query.select("password").exec();
    if (!userWithPassword) {
      return res
        .status(500)
        .send({
          errors: [
            {
              value: email,
              msg: "Couldn't find a user",
              param: "email",
              location: "body",
            },
          ] as IError[],
        })
        .end();
    }
    const isValid = await verify(userWithPassword.password!, password);
    if (!isValid) {
      return res
        .status(500)
        .send({
          errors: [
            {
              value: password,
              msg: "Wrong password",
              param: "password",
              location: "body",
            },
          ] as IError[],
        })
        .end();
    }

    return user;
  } catch (error) {
    return res.status(500).send({ error }).end();
  }
};

// USER LOGIN

export const login = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password } = req.body as ICreateUser;
  if (!email || !password) {
    return res
      .status(500)
      .send({
        errors: [
          {
            value: "undefiened",
            msg: "Invalid credentials",
            location: "body",
            param: "undefiened",
          },
        ] as IError[],
      })
      .end();
  }
  const user = await validateUser(res, email, password);
  if (!user) {
    return res
      .status(500)
      .send({
        errors: [
          {
            msg: "Something went wrong",
            location: "body",
          },
        ] as IError[],
      })
      .end();
  }
  user.password = undefined;
  req.session.user = user;
  return res
    .status(200)
    .send({ user, message: "Logged in succesefully" })
    .end();
};

// USER REGISTER

export const register = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<IUser | void> => {
  const { email, password } = req.body as ICreateUser;
  if (!email || !password) {
    return res
      .status(500)
      .send({
        errors: [
          {
            msg: "Invalid credentials",
            location: "body",
          },
        ] as IError[],
      })
      .end();
  }
  const hashedPassword = await hash(password);
  try {
    const user = await new User({
      email,
      password: hashedPassword,
    } as IUser).save();
    user.password = undefined;
    req.session.user = user;
    return res
      .status(200)
      .send({ user, message: "Logged in succesefully" })
      .end();
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res
        .status(500)
        .send({
          errors: [
            {
              value: email,
              msg: "User with this email already exists",
              param: "email",
              location: "body",
            },
          ] as IError[],
        })
        .end();
    }
    return res
      .status(500)
      .send({
        errors: [
          {
            value: email,
            msg: error.message || "Something went wrong",
            param: "email",
            location: "body",
          },
        ] as IError[],
      })
      .end();
  }
};

export const me = async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res
      .status(401)
      .send({ errors: [{ msg: "Not Authenticated" }] as IError[] })
      .end();
  }
  const user = await User.findOne({ email: req.session.user.email }).exec();
  return res.status(200).send({ user }).end();
};

export const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((e) => {
      if (e) {
        return res.status(500).send({
          errors: [
            {
              msg: e.message || "Something went wrong",
            },
          ] as IError[],
        });
      }
      return res.status(200).send({ msg: "Logged out" }).end();
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        errors: [
          {
            msg: error.message || "Something went wrong",
          },
        ] as IError[],
      })
      .end();
  }
};
