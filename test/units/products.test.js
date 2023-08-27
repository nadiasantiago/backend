import mongoose from "mongoose";
import config from "../../src/config/config.js";
import chai from "chai";

import { productMongo } from "../../src/dao/mongo/product.mongo.js";
const { dbUrlTest } = config;

const expect = chai.expect;

describe("set de pruebas productDao", function () {
  this.timeout(10000);
  this.prodId = "";

  before(function () {
    mongoose.connect(dbUrlTest);
    this.productDao = productMongo;
  });

  it("Crea un producto con exito", async function () {

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

    const result = await this.productDao.create(productMock);
    this.prodId = result._id.toString();
    expect(result).to.have.property("_id");
  });

  it('Al obtener los productos me retorna un array', async function(){
    const {docs} = await this.productDao.getProducts()
    expect(docs).to.be.a('array')
  })
  it('se actualiza el producto con exito', async function(){
    const result = await this.productDao.update({_id: this.prodId},{price: 10})
    const product = await this.productDao.getProductById(this.prodId)

    expect(product.price).to.be.eq(10)
    expect(result).to.have.property('modifiedCount').eq(1)
  })

});
