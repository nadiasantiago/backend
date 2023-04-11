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
            const cart = await cartModel.find({_id:cartId});
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
    
}