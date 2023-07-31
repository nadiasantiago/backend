import { productsRepository } from "../repositories/products.repository.js";
import CustomError from "../errors/CustomErrors.js";

class ProductService{
    constructor(productsRepository){
        this.productsRepository = productsRepository
    }
    async getProducts (limit, page, category, status, sort){
        const products = await this.productsRepository.getProducts(limit, page, category, status, sort);
        return products;
    }
    async getProductById(pid){
        const product = await this.productsRepository.getProductById(pid);
        return product;
    }
    async createProduct(product, user){
        const productCreated = await this.productsRepository.createProduct(product, user);
        return productCreated
    }
    async deleteProduct(pid){
        const productDeleted = await this.productsRepository.deleteProduct(pid);
        return productDeleted
    }
    async updateProduct(pid, update){
        const updatedProduct = await this.productsRepository.updateProduct(pid, update);
        return updatedProduct
    }
}

export const productService = new ProductService(productsRepository);