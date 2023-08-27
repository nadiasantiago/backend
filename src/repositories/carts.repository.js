export default class CartRepository {
  constructor(dao) {
    this.dao = dao
  }

  addCart = async () => {
    const cart = await this.dao.addCart();
    return cart;
  };

  getCarts = async () => {
    const carts = await this.dao.getCarts();
    return carts;
  };

  getCartById = async (cartId) => {
    const cartSearch = await this.dao.getCartById(cartId);
    return cartSearch;
  };

  addToCart = async (cartId, prodId) => {
    const cartUpdate = await this.dao.addToCart(cartId, prodId);
    return cartUpdate;
  };

  deleteFromCart = async (cartId, prodId) => {
    const cartUpdate = await this.dao.deleteFromCart(cartId, prodId);
    return cartUpdate;
  };

  deleteAllFromCart = async (cartId) => {
    const cartUpdate = await this.dao.deleteAllFromCart(cartId);
    return cartUpdate;
  };

  updateCart = async (cartId, products) => {
    const cartUpdate = await this.dao.updateCart(cartId, products);
    return cartUpdate;
  };

  updateProductFromCart = async (cid, pid, quantity) => {
    const cartUpdated = await this.dao.updateProductFromCart(
      cid,
      pid,
      quantity
    );
    return cartUpdated;
  };
}

