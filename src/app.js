import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';
import cors from 'cors'
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/session.router.js";
import messageRouter from "./routes/messages.router.js";
import loggerTestRouter from "./routes/logger.router.js";
import userRouter from './routes/user.router.js';
import paymentsRouter from './routes/payments.router.js'
import { compare } from "./views/helper.js";
import __dirname from "./utils/utils.js";
import socket from "./socket.js";
import database from "./db.js";
import morgan from "morgan";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import errorHandler from "./middlewares/errors/error.js";
import { addLogger } from "./utils/logger.js";
import config from "./config/config.js";
const app = express();

const {port} = config
const swaggerOptions = {
  definition:{
    openapi: '3.0.1',
    info:{
      title: 'Eccommerce Backend API',
      description: 'Documentacion que soporta el sistema Eccommerce Backend'
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions)
//middlewares
app.use(express.json()); //leer en formato json
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(addLogger);
app.use(cors())

initializePassport();
app.use(passport.initialize());
// app.use(passport.session());
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/messages", messageRouter);
app.use('/api/user', userRouter)
app.use('/api/payments', paymentsRouter)

//configuracion handlebars

app.engine(
  "handlebars",
  handlebars.engine({
    helpers: {
      compare: compare,
      lookup: function (obj, key) {
        return obj[key];
      }
    },
    defaultLayout: "main",
  })
);
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use("/", viewsRouter);
app.use("/loggerTest", loggerTestRouter);
app.use(errorHandler);

const httpServer = app.listen(port, () => {
  console.log(`servidor arriba en el puerto ${port}`);
});

database.connect();
socket.connect(httpServer);
