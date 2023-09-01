import { cartService } from "../services/carts.service.js";

export const addCart = async (req, res) => {
  let cart = await cartService.addCart();
  if (!cart) {
    return res
      .status(500)
      .send({ status: "error", error: "Error al crear el carrito" });
  }
  return res.status(201).send({
    status: "success",
    message: "Carrito creado con exito",
    payload: cart,
  });
};

export const getCarts = async (req, res) => {
  const carts = await cartService.getCarts();
  if (!carts) {
    return res
      .status(500)
      .send({ status: "error", error: "Error al obtener los carritos" });
  }
  return res.status(200).send({
    status: "success",
    message: "Carritos obtenidos existosamente",
    payload: carts,
  });
};

export const getCartById = async (req, res) => {
  const cartId = req.params.cid;
  const cartSearch = await cartService.getCartById(cartId);
  if (cartSearch) {
    return res.status(200).send({
      status: "success",
      message: "carrito obtenido exitosamente",
      payload: cartSearch,
    });
  } else {
    return res.status(500).send({
      status: "Error",
      error: `No se ha encontrado carrito con el id:${cartId}`,
    });
  }
};

export const addToCart = async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;
  if (!cartId || !prodId) {
    return res
      .status(500)
      .send({ status: "Error", message: "Error al cargar los datos" });
  }
  const cartUpdate = await cartService.addToCart(cartId, prodId);
  if (!cartUpdate) {
    return res
      .status(500)
      .send({ status: "Error", message: "Error al cargar los datos" });
  }

  res.status(201).send({
    status: "success",
    message: "Producto agregado exitosamente al carrito",
    payload: cartUpdate,
  });
};

export const deleteFromCart = async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;
  if (!cartId || !prodId) {
    return res
      .status(500)
      .send({ status: "Error", message: "Error al cargar los datos" });
  }

  const cartUpdate = await cartService.deleteFromCart(cartId, prodId);
  if (!cartUpdate) {
    return res
      .status(500)
      .send({ status: "Error", message: "Error al cargar los datos" });
  }

  return res.status(201).send({
    status: "success",
    message: "Producto eliminado exitosamentel del carrito",
    payload: cartUpdate,
  });
};

export const deleteAllFromCart = async (req, res) => {
  const cartId = req.params.cid;
  const cartUpdate = await cartService.deleteAllFromCart(cartId);
  if (!cartUpdate) {
    return res
      .status(500)
      .send({ status: "error", error: "Error al eliminar el carrito" });
  }
  return res.status(201).send({
    status: "success",
    message: "Carrito vaciado exitosamente",
    payload: cartUpdate,
  });
};

export const updateCart = async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body;
  const cartUpdate = await cartService.updateCart(cartId, products);
  if (!cartUpdate) {
    return res
      .status(500)
      .send({ status: "error", error: "Error al actualizar el carrito" });
  }
  return res.status(201).send({
    status: "success",
    message: "Carrito actualizado exitosamente",
    payload: cartUpdate,
  });
};

export const updateProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    if (!cid || !pid)
      return res
        .status(500)
        .send({ status: "error", payload: { error: "campos icompletos" } });

    const cartUpdated = await cartService.updateProductFromCart(
      cid,
      pid,
      quantity
    );
    if (!cartUpdated) {
      return res
        .status(500)
        .send({ status: "Error", message: "Error al cargar los datos" });
    }
    res.status(201).send({
      status: "success",
      message: "Producto actualizado exitosamente en el carrito",
      payload: cartUpdated,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (req, res) => {
  try {
    const { cid } = req.params;
    const user = req.user;
    if (!cid)
      return res
        .status(500)
        .send({ status: "error", message: "no existe el carrito" });

    const completedPurchase = await cartService.purchase(cid, user);
    if (completedPurchase)
      res.status(201).send({
        status: "success",
        message: `compra generada exitosamente. Carrito:${cid}`,
        payload: completedPurchase,
      });
  } catch (error) {
    console.log(error)
    // res.status(error.statusCode).send(error);
  }
};
