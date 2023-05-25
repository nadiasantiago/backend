import { cartService } from "../services/carts.service.js";
import { productService } from "../services/products.service.js";

export const register = (req,res)=>{
    res.render('register',{title: 'Registro'});
}

export const login = (req,res)=>{
    res.render('login', {title:'Iniciar sesion'});
}

export const products = async (req, res) => {
    const {limit=10, page=1, category=null, status=null, sort=null} =req.query;

    const {
        docs: 
        products,
        totalPages,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,    

    } = await productService.getProducts(limit, page, category, status, sort);
    
    if (isNaN(page) || page>totalPages) {
        return res.status(400).send({status: "error", error: `Page ${page} is not a valid value`});
    }

    const carts = await cartService.getCarts()
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
        user: req.user,
        title:'Productos',
        style:"/css/style.css",
    });
}

export const product = async(req,res)=>{
    const {pid}= req.params;
    const product = await productService.getProductById(pid);
    const carts = await cartService.getCarts()
    const cart_obj = carts.map(c => ({
        id: c._id.toString(),
    }));
    res.render('product', {product, cart_obj})
}

export const cart = async(req,res)=>{
    const {cid}=req.params;
    const cart = await cartService.getCartById(cid)
    res.render('cart', cart)
}