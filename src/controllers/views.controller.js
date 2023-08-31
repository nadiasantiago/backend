import { cartService } from "../services/carts.service.js";
import { messageService } from "../services/messages.service.js";
import { productService } from "../services/products.service.js";
import { sessionService } from "../services/sessions.service.js";
import { generateProduct } from "../utils/utils.js";

let productsMock = [];

export const register = (req, res) => {
  res.render("register", { title: "Registro" });
};

export const login = (req, res) => {
  res.render("login", { title: "Iniciar sesion" });
};

export const products = async (req, res) => {
  const {
    limit = 10,
    page = 1,
    category = null,
    status = null,
    sort = null,
  } = req.query;

  const {
    docs: products,
    totalPages,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  } = await productService.getProducts(limit, page, category, status, sort);

  if (isNaN(page) || page > totalPages) {
    return res
      .status(400)
      .send({ status: "error", error: `Page ${page} is not a valid value` });
  }

  res.render("home", {
    products,
    page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    user: req.user,
    title: "Productos",
    style: "/css/style.css",
  });
};

export const product = async (req, res) => {
  const { pid } = req.params;
  const product = await productService.getProductById(pid);
  res.render("product", {
    product,
    user: req.user,
  });
};

export const cart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartById(cid);
  res.render("cart", cart);
};

export const message = async (req, res) => {
  let messages = await messageService.getMessages();
  res.render("messages", { messages });
};

export const realTimeProducts = async (req, res) => {
  res.render("realTimeProducts");
};

export const viewMoking = (req, res) => {
  for (let i = 0; i < 100; i++) {
    productsMock.push(generateProduct());
  }
  res.send({ status: "succes", payload: productsMock });
};

export const restorePassword = (req, res) =>{
  res.render('restorePassword');
}

export const resetPassword = (req, res)=>{
  res.render('resetPassword')
}

export const profileView = async (req, res)=>{
  try {
    const { email } = req.user
    const user = await sessionService.getUser({email})
    const profilePicture = user?.documents?.[0]?.reference
    res.render('profile', {
      userId: user._id,
      user: req.user,
      profilePicture,
    })

  }catch(error){
    console.log(error)
  }
}

export const adminView = async (req, res)=>{
  try {
    
  } catch (error) {
    console.log(error)
  }
}

export const payment = (req, res)=>{
  res.render('payment')
}
