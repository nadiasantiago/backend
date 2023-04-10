import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import socket from './socket.js'
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const app = express();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

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

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@ecommerce.vgv42kx.mongodb.net/${dbName}?retryWrites=true&w=majority`)

socket.connect(httpServer)











