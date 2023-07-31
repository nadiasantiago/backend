import mongoose from "mongoose";

const Schema = mongoose.Schema.Types;
const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      pid: {
        type: Schema.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export { cartModel };
