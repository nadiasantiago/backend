import { Server } from "socket.io";
// import ProductManager from "./dao/fileManagers/ProductManager.js";
import __dirname from "./utils/utils.js";
import { writeFileSync } from 'fs'
import path from "path";
import { productMongo } from "./dao/mongo/product.mongo.js";

const socket = {}



socket.connect = (server)=>{
    socket.io = new Server (server);

    socket.io.on('connection', async (socket)=>{
        console.log(`client connected`);
        const products = await productMongo.findAll();
        

        socket.on('upload', async(file)=>{
            file.forEach((e)=>{
                writeFileSync(path.join(__dirname, `./public/img/${e.name}`), e.data)
            })
        })

        socket.emit('products', products)
    })
}

export default socket