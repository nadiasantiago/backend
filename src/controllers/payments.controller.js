import { cartService } from "../services/carts.service.js";
import { paymentService } from "../services/payments.service.js";

export const createPaymentIntent = async (req, res) => {
  try {
    const {jwtCookie: token} = req.cookies
    const {cart}= jwt.verify(token, config.jwtSecret, {
      ignoreExpiration: true,
    });
    const {products} = await cartService.getCartById(cart)
    if(!products){
      return res.status(404).send({status:'error', message:'Error al obtener los productos del carrito'})
    }
    const paymentIntent = await paymentService.createPaymentIntent(products)
    if(!paymentIntent){
      return res.status(404).send({status:'error', message:'Error al generar el pago'})
    }

  } catch (error) {
    console.log(error)
  }
};
