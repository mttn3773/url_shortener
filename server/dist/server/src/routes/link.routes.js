"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const link_controller_1 = require("./../controllers/link.controller");
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const express_1 = require("express");
const router = express_1.Router();
router.get("/", () => "Links");
router.post("/generate", auth_middleware_1.authMiddleware, link_controller_1.generate);
exports.default = router;
//# sourceMappingURL=link.routes.js.map