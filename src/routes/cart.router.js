import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";
// import CartManager from "../dao/fileManagers/CartManager.js";

const router = Router();

const cartManager = new CartManager();

router.post('/', async (req, res)=>{
    let cart = await cartManager.addCart();

    res.status(201).send({status:'OK', payload: cart});
})

router.get('/', async (req, res)=>{
    const carts = await cartManager.getCarts();
    return res.send({status:'success', payload:carts})

})

router.get('/:cid', async (req, res)=>{
    const cartId = req.params.cid;
    const cartSearch = await cartManager.getCartById(cartId);
    if (cartSearch) {
        res.status(200).send({status:'OK', payload:cartSearch})
    }else{
        res.status(404).send({status:'Error', payload: `No se ha encontrado carrito con el id:${cartId}`})
    }
})

router.post('/:cid/products/:pid', async (req, res)=>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    if(!cartId){
        res.status(400).send({status:'Error', message: 'Error al cargar los datos'});
        return
    }
    const cartUpdate = await cartManager.addToCart(cartId, prodId);
    res.status(201).send({status:'OK', payload: cartUpdate})
})

router.delete('/:cid/products/:pid', async(req,res)=>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const cartUpdate = await cartManager.deleteFromCart(cartId, prodId);
    res.status(201).send({status:'OK', payload: cartUpdate})
})

router.delete('/:cid',async(req,res)=>{
    const cartId = req.params.cid;
    const cartUpdate = await cartManager.deleteAllFromCart(cartId);
    res.status(201).send({status:'OK', payload: cartUpdate})

})

router.put('/:cid', async(req, res)=>{
    const cartId = req.params.cid;
    const products = req.body;
    const cartUpdate = await cartManager.updateCart(cartId, products);
    res.status(201).send({status:'OK', payload: cartUpdate});
})

router.put('/:cid/products/:pid', async(req, res)=>{
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;
    
        if (!cid || !pid)
        return res.status(400).send({status: 'error', payload: {error: 'campos icompletos' },
        });
    
        const cartUpdated = await cartManager.updateProductFromCart(cid,pid,quantity);
        res.status(201).send({status:'OK', payload: cartUpdated});

    } catch (error) {
        console.log(error)
    }
})


//MODELO DE PERSISTENCIA CON FILES
// router.post('/', async (req, res)=>{
//     let cart = await cartManager.addCart();

//     res.status(201).send({status:'OK', message: cart});
// })

// router.get('/:cid', async (req, res)=>{
//     const cartId = req.params.cid;
//     const cartSearch = await cartManager.getCartById(cartId);
//     if (cartSearch) {
//         res.status(200).send({status:'OK', message:cartSearch})
//     }else{
//         res.status(404).send({status:'Error', message: `No se ha encontrado carrito con el id:${cartId}`})
//     }
// })

// router.post('/:cid/products/:pid', async (req, res)=>{
//     const cartId = req.params.cid;
//     const prodId = req.params.pid;
//     const cartUpdate = await cartManager.addToCart(cartId, prodId);
//     res.status(201).send({status:'OK', message: cartUpdate})
// })

export default router

