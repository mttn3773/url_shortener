import { mapValidationErrors } from "./../utils/mapValdiationErrors";
import {
  deleteLink,
  findAllLinks,
  findLinkById,
  generate,
} from "./../controllers/link.controller";
import { authMiddleware } from "./../middlewares/auth.middleware";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();
// REFRESH
router.get("/", findAllLinks);

router.post(
  "/generate",
  authMiddleware,
  [check("to").isURL()],
  [check("to", "Protocol is rqured").isURL({ require_protocol: true })],
  mapValidationErrors,
  generate
);

router.get("/:id", authMiddleware, findLinkById);

router.delete("/:id", authMiddleware, deleteLink);
export default router;
