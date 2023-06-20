import jwt from "jsonwebtoken";
import config from "../config/config.js";

const checkLogin = (req, res, next) => {
    if (!req.session.user) return res.redirect("/");
    next();
}

const checkLogged = (req, res, next) => {
    if (req.session.user) return res.redirect("/products");
    next();
}

const checkAuthorization = (req, res, next, rolAuthentication) => {
    const token = req.cookies.jwtCookie;
    const {rol} = jwt.verify(token, config.jwtSecret)
    const userRol = rol.toUpperCase();
    if(userRol !== rolAuthentication)
    return res.status(403).send({status:'error', error:'No tiene permiso'})

    next();
}

export { checkLogged, checkLogin, checkAuthorization };