import ProductManager from "./ProductManager.js";
import express from "express";


// const express = require ("express")

const app = express();
const productManager = new ProductManager();


const env = async () =>{
    
    let products = await productManager.getProducts()

    app.get('/products', async (req, res)=>{
        const limit = req.query.limit;
        if(!limit || limit < 0) return res.send(products);

        const limitedProducts = await products.slice(0,limit);
        res.send({Produdcts: limitedProducts})
    })
    app.get('/products/:id', async (req, res)=>{
        const prodId = req.params.id;
        res.send(await productManager.getProductById(prodId))
    })

    app.listen(8080, ()=>{
        console.log('servidor arriba en el puerto 8080')
    })

    // let primerConsulta = await productManager.getProducts()
    // console.log(primerConsulta);




    let consultaId = await productManager.getProductById(1)
    console.log(consultaId);

    // let productsDepurados = await productManager.deleteProduct(5)
    // console.log(productsDepurados)



};

env();