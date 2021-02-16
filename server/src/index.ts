import express from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import session from "express-session";
import redisStore from "connect-redis";
import Redis from "ioredis";
import authRouter from "./routes/auth.routes";
import linkRouter from "./routes/link.routes";
import redirectRouter from "./routes/redirect.routes";
import config from "./config/config";
import cookieParser from "cookie-parser";
(async () => {
  try {
    await mongoose.connect(config.mongo.uri!, config.mongo.settings);
    const RedisStore = redisStore(session);
    const redis = new Redis();
    const app = express();
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(
      session({
        secret: config.session.secret!,
        cookie: {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: true,
        },
        saveUninitialized: false,
        resave: false,
        store: new RedisStore({
          client: redis,
          host: process.env.HOST || "localhost",
          port: 6379,
          disableTouch: true,
        }),
      })
    );
    app.use("/api/link", linkRouter);
    app.use("/api/user", authRouter);
    app.use("/t/", redirectRouter);
    app.listen(config.server.port, () => {
      console.log(`App is running on port ${config.server.port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
