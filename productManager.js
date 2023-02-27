import fs from 'fs'

export default class ProductManager {
    constructor(){
        this.path = './files/Products.json';
    }

    getProducts = async () => {
        if(fs.existsSync(this.path)) {
            const prod = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(prod);
            console.log(result);
            return result;
        }else{
            return [];
        }
    }

    // getProductById = (prodId) =>{ JSON.PARSE
    //     const productSearch = this.products.find((prod)=>prod.id == prodId)
    //     if (productSearch){
    //         console.log(productSearch) JSON.PARSE
    //     }else{
    //         console.error(`No se ha encontrado ningun producto con el id: ${prodId}`)
    //     }
    // }

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

}

// const productManager = new ProductManager()


