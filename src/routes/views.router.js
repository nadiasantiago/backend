import { Router } from "express";
// import ProductManager from "../dao/fileManagers/ProductManager.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";
const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    let products = await productManager.findAll()
    res.render("home", {products});
});

router.get("/realtimeproducts", async (req, res) => {
    let products = await productManager.findAll()
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