import fs from 'fs'

export default class CartManager {
    constructor (){
        this.path = './files/Cart.json'
    }

    getCarts = async () => {
        if(fs.existsSync(this.path)) {
            const carts= await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(carts);
            return result;
        }else{
            return [];
        }
    }

    getCartById = async (cartId) =>{
        const carts = await this.getCarts();
        const cartSearch = carts.find((cart)=>cart.id == cartId)
        if (cartSearch){
            return cartSearch;
        }else{
            console.error(`No se ha encontrado ningun carrito con el id: ${cartId}`)
        }
    }

    addCart = async ()=>{
        const carts = await this.getCarts();
        let cart = {}

        if(carts.length === 0){
            cart.id = 1;
        }else{
            cart.id = carts[carts.length -1].id +1
        }

        cart.products = [];
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return carts
    }

    addToCart = async (cartId, pId)=>{
        const cart = await this.getCartById(cartId);
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex((cart)=>cart.id == cartId)
        const productIndex = cart.products.findIndex((prod)=>prod.id == pId);
        if(productIndex == -1){
            let product = {
                id:pId,
                quantity: 1
            }
            carts[cartIndex].products.push(product);
            
        }else{
            carts[cartIndex].products[productIndex].quantity ++
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return carts;
    }
}