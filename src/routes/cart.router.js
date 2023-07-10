import { Router } from "express";
import { addCart, addToCart, createTicket, deleteAllFromCart, deleteFromCart, getCartById, getCarts, updateCart, updateProductFromCart } from "../controllers/carts.controller.js";
import { checkAuthorization } from "../middlewares/auth.js";
import passport from "passport";

const router = Router();

router.post('/', addCart)

router.get('/', getCarts)

router.get('/:cid', getCartById)

router.post('/:cid/products/:pid', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), addToCart)

router.delete('/:cid/products/:pid', deleteFromCart)

router.delete('/:cid', deleteAllFromCart)

router.put('/:cid', updateCart)

router.put('/:cid/products/:pid', updateProductFromCart)

router.get('/:cid/purchase', passport.authenticate('jwt', {session:false}), createTicket)

// router.get('/:cid/purchase/', getTicketById)

export default router

