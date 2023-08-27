import mongoose from "mongoose";
import config from "../../src/config/config.js";
import chai from "chai";

import { cartMongo } from "../../src/dao/mongo/cart.mongo.js";
import { productMongo } from "../../src/dao/mongo/product.mongo.js";
const { dbUrlTest } = config;

const expect = chai.expect;

describe("set de pruebas cartDao", function () {
  this.timeout(10000);
  this.cartDao = null;
  this.productDao = null;
  this.cartId = "";
  this.prodId  = '';

  before(async function () {
    await mongoose.connect(dbUrlTest);
    this.cartDao = cartMongo;
    this.productDao = productMongo;
  });

  after(function () {
    mongoose.connection.collections.carts.drop();
    mongoose.connection.collections.products.drop();
  });

  it('Crea un carrito con exito con ID', async function(){
    const result = await this.cartDao.addCart()
    this.cartId = result._id.toString()

    expect(result).to.have.property('_id')
  });

  it('Agrega un producto al carrito con exito', async function(){
    const generarCodigoAleatorio = (longitud) => {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let codigo = '';
      for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
      }
      return codigo;
    }

    const productMock = {
      title: "producto de prueba",
      description: "este es un producto de prueba",
      code: generarCodigoAleatorio(8),
      price: 50,
      stock: 10,
      category: "comestibles",
    };

    const {_id: prodId} = await this.productDao.create(productMock);
    this.prodId = prodId

    const result = await this.cartDao.addToCart(this.cartId, this.prodId)
    const cart = await this.cartDao.getCartById(this.cartId)

    expect(result).to.have.property('modifiedCount').eq(1)
    expect(cart.products[0]).to.have.property('pid')
    expect(cart.products[0].pid._id).to.deep.eq(prodId)

  })

  it('Se vacia el carrito con exito', async function(){
    const result = await this.cartDao.deleteAllFromCart(this.cartId)
    const cart = await this.cartDao.getCartById(this.cartId)    
    expect(result).to.have.property('modifiedCount').eq(1)
    expect(cart.products).to.have.lengthOf(0)
  })
});
