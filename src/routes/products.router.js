import { Router } from "express";
// import ProductManager from "../dao/fileManagers/ProductManager.js";
import { uploader } from "../utils.js";
import __dirname from "../utils.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();


//MODELO DE PERSISTENCIA CON DB
const productManager = new ProductManager();
router.get('/', async (req, res)=>{
    const {limit =10, page=1, category=null, status=null, sort=null} =req.query
    const products = await productManager.getProducts(limit, page, category, status, sort);
    return res.send({status:'success', payload:products})
});

router.get('/:pid', async (req, res)=>{
    const prodId = req.params.pid;
    const productSearch = await productManager.getProductById(prodId)
    if (productSearch) {
        res.status(200).send({status:'OK', message:productSearch})
    }else{
        res.status(404).send({status:'Error', message: `No se han encontrado productos con el id:${prodId}`})
    }
})


router.post('/', async (req, res)=>{
    const product = req.body;
    const productCreated = await productManager.create(product);
    if(!productCreated){
        return res.status(400).send({status:'error', error:'Error al cargar el producto'})
    }
    return res.send({status:'success', payload:productCreated})
});

router.delete('/:pid', async(req, res)=>{
    try {
        const {pid} = req.params;
        const deletedProduct = await productManager.delete(pid);
        return res.send({status:'success', payload:deletedProduct})
    } catch (error) {
        console.log(error);
    }
})

router.put('/:pid', async(req, res)=>{
    try {
        const {pid} = req.params;
        const update = req.body;
        if(!update) {
            return res.send(400).send({status:'error', error:'missing information'})
        }

        const updatedProduct = await productManager.update(pid, update)
        return res.send({status:'Success', payload: updatedProduct})

    } catch (error) {
        console.log(error);
    }
})






//MODELO DE PERSISTENCIA CON FILES

// const productManager = new ProductManager();
// let products = await productManager.getProducts()

// router.get('/', async (req, res)=>{
//     const limit = req.query.limit;
//     res.send(products.slice(0,limit))
// }) 


// router.get('/', async (req, res)=>{
//     if (products.length === 0){
//         return res
//         .status(404)
//         .send({status:'Error', message:'No se han encontrado productos'})
//     }

//     res.status(200).send({status:'OK', message:products});
// })

// router.get('/:pid', async (req, res)=>{
//     const prodId = req.params.pid;
//     const productSearch = await productManager.getProductById(prodId)
//     if (productSearch) {
//         res.status(200).send({status:'OK', message:productSearch})
//     }else{
//         res.status(404).send({status:'Error', message: `No se han encontrado productos con el id:${prodId}`})
//     }
// })

// router.post('/', uploader.array('thumbnails'), async (req, res)=>{
//     let product = req.body;
//     const thumbnails = req.files;
//     if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category){
//         return res.status(400).send({status: 'Error', message:'Campos incompletos'});
//     }
//     const productCode = products.findIndex((prod)=>prod.code === product.code);
//     console.log(productCode)
//     if(productCode !== -1){
//         return res.status(400).send({status:'Error', message:`Ya existe un producto con el code: ${product.code}`})
//     }
//     // product.thumbnails = []
//     // if(thumbnails){thumbnails.forEach(e=>product.thumbnails.push(`http://localhost:8080/img/${e.filename}`))}
//     await productManager.addProduct(product);
//     res.status(201).render("realTimeProducts", {products});
// })

// router.put('/:pid', uploader.array('thumbnail'), async (req, res)=>{
//     const prodId = req.params.pid;
//     let changes = req.body;
//     const filename = req.files.filename;
//     const productIndex = products.findIndex((prod)=>prod.id == prodId);
//     if (productIndex === -1){
//         return res.status(404).send({status:'Error', message: `No se han encontrado productos con el id:${prodId}`})
//     }

//     if(changes.id){
//         return res.status(400).send({status:'Error', message:'No se puede modificar el id del producto'})
//     }

//     if(filename) {
//         changes.thumbnail = `http://localhost:8080/img/${filename}`
//     }
//     const productChanged = await productManager.updateProduct(prodId, changes)
//     res.status(200).send({status:'OK', message:productChanged})
// })

// router.delete('/:pid', async(req,res)=>{
//     const prodId = req.params.pid;
//     const newProducts = await productManager.deleteProduct(prodId)
//     if (newProducts) {
//         res.status(200).send({status:'OK', message:newProducts})
//     }else{
//         res.status(404).send({status:'Error', message: `No se han encontrado productos con el id:${prodId}`})
//     }

// })

export default router