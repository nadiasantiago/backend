import fs from 'fs'
import socket from './socket.js'


export default class ProductManager {
    constructor(){
        this.path = './files/Products.json';
    }

    getProducts = async () => {
        if(fs.existsSync(this.path)) {
            const prod = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(prod);
            return result;
        }else{
            return [];
        }
    }

    getProductById = async (prodId) =>{
        const products = await this.getProducts();
        const productSearch = products.find((prod)=>prod.id == prodId)
        if (productSearch){
            return productSearch;
        }else{
            console.error(`No se ha encontrado ningun producto con el id: ${prodId}`)
        }
    }

    addProduct = async (product) =>{
        const products = await this.getProducts();
        if(products.length === 0){
            product.id = 1;
        }else{
            product.id = products[products.length -1].id +1
        }
        product.satus = true;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products
    }

    deleteProduct = async (id)=>{
        const product = await this.getProductById(id);
        if(product != undefined){
            const products = await this.getProducts();
            const newProducts = products.filter(prod => prod.id != id)
    
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, '\t'));
            return newProducts;    
        }
    }

    updateProduct = async (id, changes)=>{
        const products = await this.getProducts();
        const productIndex = products.findIndex((prod)=>prod.id == id);
        console.log(productIndex);
        if(productIndex != -1){
            const newProduct = {
                ...products[productIndex],
                ...changes
            }
            
            products[productIndex] = newProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return newProduct;
        }
    }
}



