import mongoose from "mongoose";
import config from "../../src/config/config.js";
import chai from "chai";

import Products from "../../src/dao/dbManagers/ProductManager.js";
const { dbUrlTest } = config;

const expect = chai.expect;

describe("set de pruebas productDao", function () {
  this.timeout(10000);
  this.prodId = "";

  before(function () {
    mongoose.connect(dbUrlTest);
    this.productDao = new Products();
  });

  after(function () {
    mongoose.connection.collections.products.drop();
  });
  it("Crea un producto con exito", async function () {
    const productMock = {
      title: "producto de prueba",
      description: "este es un producto de prueba",
      code: "prueba123",
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
});
