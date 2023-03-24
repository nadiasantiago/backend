import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import socket from './socket.js'
// const express = require ("express")

const app = express();
app.use(express.json()); //leer en formato json
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

//configuracion handlebars

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars' );
app.use('/', viewsRouter);

const httpServer = app.listen(8080, ()=>{
    console.log('servidor arriba en el puerto 8080')
});

socket.connect(httpServer)











