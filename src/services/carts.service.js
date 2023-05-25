import {cartReposistory} from "../repositories/carts.repository.js";

class CartService {
    constructor(){}

    async addCart(){
        const cart = await cartReposistory.addCart();
        return cart;
    }

    async getCarts(){
        const carts = await cartReposistory.getCarts();
        return carts;
    }

    async getCartById(cartId){
        const cartSearch = await cartReposistory.getCartById(cartId);
        return cartSearch;
    }

    async addToCart(cartId, prodId){
        const cartUpdate = await cartReposistory.addToCart(cartId, prodId);
        return cartUpdate;
    }

    async deleteFromCart(cartId, prodId){
        const cartUpdate = await cartReposistory.deleteFromCart(cartId, prodId);
        return cartUpdate;
    }

    async deleteAllFromCart(cartId){
        const cartUpdate = await cartReposistory.deleteAllFromCart(cartId);
        return cartUpdate
    }

    async updateCart(cartId, products){
        const cartUpdate = await cartReposistory.updateCart(cartId, products);
        return cartUpdate;
    }

    async updateProductFromCart(cid,pid,quantity){
        const cartUpdated = await cartReposistory.updateProductFromCart(cid,pid,quantity);
        return cartUpdated
    }
}

export const cartService = new CartService();