import { handleRedirect } from "./../controllers/redirect.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:code", authMiddleware, handleRedirect);

export default router;
