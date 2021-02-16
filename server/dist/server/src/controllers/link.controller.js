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
exports.generate = void 0;
const link_model_1 = __importDefault(require("../models/link.model"));
const shortid_1 = __importDefault(require("shortid"));
const config_1 = __importDefault(require("src/config/config"));
const generate = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to } = req.body;
        const code = shortid_1.default.generate();
        const from = config_1.default.server.baseUrl + "/t/" + code;
        const user = req.session.user;
        const link = new link_model_1.default({ from, to, user });
        yield link.save();
        return res.status(201).send({ link, msg: "Link create" }).end();
    }
    catch (error) {
        return res.status(500).send({ error }).end();
    }
});
exports.generate = generate;
//# sourceMappingURL=link.controller.js.map