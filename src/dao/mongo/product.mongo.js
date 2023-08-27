import { productModel } from "./models/product.model.js";

class Product {
  constructor() {}
  getProducts = async (limit, page, category, status, sort) => {
    try {
      let queries = {};
      category ? (queries.category = category.toLowerCase()) : null;
      status ? (queries.status = status.toLowerCase()) : null;
      parseInt(sort) == 1 ? (sort = { price: 1 }) : null;
      parseInt(sort) == -1 ? (sort = { price: -1 }) : null;
      const products = await productModel.paginate(queries, {
        limit,
        page,
        sort,
        lean: true,
      });

      products.hasPrevPage
        ? (products.prevLink = `/products?page=${products.prevPage}`)
        : null;
      products.hasNextPage
        ? (products.nextLink = `/products?page=${products.nextPage}`)
        : null;
      return products;
    } catch (error) {
      console.log(error);
    }
  };
  getProductById = async (pid) => {
    try {
      const product = await productModel.findOne({ _id: pid }).lean();
      return product;
    } catch (error) {
      console.log(error);
    }
  };
  create = async (product) => {
    try {
      const productCreated = await productModel.create(product);
      return productCreated;
    } catch (error) {
      console.log(error);
    }
  };
  delete = async (pid) => {
    try {
      const deletedProduct = await productModel.deleteOne({ _id: pid });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };
  update = async (pid, update) => {
    try {
      const updatedProduct = await productModel.updateOne({ _id: pid }, update);
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };
}

export const productMongo = new Product()