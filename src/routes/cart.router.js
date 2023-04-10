import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";
// import CartManager from "../dao/fileManagers/CartManager.js";

const router = Router();

const cartManager = new CartManager();

let carts = await cartManager.getCarts();

router.post('/', async (req, res)=>{
    let cart = await cartManager.addCart();

    res.status(201).send({status:'OK', message: cart});
})

router.get('/:cid', async (req, res)=>{
    const cartId = req.params.cid;
    const cartSearch = await cartManager.getCartById(cartId);
    if (cartSearch) {
        res.status(200).send({status:'OK', message:cartSearch})
    }else{
        res.status(404).send({status:'Error', message: `No se ha encontrado carrito con el id:${cartId}`})
    }
})

router.post('/:cid/products/:pid', async (req, res)=>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const cartUpdate = await cartManager.addToCart(cartId, prodId);
    res.status(201).send({status:'OK', message: cartUpdate})
})

export default router

