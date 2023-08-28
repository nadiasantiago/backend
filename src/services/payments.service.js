import Stripe from "stripe";
import config from "../config/config.js";

const {
  stripe: { STRIPE_SECRET },
} = config;

class PaymentService {
  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET);
  }
  orderAmount = (products)=>{
    let amount = 0
    products.forEach((prod) => {
      const {pid, quantity} = prod
      const {price} = pid
      amount += price * quantity
      return amount * 100
    });
  }

  createPaymentIntent = async(products)=>{
    const paymentIntentInfo = {
      amount: this.orderAmount(products),
      currency: 'usd'
    }

    const paymentIntent = await this.stripe.paymentIntents.create(paymentIntentInfo)
    return paymentIntent
  }
}

export const paymentService = new PaymentService()

