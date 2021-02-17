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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const link_routes_1 = __importDefault(require("./routes/link.routes"));
const redirect_routes_1 = __importDefault(require("./routes/redirect.routes"));
const config_1 = __importDefault(require("./config/config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.mongo.uri, config_1.default.mongo.settings);
        const RedisStore = connect_redis_1.default(express_session_1.default);
        console.log(process.env.REDIS_TLS_URL);
        const redis = new ioredis_1.default(process.env.REDIS_TLS_URL);
        const app = express_1.default();
        app.use(cors_1.default({ origin: true, credentials: true }));
        app.use(body_parser_1.json());
        app.use(body_parser_1.urlencoded({ extended: false }));
        app.use(cookie_parser_1.default());
        app.use(express_session_1.default({
            secret: config_1.default.session.secret,
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
        }));
        app.use("/api/link", link_routes_1.default);
        app.use("/api/user", auth_routes_1.default);
        app.use("/t/", redirect_routes_1.default);
        app.listen(config_1.default.server.port, () => {
            console.log(`App is running on port ${config_1.default.server.port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
}))();
//# sourceMappingURL=index.js.map