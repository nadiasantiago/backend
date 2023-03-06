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
        const productSearch = await productManager.getProductById(prodId)
        if (productSearch) {
            res.send(productSearch)
        }else{
            res.send({Error: `No se han encontrado productos con el id:${prodId}`})
        }
    })

    app.listen(8080, ()=>{
        console.log('servidor arriba en el puerto 8080')
    })

};

env();