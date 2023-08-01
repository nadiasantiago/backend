import { Router } from "express";
import passport from "passport";
import { cart, login, message, product, products, profileView, realTimeProducts, register, resetPassword, restorePassword, viewMoking } from "../controllers/views.controller.js";
import { checkAuthorization, checkTokenResetPassword } from "../middlewares/auth.js";

const router = Router();

router.get('/register', register);

router.get('/', login);

router.get("/products", passport.authenticate('jwt', {session:false}), products);

router.get('/products/:pid', passport.authenticate('jwt', {session:false}), product)

router.get('/carts/:cid', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), cart)

router.get("/messages", (req, res, next)=>checkAuthorization(req, res, next, 'USER'), message)

router.get("/realTimeProducts", (req, res, next)=>checkAuthorization(req, res, next, ['ADMIN', 'PREMIUM']), realTimeProducts);

router.get('/mockingproducts', viewMoking)

router.get('/restorePassword', restorePassword)

router.get('/resetPassword', (req, res, next)=>checkTokenResetPassword(req, res, next), resetPassword)

router.get('/profile', passport.authenticate('jwt', {session:false}), profileView)


export default router