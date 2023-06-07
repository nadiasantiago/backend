import { Router } from "express";
import { createMessages, getMessages } from "../controllers/messages.controller.js";

const router = Router();

router.get('/', getMessages);

router.post('/', createMessages);

export default router