import {cartRepository} from "../repositories/carts.repository.js";

class CartService {
    constructor(){}

    async addCart(){
        const cart = await cartRepository.addCart();
        return cart;
    }

    async getCarts(){
        const carts = await cartRepository.getCarts();
        return carts;
    }

    async getCartById(cartId){
        const cartSearch = await cartRepository.getCartById(cartId);
        return cartSearch;
    }

    async addToCart(cartId, prodId){
        const cartUpdate = await cartRepository.addToCart(cartId, prodId);
        return cartUpdate;
    }

    async deleteFromCart(cartId, prodId){
        const cartUpdate = await cartRepository.deleteFromCart(cartId, prodId);
        return cartUpdate;
    }

    async deleteAllFromCart(cartId){
        const cartUpdate = await cartRepository.deleteAllFromCart(cartId);
        return cartUpdate
    }

    async updateCart(cartId, products){
        const cartUpdate = await cartRepository.updateCart(cartId, products);
        return cartUpdate;
    }

    async updateProductFromCart(cid,pid,quantity){
        const cartUpdated = await cartRepository.updateProductFromCart(cid,pid,quantity);
        return cartUpdated
    }

    async purchase(cid){
        const cart = await cartRepository.getCartById(cid);
        const products = [];
        const productsDeleted = []
        let amount = 0
        cart.products.forEach(({pid:{_id, price, stock}, quantity:qty}) => {
            if(qty > stock){
                const productUpdate = cartRepository.deleteFromCart(cid,_id);
                if(!productUpdate) throw new Error (`Error al eliminar el producto ${_id} del carrito ${cid}`);
                productsDeleted.push(productUpdate)
                return productsDeleted
            }else{
                let subtotal = qty*price
                products.push({
                    pid: _id,
                    quantity: qty,
                    subtotal: subtotal
                })
                amount += subtotal
            }
        });
        return {products, amount, productsDeleted}
    }
}

export const cartService = new CartService();