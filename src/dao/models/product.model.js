import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    unique: true,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    require: true,
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
    require: true,
  },
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export { productModel };
