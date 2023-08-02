import { Router } from "express";
import { updateUserDocuments } from "../controllers/user.controller.js";
import { uploader } from "../utils/utils.js";

const router = Router();

router.post(
  "/:uid/documents",
  uploader.fields([
    { name: "identificacion" },
    { name: "direccion" },
    { name: "resumen" },
  ]),
  updateUserDocuments
);
export default router;
