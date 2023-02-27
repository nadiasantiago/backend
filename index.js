import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

const env = async () =>{
    let primerConsulta = await productManager.getProducts()
    console.log(primerConsulta);

    const product={
        title: 'producto prueba',
        description:'Este es un producto prueba',
        price:200,
        thumbnail:'Sin imagen',
        code:'abc123',
        stock:25
    }

    let result = await productManager.addProduct(product);
    console.log(result);

    let segundaConsulta = await productManager.getProducts();
    console.log(segundaConsulta);
};

env();