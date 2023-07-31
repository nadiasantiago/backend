import chai from "chai";
import supertest from "supertest";
import config from "../../src/config/config.js";
import {productService} from '../../src/services/products.service.js'

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integracion para modulo de productos", function () {
  let cookie;
  this.prodId = ''
  this.productService = productService


  before(async function () {
    const adminUser = {
      email: config.adminEmail,
      password: config.adminPassword,
    };
    const result = await requester.post("/api/sessions/login").send(adminUser);
    const cookieResult = result.headers["set-cookie"][0];

    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
  });

  after(async function () {
    await this.productService.deleteProduct(this.prodId)
  })

  it('POST /api/products/ debe crear un nuevo producto', async function(){
    const productMock = {
      title: 'producto prueba',
      description: 'producto de prueba',
      code: 'prueba1',
      price: 50,
      stock: 50,
      category: 'comestible'
    }

    const {statusCode, ok, _body} = await requester
      .post('/api/products/')
      .set('Cookie', [`${cookie.name} = ${cookie.value}`])
      .send(productMock)
    this.prodId = _body.payload._id

    console.log(this.prodId)

    // expect(statusCode).to.be.ok.and.eq(201)
    // expect(_body.payload).to.have.property('_id')
    // expect(ok).to.be.ok
  })
});
