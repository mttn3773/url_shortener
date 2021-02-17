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
import path from "path";

(process as any).env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
(async () => {
  try {
    await mongoose.connect(config.mongo.uri!, config.mongo.settings);
    const RedisStore = redisStore(session);
    console.log(process.env.REDIS_TLS_URL);
    //
    const redis = new Redis(process.env.REDIS_TLS_URL);
    const app = express();
    app.use(cors({ origin: true, credentials: true }));
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
          disableTouch: true,
        }),
      })
    );
    app.use("/api/link", linkRouter);
    app.use("/api/user", authRouter);
    app.use("/t/", redirectRouter);
    if (process.env.NODE_ENV === "production") {
      app.use("/", express.static(path.join(__dirname, "web", "build")));
      app.get("*", (_req, res) => {
        res.sendFile(path.resolve(__dirname, "web", "build", "index.html"));
      });
    }
    app.listen(config.server.port, () => {
      console.log(`App is running on port ${config.server.port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
