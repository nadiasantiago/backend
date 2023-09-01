import Exception from "../exceptions.js";
import { cartRepository } from "../repositories/index.js";
import { mailingService } from "./mailing.service.js";
import { productService } from "./products.service.js";
import { ticketService } from "./tickets.service.js";

class CartService {
  constructor() {}

  async addCart() {
    const cart = await cartRepository.addCart();
    return cart;
  }

  async getCarts() {
    const carts = await cartRepository.getCarts();
    return carts;
  }

  async getCartById(cartId) {
    const cartSearch = await cartRepository.getCartById(cartId);
    return cartSearch;
  }

  async addToCart(cartId, prodId) {
    const cartUpdate = await cartRepository.addToCart(cartId, prodId);
    return cartUpdate;
  }

  async deleteFromCart(cartId, prodId) {
    const cartUpdate = await cartRepository.deleteFromCart(cartId, prodId);
    return cartUpdate;
  }

  async deleteAllFromCart(cartId) {
    const cartUpdate = await cartRepository.deleteAllFromCart(cartId);
    return cartUpdate;
  }

  async updateCart(cartId, products) {
    const cartUpdate = await cartRepository.updateCart(cartId, products);
    return cartUpdate;
  }

  async updateProductFromCart(cid, pid, quantity) {
    const cartUpdated = await cartRepository.updateProductFromCart(
      cid,
      pid,
      quantity
    );
    return cartUpdated;
  }

  async checkCartStock(cid) {
    try {
      const cart = await cartRepository.getCartById(cid);
      const cartProducts = cart.products;
      const products = [];
      const productsDeleted = [];
      let amount = 0;

      if (cartProducts.length == 0) {
        throw new Exception(500, {
          status: "error",
          message: "el carrito se encuentra vacio",
        });
      }

      for (const {
        pid: { _id, price, stock, title },
        quantity: qty,
      } of cartProducts) {
        if (qty > stock) {
          const cartUpdated = await cartRepository.deleteFromCart(cid, _id);
          if (!cartUpdated)
            throw new Exception(500, {
              status: "error",
              message: `Error al eliminar el producto ${_id} del carrito ${cid}`,
            });
          const productWithoutStock = await productService.getProductById(_id);
          productsDeleted.push(productWithoutStock);
        } else {
          let subtotal = qty * price *1000;
          products.push({
            pid: _id,
            title: title,
            quantity: qty,
            subtotal: subtotal,
          });
          amount += subtotal;
        }
      }

      if (productsDeleted.length > 0) {
        throw new Exception(400, {
          status: "error",
          message:
            "No se pudo completar la compra. Hay productos que se encuentran sin stock suficiente",
          payload: productsDeleted,
        });
      }

      if (products.length == 0)
        throw new Exception(500, {
          status: "error",
          message: "todos los productos se encuentran sin stock",
        });
      return { products, amount };
    } catch (error) {
      throw error;
    }
  }
  async purchase(cid, user) {
    try {
      const cart = await cartRepository.getCartById(cid);
      const cartProducts = cart.products;
      const {products, amount} = await this.checkCartStock(cid)

      const ticketData = {
        products: products,
        purchaser: user.email,
        amount: amount,
      };

      const newTicket = await ticketService.createTicket(ticketData);
      if (!newTicket)
        throw new Exception(500, {
          status: "error",
          message: "Error al crear el ticket",
        });

      for (const {
        pid: { _id, stock },
        quantity: qty,
      } of cartProducts) {
        const newStock = { stock: stock - qty };
        await productService.updateProduct(_id, newStock);
      }

      await cartRepository.deleteAllFromCart(cid);
      await mailingService.ticketEmail(newTicket);
      return newTicket;
    } catch (error) {
      throw error;
    }
  }
}

export const cartService = new CartService();
