import { sessionService } from "../services/sessions.service.js";
import { userService } from "../services/user.service.js";

export const updateUserDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const newDocuments = req.files;

    if (!uid || !newDocuments)
      return res
        .status(400)
        .send({ status: "error", error: "campo incompleto" });
    const user = await sessionService.getUser({ _id: uid });
    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "No se encontró el user con el id" });

    const updatedUserDocuments = await userService.updatedUserDocuments(
      user.documents,
      newDocuments
    );
  } catch (error) {
    console.log(error);
  }
};
