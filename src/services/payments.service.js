import Stripe from "stripe";
import config from "../config/config.js";

const {
  stripe: { STRIPE_SECRET },
} = config;

class PaymentService {
  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET);
  }
  createPaymentIntent = async (amount) => {
    const paymentIntentInfo = {
      amount: amount * 1000,
      currency: "usd",
      payment_method_types: ["card"],
    };
    const paymentIntent = await this.stripe.paymentIntents.create(
      paymentIntentInfo
    );
    return paymentIntent;
  };
}

export const paymentService = new PaymentService();
