import { Router } from "express";
// import ProductManager from "../dao/fileManagers/ProductManager.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";
import CartManager from "../dao/dbManagers/CartManager.js";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/register', checkLogged, (req,res)=>{
    res.render('register');
});

router.get('/', checkLogged, (req,res)=>{
    res.render('login');
});

router.get("/products", checkLogin, async (req, res) => {
    const {limit=10, page=1, category=null, status=null, sort=null} =req.query;

    const {
        docs: 
        products,
        totalPages,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,    

    } = await productManager.getProducts(limit, page, category, status, sort);
    
    if (isNaN(page) || page>totalPages) {
        return res.status(400).send({status: "error", error: `Page ${page} is not a valid value`});
    }

    const carts = await cartManager.getCarts()
    const cart_obj = carts.map(c => ({
        id: c._id.toString(),
    }))
    res.render("home", {
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        cart_obj,
        user: req.session.user,
        title:'Productos',
        style:"/css/style.css",
    });
});

router.get('/products/:pid', checkLogin, async(req,res)=>{
    const {pid}= req.params;
    const product = await productManager.getProductById(pid);
    const carts = await cartManager.getCarts()
    const cart_obj = carts.map(c => ({
        id: c._id.toString(),
    }));
    res.render('product', {product, cart_obj})
})
router.get('/carts/:cid', checkLogin, async(req,res)=>{
    const {cid}=req.params;
    const cart = await cartManager.getCartById(cid)
    res.render('cart', cart)
})
router.get("/realtimeproducts", checkLogin, async (req, res) => {
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