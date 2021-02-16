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
exports.handleRedirect = void 0;
const link_model_1 = __importDefault(require("../models/link.model"));
const handleRedirect = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.params.code;
        const link = yield link_model_1.default.findOne({ code });
        if (!link) {
            return res
                .status(500)
                .send({ errors: [{ msg: "Couldnt find a link" }] });
        }
        link.clicks++;
        link.save();
        return res.status(301).redirect(`${link.to}`);
    }
    catch (error) {
        return res.status(500).send({ error }).end();
    }
});
exports.handleRedirect = handleRedirect;
//# sourceMappingURL=redirect.controller.js.map