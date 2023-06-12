import express from "express";
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import productRouter from "./routes/products.router.js";
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/session.router.js';
import messageRouter from './routes/messages.router.js';
import { compare } from "./views/helper.js";
import __dirname from "./utils.js";
import socket from './socket.js'
import database from "./db.js";
import morgan from "morgan";
import config from "./config.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import errorHandler from './middlewares/errors/error.js';
const app = express();


//middlewares
app.use(express.json()); //leer en formato json
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(morgan('dev'));

initializePassport();
app.use(passport.initialize());
// app.use(passport.session());


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionsRouter)
app.use('/api/messages', messageRouter)

app.use(errorHandler);

//configuracion handlebars

app.engine('handlebars', handlebars.engine({
    helpers: {
        compare: compare,
    },
    defaultLayout: "main",
}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars' );
app.use('/', viewsRouter);

const httpServer = app.listen(8080, ()=>{
    console.log('servidor arriba en el puerto 8080')
});

database.connect();
socket.connect(httpServer)











