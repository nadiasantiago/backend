import { sessionService } from "../services/sessions.service.js";
import { userService } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (!users){
      return res
        .status(404)
        .send({ status: "error", message: "error al encontrar los usuarios" });
    }
    return res.status(200).send({ status: "success", payload: users });
  } catch (error) {
    return res.status(error.statusCode).send(error.message);
  }
};

export const deleteInactiveUsers = async (req, res) => {
  try {
    const usersDeleted = await userService.deleteInactiveUsers();
    if (!usersDeleted)
      return res
        .status(404)
        .send({ status: "error", message: "error al eliminar los usuarios inactivos" });
    return res.status(200).send({ status: "success", payload: usersDeleted });
  } catch (error) {
    return res.status(error.statusCode).send(error.message);
  }
};
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
    const updatedUserDocuments = await userService.updatedUserDocuments(
      user,
      newDocuments
    );

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
