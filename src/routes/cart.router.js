import { Router } from "express";
import { addCart, addToCart, createTicket, deleteAllFromCart, deleteFromCart, getCartById, getCarts, updateCart, updateProductFromCart } from "../controllers/carts.controller.js";
import { checkAuthorization } from "../middlewares/auth.js";

const router = Router();

router.post('/', addCart)

router.get('/', getCarts)

router.get('/:cid', getCartById)

router.post('/:cid/products/:pid', (req, res, next)=>checkAuthorization(req, res, next, 'USER'), addToCart)

router.delete('/:cid/products/:pid', deleteFromCart)

router.delete('/:cid', deleteAllFromCart)

router.put('/:cid', updateCart)

router.put('/:cid/products/:pid', updateProductFromCart)

router.post('/:cid/purchase', createTicket)

// router.get('/:cid/purchase/:tid', getTicketById)

export default router

