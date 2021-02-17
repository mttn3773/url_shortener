import { handleRedirect } from "./../controllers/redirect.controller";
import { Router } from "express";

const router = Router();

router.get("/:code", handleRedirect);

export default router;
