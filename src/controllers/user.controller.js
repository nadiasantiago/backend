import jwt from 'jsonwebtoken'
import { sessionService } from "../services/sessions.service.js";
import { userService } from "../services/user.service.js";
import config from '../config/config.js';

export const updateUserDocuments = async (req, res) => {
  try {
    const newDocuments = req.files;
    const token = req.cookies.jwtCookie;
    const { email } = jwt.verify(token, config.jwtSecret);
      if (!email || !newDocuments)
      return res
        .status(400)
        .send({ status: "error", error: "campo incompleto" });
    const user = await sessionService.getUser(email);
    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "No se encontró el user con el id" });

    const updatedUserDocuments = await userService.updatedUserDocuments(
      user,
      newDocuments
    );

    if(!updatedUserDocuments){
      return res.status(404).send({status:'error', error:'Error al cargar documentos'})
    }

    res.status(201).send({status:'success', message:'archivos cargados con éxito'})
  } catch (error) {
    console.log(error);
  }
};
