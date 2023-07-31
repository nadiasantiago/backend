import jwt from "jsonwebtoken";
import config from "../config/config.js";

const checkLogin = (req, res, next) => {
  if (!req.session.user) return res.redirect("/");
  next();
};

const checkLogged = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};

const checkAuthorization = (req, res, next, rolAuthentication) => {
  const token = req.cookies.jwtCookie;
  const { rol } = jwt.verify(token, config.jwtSecret);
  const userRol = rol.toUpperCase();
  if (!rolAuthentication.includes(userRol))
    return res.status(403).send({ status: "error", error: "No tiene permiso" });
  next();
};

const checkTokenResetPassword = (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    return res.status(401).send({ error: "error", message: "invalid token" });
  }
  const tokenPayload = jwt.verify(token, config.jwtSecret, {
    ignoreExpiration: true,
  });
  if (Date.now() / 1000 > tokenPayload.exp) {
    return res.redirect("/restorePassword");
  }
  next();
};

export { checkLogged, checkLogin, checkAuthorization, checkTokenResetPassword };
