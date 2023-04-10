import { cartModel } from "../models/cart.model.js"
import { productModel } from "../models/product.model.js";

export default class CartManager {
    constructor (){
    }

    getCarts= async()=>{
        try {
            const carts = await cartModel.find();
            return carts
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
            console.log(cart)
        } catch (error) {
            console.log(error);
        }
    }

    addToCart = async (cartId, prodId)=>{
        try {
            const cart = this.getCartById(cartId)
            const searchProduct = cart.find({})
            const product = await productModel.find({_id:prodId},{_id:1});

        } catch (error) {
            console.log(error);
        }
    }

}