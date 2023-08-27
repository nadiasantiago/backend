import { Router } from "express";
import { addCart, addToCart, createTicket, deleteAllFromCart, deleteFromCart, getCartById, getCarts, updateCart, updateProductFromCart } from "../controllers/carts.controller.js";
import { checkAuthorization } from "../middlewares/auth.js";
import passport from "passport";

const router = Router();

router.post('/', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), addCart)

router.get('/', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), getCarts)

router.get('/:cid', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), getCartById)

router.post('/:cid/products/:pid', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), addToCart)

router.delete('/:cid/products/:pid',(req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), deleteFromCart)

router.delete('/:cid', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']),deleteAllFromCart)

router.put('/:cid',(req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']), updateCart)

router.put('/:cid/products/:pid', (req, res, next)=>checkAuthorization(req, res, next, ['USER', 'PREMIUM']),updateProductFromCart)

router.post('/:cid/purchase', passport.authenticate('jwt', {session:false}), createTicket)

// router.get('/:cid/purchase/', getTicketById)

export default router

