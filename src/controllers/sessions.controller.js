import { isValidPassword, creatHash } from "../utils/utils.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { sessionService } from "../services/sessions.service.js";
import outputUserDto from "../dao/dto/outputUser.dto.js";
import { mailingService } from "../services/mailing.service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await sessionService.getUser({ email });
  if (!user)
    return res
      .status(401)
      .send({ status: "error", error: "Usuario inexistente" });

  if (!isValidPassword(user, password))
    return res
      .status(401)
      .send({ status: "error", error: "credenciales erroneass" });
  const userDto = new outputUserDto(user);
  const jwtUser = JSON.parse(JSON.stringify(userDto));
  const token = jwt.sign(jwtUser, config.jwtSecret, { expiresIn: "24h" });

  await sessionService.updateUser(
    { email: jwtUser.email },
    { last_connection: new Date() }
  );

  return res.cookie("jwtCookie", token, { httpOnly: true }).send({
    status: "success",
    payload: req.user,
  });
};

export const githubcallback = (req, res) => {
  const user = req.user;
  const userDto = new outputUserDto(user);
  const githubUser = JSON.parse(JSON.stringify(userDto));
  const token = jwt.sign(githubUser, config.jwtSecret, { expiresIn: "24h" });

  res.cookie("jwtCookie", token, { httpOnly: true }).redirect("/products");
};

export const register = async (req, res) => {
  return res
    .status(201)
    .send({ status: "success", message: "Usuario registrado" });
};

export const failRegister = (req, res) => {
  return res.send({ status: "status", error: "error de autenticacion" });
};

export const current = (req, res) => {
  const user = sessionService.getUser(req.user);
  return res.send({ payload: user });
};

export const logout = async (req, res) => {
  const token = req.cookies.jwtCookie;
  const { email } = jwt.verify(token, config.jwtSecret);
  await sessionService.updateUser({ email }, { last_connection: new Date() });

  return res
    .clearCookie("jwtCookie")
    .send({ status: "success", message: "log out successful" });
};

export const emailToRestorePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await sessionService.getUser({ email });
    if (!user)
      return res
        .status(401)
        .send({ status: "error", error: "Usuario inexistente" });

    const userDto = new outputUserDto(user);
    const jwtUser = JSON.parse(JSON.stringify(userDto));
    const token = jwt.sign(jwtUser, config.jwtSecret, { expiresIn: "1h" });

    await mailingService.emailToRestorePassword(token, userDto);

    return res.status(200).send({
      status: "success",
      message: "Password reset email sent",
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    const tokenPayload = jwt.verify(token, config.jwtSecret, {
      ignoreExpiration: true,
    });
    if (Date.now() / 1000 > tokenPayload.exp) {
      return res.redirect("/restorePassword");
    }
    const { email } = tokenPayload;
    const user = await sessionService.getUser({ email });

    if (isValidPassword(user, newPassword))
      return res
        .status(401)
        .send({
          status: "error",
          error: "La contraseña debe ser distinta a la anterior",
        });

    const hashedPassword = creatHash(newPassword);
    const updatedPassword = await sessionService.updateUser(
      { email },
      { password: hashedPassword }
    );
    if (!updatedPassword)
      return res
        .status(500)
        .send({ status: "error", error: "Error al actualizar la contraseña" });

    res
      .status(200)
      .send({ status: "success", message: "contraseña cambiada con exito" });
  } catch (error) {
    console.log(error);
  }
};

export const changeRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const requiredStatus = ["identificacion", "direccion", "resumen"];
    if (!uid)
      return res
        .status(400)
        .send({ status: "error", error: "campo incompleto" });
    const user = await sessionService.getUser({ _id: uid });
    const userStatus = user.status;
    const missingStatus = requiredStatus.filter((e) => !userStatus.includes(e));
    if (missingStatus.length == 0) {
      if (user.rol == "user") {
        user.rol = "premium";
      } else {
        user.rol = "user";
      }
      const changeRole = await sessionService.changeRole(uid, user.rol);
      if (!changeRole)
        return res
          .status(500)
          .send({ status: "error", error: "Error al actualizar el rol" });
      return res
        .status(200)
        .send({ status: "success", message: "Rol cambiado con exito" });
    }
    return res
      .status(500)
      .send({
        status: "error",
        error: `Falta documentacion, por favor complete ${missingStatus.join(", ")}`,
      });
  } catch (error) {
    console.log(error);
  }
};
