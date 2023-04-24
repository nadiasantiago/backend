import express from "express";
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser";
import session from "express-session";
import productRouter from "./routes/products.router.js";
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import messagesRouter from './routes/messages.router.js';
import sessionsRouter from './routes/session.router.js'
import __dirname from "./utils.js";
import socket from './socket.js'
import database from "./db.js";
import morgan from "morgan";

const app = express();


//middlewares
app.use(express.json()); //leer en formato json
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/sessions', sessionsRouter)



//configuracion handlebars

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars' );
app.use('/', viewsRouter);

const httpServer = app.listen(8080, ()=>{
    console.log('servidor arriba en el puerto 8080')
});

database.connect();
// socket.connect(httpServer)











