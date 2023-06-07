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
        cart.products.forEach(({pid:{_id, price, stock}, quantity:qty}) => {
            if(qty > stock){
                const productUpdate = cartRepository.updateProductFromCart(cid,_id,stock);
                if(!productUpdate) throw new Error (`Error al actualizar el producto ${_id} del carrito ${cid}`);
                return
            }else if(qty == 0){
                const removeProduct = cartRepository.deleteFromCart(cid, _id);
                return
            }else{
                products.push({
                    pid: _id,
                    quantity: qty,
                    subtotal: qty * price
                })
            }
        });
        return products
    }
}

export const cartService = new CartService();