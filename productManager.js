class ProductManager {
    constructor(){
        this.products = [];
    }

    getProducts = () => {
        console.log(this.products);
        return;
    }

    getProductById = (prodId) =>{
        const productId = this.products.findIndex((prod)=>prod.id === prodId);
        if (productId === -1){
            console.error(`No se ha encontrado ningun producto con el id: ${prodId}`)
        }else{
            const productSearch = this.products.find((prod)=>prod.id == prodId)
            console.log(productSearch)
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) =>{
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.products.length + 1
        }

        const productCode = this.products.findIndex((prod)=>prod.code === code);

        if(productCode !== -1){
            console.log(`Ya existe un producto con el code: ${code}`);
            return;
        }
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error('Todos los campos son obligatorios');
            return;
        }
        
        this.products.push(product);
    }

}

const productManager = new ProductManager()
productManager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);
productManager.getProductById(1);
