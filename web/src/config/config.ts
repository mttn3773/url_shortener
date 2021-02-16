import dotenv from "dotenv";
dotenv.config();

const SERVER_URL = process.env.SERVER_URL;

const ENDPOINTS = {
  register: "/api/user",
  login: "/api/user/login",
};

const API = {
  endpoints: ENDPOINTS,
};
const SERVER = {
  serverUrl: SERVER_URL,
  api: API,
};

export const config = {
  server: SERVER,
};
