import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";

const socket = {}



socket.connect = (server)=>{
    socket.io = new Server (server);
    const productManager = new ProductManager();

    socket.io.on('connection', async (socket)=>{
        console.log(`client connected`);
        const products = await productManager.getProducts();

        socket.emit('products', products)
    })
}

export default socket