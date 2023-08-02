import jwt from "jsonwebtoken";
import { sessionService } from "../services/sessions.service.js";
import { userService } from "../services/user.service.js";

export const updateUserDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const newDocuments = req.files;
    if (!newDocuments)
      return res
        .status(400)
        .send({ status: "error", error: "campo incompleto" });
    const user = await sessionService.getUser({ _id: uid });
    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "No se encontró el user con el id" });
    console.log('HOLA ESTOY ACA')
    const updatedUserDocuments = await userService.updatedUserDocuments(
      user,
      newDocuments
    );
    console.log(updatedUserDocuments);

    if (!updatedUserDocuments) {
      return res
        .status(404)
        .send({ status: "error", error: "Error al cargar documentos" });
    }

    res
      .status(201)
      .send({ status: "success", message: "archivos cargados con éxito" });
  } catch (error) {
    console.log(error);
  }
};
