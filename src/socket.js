import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";
import __dirname from "./utils.js";
import { writeFileSync } from 'fs'
import path from "path";

const socket = {}



socket.connect = (server)=>{
    socket.io = new Server (server);
    const productManager = new ProductManager();

    socket.io.on('connection', async (socket)=>{
        console.log(`client connected`);
        const products = await productManager.getProducts();
        

        socket.on('upload', async(file)=>{
            file.forEach((e)=>{
                writeFileSync(path.join(__dirname, `./public/img/${e.name}`), e.data)
            })
        })

        socket.emit('products', products)
    })
}

export default socket