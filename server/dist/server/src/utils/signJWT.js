"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = exports.createRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config/config"));
const createRefreshToken = (payload) => {
    try {
        const refreshToken = jsonwebtoken_1.sign({ userId: payload._id, email: payload.email }, config_1.default.jwt.refreshTokenSecret, {
            expiresIn: "10d",
        });
        return refreshToken;
    }
    catch (error) {
        console.log(error);
        return;
    }
};
exports.createRefreshToken = createRefreshToken;
const createAccessToken = (payload) => {
    try {
        const accessToken = jsonwebtoken_1.sign({ userId: payload._id, email: payload.email }, config_1.default.jwt.accessTokenSecret, {
            expiresIn: "10d",
        });
        return accessToken;
    }
    catch (error) {
        console.log(error);
        return;
    }
};
exports.createAccessToken = createAccessToken;
//# sourceMappingURL=signJWT.js.map