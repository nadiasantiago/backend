import { cartService } from "../services/carts.service.js";
import { paymentService } from "../services/payments.service.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const createPaymentIntent = async (req, res) => {
  try {
    const { jwtCookie: token } = req.cookies;
    const { cart } = jwt.verify(token, config.jwtSecret, {
      ignoreExpiration: true,
    });
    const {amount } = await cartService.checkCartStock(cart);
    if (!amount) {
      return res
        .status(404)
        .send({
          status: "error",
          message: "Error al obtener el total del carrito",
        });
    }

    const paymentIntent = await paymentService.createPaymentIntent(amount);
    if (!paymentIntent) {
      return res
        .status(404)
        .send({ status: "error", message: "Error al generar el pago" });
    }

    return res
      .status(200)
      .send({ status: "success", clientSecret:paymentIntent.client_secret});
  } catch (error) {
    console.log(error);
  }
};
