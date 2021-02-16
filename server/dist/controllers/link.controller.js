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
exports.deleteLink = exports.generate = exports.findLinkById = exports.findAllLinks = void 0;
const link_model_1 = __importDefault(require("../models/link.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const shortid_1 = __importDefault(require("shortid"));
const config_1 = __importDefault(require("../config/config"));
const findAllLinks = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.session.user;
        const links = yield link_model_1.default.find({ owner: user === null || user === void 0 ? void 0 : user._id });
        return res.send({ links }).end();
    }
    catch (error) {
        return res.status(500).send({ error }).end();
    }
});
exports.findAllLinks = findAllLinks;
const findLinkById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const link = yield link_model_1.default.findById(id);
        return res.send({ link }).end();
    }
    catch (error) {
        return res.status(500).send({ error }).end();
    }
});
exports.findLinkById = findLinkById;
const generate = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to } = req.body;
        const code = shortid_1.default.generate();
        const from = config_1.default.server.baseUrl + "/t/" + code;
        const owner = req.session.user;
        const session = yield link_model_1.default.startSession();
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const link = new link_model_1.default({ from, to, owner, code });
            yield user_model_1.default.findByIdAndUpdate({ _id: owner === null || owner === void 0 ? void 0 : owner._id }, { $push: { links: link.id } }, { new: true });
            yield link.save();
            return res.status(201).send({ link, msg: "Link created" }).end();
        }));
        session.endSession();
    }
    catch (errors) {
        return res.status(500).send({ errors }).end();
    }
});
exports.generate = generate;
const deleteLink = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const link = yield link_model_1.default.findByIdAndDelete(id);
        return res.status(201).send({ link }).end();
    }
    catch (errors) {
        return res.status(500).send({ errors }).end();
    }
});
exports.deleteLink = deleteLink;
//# sourceMappingURL=link.controller.js.map