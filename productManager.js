import fs from 'fs'

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
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error('Todos los campos son obligatorios');
            return;
        }

        const productCode = products.findIndex((prod)=>prod.code === product.code);
        if(productCode !== -1){
            console.log(`Ya existe un producto con el code: ${product.code}`);
            return;
        }

        if(products.length === 0){
            product.id = 1;
        }else{
            product.id = products[products.length -1].id +1
        }

        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return product;
    }

    deleteProduct = async (id)=>{
        const product = await this.getProductById(id);
        if(product === undefined){
            return
        }

        const products = await this.getProducts();
        const newProducts = products.filter(prod => prod.id != id)

        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, '\t'));
        return newProducts;
    }

    updateProduct = async (id, productChanged)=>{
        const product = await this.getProductById(id);
        const products = await this.getProducts();
        const productIndex = products.findIndex((prod)=>prod.id === id);
        if(productIndex != -1){
            const newProduct = {
                title: productChanged.title?? product.title,
                description: productChanged.description?? product.description,
                price: productChanged.price?? product.price,
                thumbnail: productChanged.thumbnail?? product.thumbnail,
                code: productChanged.code?? product.code,
                stock: productChanged.stock?? product.stock,
                id: id
            }
            
            products[productIndex] = newProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return newProduct;
        }
    }
}



