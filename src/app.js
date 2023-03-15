import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from './routes/cart.router.js'

// const express = require ("express")

const app = express();
app.use(express.json()); //leer en formato json
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


const server = app.listen(8080, ()=>{
    console.log('servidor arriba en el puerto 8080')
})




