import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";
import __dirname from "./utils.js";
import fs from 'fs'

const socket = {}



socket.connect = (server)=>{
    socket.io = new Server (server);
    const productManager = new ProductManager();

    socket.io.on('connection', async (socket)=>{
        console.log(`client connected`);
        const products = await productManager.getProducts();
        
        // socket.on('addProduct', async (data) => {
        //     await productManager.addProduct(data)
        // })

        // socket.on('upload', async(file)=>{
        //     file.forEach((e)=>{
        //         fs.writeFileSync(path.join(__dirname, `./public/img/${e.name}`), e.data)
        //     })
        // })

        socket.emit('products', products)
    })
}

export default socket