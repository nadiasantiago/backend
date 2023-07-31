import CartManager from "../dao/dbManagers/CartManager.js";

const cartManager = new CartManager();

class CartRepository {
  constructor(cartManager) {}

  addCart = async () => {
    const cart = await cartManager.addCart();
    return cart;
  };

  getCarts = async () => {
    const carts = await cartManager.getCarts();
    return carts;
  };

  getCartById = async (cartId) => {
    const cartSearch = await cartManager.getCartById(cartId);
    return cartSearch;
  };

  addToCart = async (cartId, prodId) => {
    const cartUpdate = await cartManager.addToCart(cartId, prodId);
    return cartUpdate;
  };

  deleteFromCart = async (cartId, prodId) => {
    const cartUpdate = await cartManager.deleteFromCart(cartId, prodId);
    return cartUpdate;
  };

  deleteAllFromCart = async (cartId) => {
    const cartUpdate = await cartManager.deleteAllFromCart(cartId);
    return cartUpdate;
  };

  updateCart = async (cartId, products) => {
    const cartUpdate = await cartManager.updateCart(cartId, products);
    return cartUpdate;
  };

  updateProductFromCart = async (cid, pid, quantity) => {
    const cartUpdated = await cartManager.updateProductFromCart(
      cid,
      pid,
      quantity
    );
    return cartUpdated;
  };
}

export const cartRepository = new CartRepository();
