import { cartService } from "../services/carts.service.js";
import { ticketService } from "../services/tickets.service.js";

export const addCart = async (req, res)=>{
    let cart = await cartService.addCart();
    res.status(201).send({status:'OK', payload: cart});
}

export const getCarts = async (req, res)=>{
    const carts = await cartService.getCarts();
    return res.send({status:'success', payload:carts})
}

export const getCartById = async (req, res)=>{
    const cartId = req.params.cid;
    const cartSearch = await cartService.getCartById(cartId);
    if (cartSearch) {
        res.status(200).send({status:'OK', payload:cartSearch})
    }else{
        res.status(404).send({status:'Error', payload: `No se ha encontrado carrito con el id:${cartId}`})
    }
}

export const addToCart = async (req, res)=>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    if(!cartId){
        res.status(400).send({status:'Error', message: 'Error al cargar los datos'});
        return
    }
    const cartUpdate = await cartService.addToCart(cartId, prodId);
    res.status(201).send({status:'OK', payload: cartUpdate})
}

export const deleteFromCart = async(req,res)=>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const cartUpdate = await cartService.deleteFromCart(cartId, prodId);
    res.status(201).send({status:'OK', payload: cartUpdate})
}

export const deleteAllFromCart = async(req,res)=>{
    const cartId = req.params.cid;
    const cartUpdate = await cartService.deleteAllFromCart(cartId);
    res.status(201).send({status:'OK', payload: cartUpdate})
}

export const updateCart = async(req, res)=>{
    const cartId = req.params.cid;
    const products = req.body;
    const cartUpdate = await cartService.updateCart(cartId, products);
    res.status(201).send({status:'OK', payload: cartUpdate});
}

export const updateProductFromCart = async(req, res)=>{
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;
    
        if (!cid || !pid)
        return res.status(400).send({status: 'error', payload: {error: 'campos icompletos' },
        });
    
        const cartUpdated = await cartService.updateProductFromCart(cid,pid,quantity);
        res.status(201).send({status:'OK', payload: cartUpdated});

    } catch (error) {
        console.log(error)
    }
}

export const createTicket = async (req, res)=>{
    try {
        const {cid} = req.params
        if (!cid)
        return res.status(400).send({status: 'error', payload: {error: 'no existe el carrito' },
        });
        const ticketCreated = await ticketService.createTicket(cid);

        if(!ticketCreated) res.status(404).send({status:'error', error:'No se pudo crear el ticket'})

        res.status(201).send({status:'succes', payload: ticketCreated})

    } catch (error) {
        console.log(error);
    }
}
