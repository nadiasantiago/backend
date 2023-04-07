import { productModel } from "../models/product.model.js";

export default class ProductManager {
    constructor (){
    }
    findAll = async()=>{
        try {
            const products = await productModel.find();
            return products
        } catch (error) {
            console.log(error);
        }
    }
    create = async(product)=>{
        try {
            const productCreated = await productModel.create(product);
            return productCreated
        } catch (error) {
            console.log(error);
        }
    }
    delete = async(pid)=>{
        try {
            const deletedProduct = await productModel.deleteOne({_id:pid});
            return deletedProduct
        } catch (error) {
            console.log(error);
        }
    }
    update = async(pid, update)=>{
        try {
            const updatedProduct = await productModel.updateOne({_id:pid},update);
            return updatedProduct
        } catch (error) {
            console.log(error);
        }
    }
}