export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async (limit, page, category, status, sort) => {
    const products = this.dao.getProducts(
      limit,
      page,
      category,
      status,
      sort
    );
    return products;
  };
  getProductById = async (pid) => {
    try {
      const product = await this.dao.getProductById(pid);
      return product;
    } catch (error) {
      console.log(error);
    }
  };
  createProduct = async (product) => {
    try {
      const productCreated = await this.dao.create(product);
      return productCreated;
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (pid) => {
    try {
      const deletedProduct = await this.dao.delete(pid);
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };
  updateProduct = async (pid, update) => {
    try {
      const updatedProduct = await this.dao.update(pid, update);
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };
}