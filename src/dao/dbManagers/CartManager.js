import { cartModel } from "../models/cart.model.js"

export default class CartManager {
    constructor (){
    }

    getCarts = async()=>{
        try {
            const cartsFound = await cartModel.find();
            return cartsFound
        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (cartId)=>{
        try {
            const cart = await cartModel.find({_id:cartId}).lean().populate('products.pid');
            console.log(cart);
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    addCart = async ()=>{
        try {
            const cart = await cartModel.create({products:[]});
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    addToCart = async (cartId, prodId)=>{
        try {
            const cart = await cartModel.findOne({_id:cartId});
            const productSearched = cart.products.findIndex((prod)=>prod.pid == prodId);
            if(productSearched == -1){
                const product = {
                    pid: prodId, 
                    quantity:1,
                }
                const cartUpdated = await cartModel.updateOne({_id:cartId}, {$push:{products:product}} );
                return cartUpdated
            } else{
                const cartUpdate = await cartModel.updateOne({_id:cartId,products:{$elemMatch:{pid: prodId}}},{$inc:{'products.$.quantity':1}});
                return cartUpdate
            }

        } catch (error) {
            console.log(error);
        }
    }

    deleteFromCart = async(cartId, prodId)=>{
        try {
            const cartUpdated = await cartModel.updateOne({_id:cartId}, {$pull:{products:{pid:prodId}}});
            return cartUpdated
            
        } catch (error) {
            console.log(error);
        }
    }
    
    deleteAllFromCart = async(cartId)=>{
        try {
            const cartUpdated = await cartModel.updateOne({_id:cartId}, {products:[]});
            return cartUpdated
        } catch (error) {
            console.log(error);
        }
    }
    updateCart = async (cartId, products)=>{
        try {
            const cartUpdated = await cartModel.updateOne({_id:cartId}, {products:products});
            return cartUpdated;
        } catch (error) {
            console.log(error)
        }
    }
    updateProductFromCart = async(cid,pid,quantity)=>{
        try {
            const cartUpdated = await cartModel.updateOne({_id:cid, "products.pid":pid}, {"products.$.quantity": quantity});
            return cartUpdated
        } catch (error) {
            console.log(error)
        }
    }
    
}