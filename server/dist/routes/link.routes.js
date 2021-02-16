"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapValdiationErrors_1 = require("./../utils/mapValdiationErrors");
const link_controller_1 = require("./../controllers/link.controller");
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router.get("/", auth_middleware_1.authMiddleware, link_controller_1.findAllLinks);
router.post("/generate", auth_middleware_1.authMiddleware, [express_validator_1.check("to").isURL()], [express_validator_1.check("to", "Protocol is rqured").isURL({ require_protocol: true })], mapValdiationErrors_1.mapValidationErrors, link_controller_1.generate);
router.get("/:id", auth_middleware_1.authMiddleware, link_controller_1.findLinkById);
router.delete("/:id", auth_middleware_1.authMiddleware, link_controller_1.deleteLink);
exports.default = router;
//# sourceMappingURL=link.routes.js.map