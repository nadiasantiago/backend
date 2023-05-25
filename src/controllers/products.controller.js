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
    const product = req.body;
    const productCreated = await productService.createProduct(product);
    if(!productCreated){
        return res.status(400).send({status:'error', error:'Error al cargar el producto'})
    }
    return res.send({status:'success', payload:productCreated})
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