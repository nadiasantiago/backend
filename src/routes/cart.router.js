import { Router } from "express";
import { addCart, addToCart, deleteAllFromCart, deleteFromCart, getCartById, getCarts, updateCart, updateProductFromCart } from "../controllers/carts.controller.js";

const router = Router();

router.post('/', addCart)

router.get('/', getCarts)

router.get('/:cid', getCartById)

router.post('/:cid/products/:pid', addToCart)

router.delete('/:cid/products/:pid', deleteFromCart)

router.delete('/:cid', deleteAllFromCart)

router.put('/:cid', updateCart)

router.put('/:cid/products/:pid', updateProductFromCart)

export default router

