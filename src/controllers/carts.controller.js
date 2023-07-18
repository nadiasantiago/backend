import { cartService } from "../services/carts.service.js";
import { ticketService } from "../services/tickets.service.js";

export const addCart = async (req, res)=>{
    let cart = await cartService.addCart();
    if (!cart){
        return res.status(500).send({status:'error', error: 'Error al crear el carrito'});
    }
    return res.status(201).send({status:'success', message:'Carrito creado con exito',payload: cart});
}

export const getCarts = async (req, res)=>{
    const carts = await cartService.getCarts();
    if (!carts){
        return res.status(500).send({status:'error', error: 'Error al obtener los carritos'});
    }
    return res.status(200).send({status:'success', message:'Carritos obtenidos existosamente',payload:carts})
}

export const getCartById = async (req, res)=>{
    const cartId = req.params.cid;
    const cartSearch = await cartService.getCartById(cartId);
    if (cartSearch) {
        return res.status(200).send({status:'success', message:'carrito obtenido exitosamente', payload:cartSearch})
    }else{
        return res.status(500).send({status:'Error', error: `No se ha encontrado carrito con el id:${cartId}`})
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
    if(!cartUpdate){
        return res.status(500).send({status:'error', error:'Error al eliminar el carrito'})
    } 
    return res.status(201).send({status:'success', message:'Carrito vaciado exitosamente', payload: cartUpdate})
}

export const updateCart = async(req, res)=>{
    const cartId = req.params.cid;
    const products = req.body;
    const cartUpdate = await cartService.updateCart(cartId, products);
    if(!cartUpdate){
        return res.status(500).send({status:'error', error:'Error al actualizar el carrito'})
    }
    return res.status(201).send({status:'success',message:'Carrito actualizado exitosamente', payload: cartUpdate});
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
        const user = req.user
        if (!cid)
        return res.status(400).send({status: 'error', payload: {error: 'no existe el carrito' },
        });

        const ticketCreated = await ticketService.createTicket(cid, user);
        if(!ticketCreated) res.status(404).send({status:'error', error:'No se pudo crear el ticket'})
        res.status(201).send({status:'succes', payload: ticketCreated})

    } catch (error) {
        console.log(error);
    }
}
