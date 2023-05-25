import ProductManager from '../dao/dbManagers/ProductManager.js'
const productManager = new ProductManager();

class ProductsRepository {
    constructor(productManager){
    }

    getProducts = async(limit, page, category, status, sort)=>{
        const products = productManager.getProducts(limit, page, category, status, sort);
        return products;
    }
    getProductById = async(pid)=>{
        try {
            const product = await productManager.getProductById(pid);
            return product
        } catch (error) {
            console.log(error)
        }
    }
    createProduct = async(product)=>{
        try {
            const productCreated = await productManager.create(product);
            return productCreated
        } catch (error) {
            console.log(error);
        }
    }
    deleteProduct = async(pid)=>{
        try {
            const deletedProduct = await productManager.delete(pid);
            return deletedProduct
        } catch (error) {
            console.log(error);
        }
    }
    updateProduct = async(pid, update)=>{
        try {
            const updatedProduct = await productManager.update(pid,update);
            return updatedProduct
        } catch (error) {
            console.log(error);
        }
    }
}

export const productsRepository = new ProductsRepository();