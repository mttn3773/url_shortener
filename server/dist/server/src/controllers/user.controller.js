"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.register = exports.login = exports.findAllUsers = void 0;
const argon2_1 = require("argon2");
const user_model_1 = __importDefault(require("./../models/user.model"));
const findAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find().exec();
        res.status(200).send({ msg: "Users" }).end();
        return users;
    }
    catch (error) {
        return res.status(500).send({ message: error.message, error }).end();
    }
});
exports.findAllUsers = findAllUsers;
const validateUser = (res, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = user_model_1.default.findOne({ email });
        const user = yield query.exec();
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
                ],
            })
                .end();
        }
        const userWithPassword = yield query.select("password").exec();
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
                ],
            })
                .end();
        }
        const isValid = yield argon2_1.verify(userWithPassword.password, password);
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
                ],
            })
                .end();
        }
        return user;
    }
    catch (error) {
        return res.status(500).send({ error }).end();
    }
});
const login = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
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
            ],
        })
            .end();
    }
    const user = yield validateUser(res, email, password);
    if (!user) {
        return res
            .status(500)
            .send({
            errors: [
                {
                    msg: "Something went wrong",
                    location: "body",
                },
            ],
        })
            .end();
    }
    user.password = undefined;
    req.session.user = user;
    return res
        .status(200)
        .send({ user, message: "Logged in succesefully" })
        .end();
});
exports.login = login;
const register = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(500)
            .send({
            errors: [
                {
                    msg: "Invalid credentials",
                    location: "body",
                },
            ],
        })
            .end();
    }
    const hashedPassword = yield argon2_1.hash(password);
    try {
        const user = yield new user_model_1.default({
            email,
            password: hashedPassword,
        }).save();
        user.password = undefined;
        req.session.user = user;
        return res
            .status(200)
            .send({ user, message: "Logged in succesefully" })
            .end();
    }
    catch (error) {
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
                ],
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
            ],
        })
            .end();
    }
});
exports.register = register;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.user) {
        return res
            .status(401)
            .send({ errors: [{ msg: "Not Authenticated" }] })
            .end();
    }
    return res.status(200).send({ user: req.session.user }).end();
});
exports.me = me;
//# sourceMappingURL=user.controller.js.map