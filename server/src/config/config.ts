import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;

const BASE_URL = process.env.BASE_URL;

const SERVER = {
  port: PORT,
  baseUrl: BASE_URL,
};

const MONGO_URI = process.env.MONGO_URI;

const MONGO = {
  uri: MONGO_URI,
  settings: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const SESSION_SECRET = process.env.SESSION_SECRET;

const SESSION = {
  secret: SESSION_SECRET,
};

const JWT = {
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  refreshTokenSecret: REFRESH_TOKEN_SECRET,
};

const config = {
  server: SERVER,
  session: SESSION,
  mongo: MONGO,
  jwt: JWT,
};

export default config;
