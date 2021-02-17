"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redirect_controller_1 = require("./../controllers/redirect.controller");
const express_1 = require("express");
const router = express_1.Router();
router.get("/:code", redirect_controller_1.handleRedirect);
exports.default = router;
//# sourceMappingURL=redirect.routes.js.map