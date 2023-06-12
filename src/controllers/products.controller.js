import CustomError from "../services/errors/CustomErrors.js";
import EErrors from "../services/errors/enum.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import { productService } from "../services/products.service.js";

export const getProducts = async(req, res)=>{
    const {limit =10, page=1, category=null, status=null, sort=null} =req.query
    const products = await productService.getProducts(limit, page, category, status, sort);
    return res.send({status:'success', payload:products})
}

export const getProductById = async(req, res)=>{
    const prodId = req.params.pid;
    const productSearch = await productService.getProductById(prodId)
    if (productSearch) {
        res.status(200).send({status:'OK', message:productSearch})
    }else{
        res.status(404).send({status:'Error', message: `No se han encontrado productos con el id:${prodId}`})
    }
}

export const createProduct = async (req, res)=>{
    try {
        const product = req.body;
        if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category){
            throw new CustomError({
                name: 'ProductError',
                cause: generateProductErrorInfo(product),
                message: "Error trying to create a new product",
                code: EErrors.INVALID_TYPES_ERROR,
            });
        }
        const productCreated = await productService.createProduct(product);
        if(!productCreated){
            return res.status(400).send({status:'error', error:'Error al cargar el producto'})
        }
        return res.send({status:'success', payload:productCreated})
    } catch (error) {
        if(error instanceof CustomError){
            let status=400
            if(error.code == EErrors.DATABASE_ERROR){
                status = 400
            }else(error.code == (EErrors.INVALID_TYPES_ERROR || EErrors.ROUTING_ERROR))
                status = 500
            
            res.status(status).json({status:error.message, error:error.cause})
        }else{
            res.status(error.status).json({status:error.message, error:error.cause})
        }
    }
}

export const deleteProduct = async (req, res)=>{
    try {
        const {pid} = req.params;
        const deletedProduct = await productService.deleteProduct(pid);
        return res.send({status:'success', payload:deletedProduct})
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async(req, res)=>{
    try {
        const {pid} = req.params;
        const update = req.body;
        if(!update) {
            return res.send(400).send({status:'error', error:'missing information'})
        }

        const updatedProduct = await productService.updateProduct(pid, update)
        return res.send({status:'Success', payload: updatedProduct})

    } catch (error) {
        console.log(error);
    }
}