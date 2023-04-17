import { Router } from "express";
// import ProductManager from "../dao/fileManagers/ProductManager.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";
const router = Router();
const productManager = new ProductManager();

router.get("/products", async (req, res) => {
    const {limit =10, page=1, category=null, status=null, sort=null} =req.query
    const {
        docs: 
        products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
    } = await productManager.getProducts(limit, page, category, status, sort);
    res.render("home", {
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        title:'Productos',
        style:"/css/style.css",
    });
});

router.get("/realtimeproducts", async (req, res) => {
    let products = await productManager.getProducts()
    res.render("realTimeProducts", {products});
});

router.get("/messages", async (req, res) => {
    let messages = await messagesManager.getMessages();
    res.render("messages", {messages});
});

//DESDE FILES
// router.get("/", async (req, res) => {
//     let products = await productManager.getProducts()
//     res.render("home", {products});
// });

// router.get("/realtimeproducts", async (req, res) => {
//     let products = await productManager.getProducts()
//     res.render("realTimeProducts", {products});
// });





export default router