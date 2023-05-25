import { Router } from "express";
import passport from "passport";
import { cart, login, product, products, register } from "../controllers/views.controller.js";

const router = Router();

router.get('/register', register);

router.get('/', login);

router.get("/products", passport.authenticate('jwt', {session:false}), products);

router.get('/products/:pid', product)

router.get('/carts/:cid', cart)

export default router