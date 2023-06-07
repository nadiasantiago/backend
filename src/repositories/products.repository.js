import ProductManager from '../dao/dbManagers/ProductManager.js'
const productManager = new ProductManager();

class ProductsRepository {
    constructor(productManager){
        this.productManager = productManager
    }

    getProducts = async(limit, page, category, status, sort)=>{
        const products = this.productManager.getProducts(limit, page, category, status, sort);
        return products;
    }
    getProductById = async(pid)=>{
        try {
            const product = await this.productManager.getProductById(pid);
            return product
        } catch (error) {
            console.log(error)
        }
    }
    createProduct = async(product)=>{
        try {
            const productCreated = await this.productManager.create(product);
            return productCreated
        } catch (error) {
            console.log(error);
        }
    }
    deleteProduct = async(pid)=>{
        try {
            const deletedProduct = await this.productManager.delete(pid);
            return deletedProduct
        } catch (error) {
            console.log(error);
        }
    }
    updateProduct = async(pid, update)=>{
        try {
            const updatedProduct = await this.productManager.update(pid,update);
            return updatedProduct
        } catch (error) {
            console.log(error);
        }
    }
}

export const productsRepository = new ProductsRepository(productManager);