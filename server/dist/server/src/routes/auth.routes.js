"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapValdiationErrors_1 = require("./../utils/mapValdiationErrors");
const user_controller_1 = require("./../controllers/user.controller");
const express_1 = require("express");
const user_controller_2 = require("../controllers/user.controller");
const express_validator_1 = require("express-validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.Router();
router.get("", auth_middleware_1.authMiddleware, user_controller_2.findAllUsers);
router.post("", [express_validator_1.check("email").isEmail(), express_validator_1.check("password").isLength({ min: 6 })], mapValdiationErrors_1.mapValidationErrors, user_controller_1.register);
router.post("/login", [express_validator_1.check("email").isEmail(), express_validator_1.check("password").isLength({ min: 6 })], mapValdiationErrors_1.mapValidationErrors, user_controller_1.login);
router.get("/me", auth_middleware_1.authMiddleware, user_controller_1.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map