import { Router } from "express";
import passport from "passport";
import { updateUserDocuments } from "../controllers/user.controller.js";

const router = Router();

router.post("/:uid/documents", updateUserDocuments);
export default router;
