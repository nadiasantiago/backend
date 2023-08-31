import { Router } from "express";
import { checkAuthorization } from "../middlewares/auth.js";
import { createPaymentIntent } from "../controllers/payments.controller.js";

const router = Router();

router.post(
  "/create-payment-intent",
  (req, res, next) => checkAuthorization(req, res, next, ["USER", "PREMIUM"]),
  createPaymentIntent
);

export default router;
