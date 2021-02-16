import { mapValidationErrors } from "./../utils/mapValdiationErrors";
import { login, logout, me, register } from "./../controllers/user.controller";
import { Router } from "express";
import { findAllUsers } from "../controllers/user.controller";
import { check } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();
router.get("", authMiddleware, findAllUsers);
router.post(
  "",

  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  mapValidationErrors,
  register
);
router.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  mapValidationErrors,
  login
);
router.get("/me", authMiddleware, me);
router.post("/logout", authMiddleware, logout);
export default router;
