import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";
import { checkAuthorization } from "../middlewares/auth.js";

const router = Router();


//MODELO DE PERSISTENCIA CON DB
router.get('/', getProducts);

router.get('/:pid', getProductById);

router.post('/', (req, res, next)=>checkAuthorization(req, res, next, ['ADMIN', 'PREMIUM']), createProduct);

router.delete('/:pid', (req, res, next)=>checkAuthorization(req, res, next, ['ADMIN', 'PREMIUM']), deleteProduct);

router.put('/:pid', (req, res, next)=>checkAuthorization(req, res, next, ['ADMIN', 'PREMIUM']), updateProduct);

export default router