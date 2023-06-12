import { productsRepository } from "../repositories/products.repository.js";
import CustomError from "./errors/CustomErrors.js";

class ProductService{
    constructor(){}
    async getProducts (limit, page, category, status, sort){
        const products = await productsRepository.getProducts(limit, page, category, status, sort);
        return products;
    }
    async getProductById(pid){
        const product = await productsRepository.getProductById(pid);
        return product;
    }
    async createProduct(product){
        const productCreated = await productsRepository.createProduct(product);
        return productCreated
    }
    async deleteProduct(pid){
        const productDeleted = await productsRepository.deleteProduct(pid);
        return productDeleted
    }
    async updateProduct(pid, update){
        const updatedProduct = await productsRepository.updateProduct(pid, update);
        return updatedProduct
    }
}

export const productService = new ProductService();