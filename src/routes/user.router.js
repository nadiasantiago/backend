import { Router } from "express";
import { deleteInactiveUsers, getUsers, updateUserDocuments } from "../controllers/user.controller.js";
import { uploader } from "../utils/utils.js";

const router = Router();

router.get('/', getUsers)

router.delete('/', deleteInactiveUsers)

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
