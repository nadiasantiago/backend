import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";

const router = Router();


//MODELO DE PERSISTENCIA CON DB
router.get('/', getProducts);

router.get('/:pid', getProductById);

router.post('/', createProduct);

router.delete('/:pid', deleteProduct);

router.put('/:pid', updateProduct);

export default router