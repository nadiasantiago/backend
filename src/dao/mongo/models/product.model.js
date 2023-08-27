import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "comestibles",
  },
  thumbnails: {
    type: Array,
    default: [],
  },
  owner: {
    type: String,
    default: "admin",
    required: true,
  },
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export { productModel };
