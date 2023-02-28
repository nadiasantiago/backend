import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

const env = async () =>{
    // let primerConsulta = await productManager.getProducts()
    // console.log(primerConsulta);

    // const product={
    //     title: 'producto prueba',
    //     description: 'Este es un producto prueba',
    //     price: 200,
    //     thumbnail: 'Sin imagen',
    //     code: 'abc124',
    //     stock: 25
    // }

    // let result = await productManager.addProduct(product);
    // console.log(result)

    // let segundaConsulta = await productManager.getProducts();
    // console.log(segundaConsulta)

    // let consultaId = await productManager.getProductById(1)
    // console.log(consultaId);

    // let productsDepurados = await productManager.deleteProduct(5)
    // console.log(productsDepurados)

    const productChanged={
        stock:200,
    }

    let productUpdate = await productManager.updateProduct(2,productChanged);
    console.log(productUpdate)


};

env();