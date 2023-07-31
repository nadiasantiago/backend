import chai from "chai";
import supertest from "supertest";
import config from "../../src/config/config.js";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integracion para modulo de carrito", function () {
  let cookieAdmin;
  let cookiePremium;

  this.prodId = "";
  this.cartId = "";

  before(async function () {
    this.prodId = "643c4347baf02214a41e8c78";

    //login Admin
    const adminUser = {
      email: config.adminEmail,
      password: config.adminPassword,
    };
    const result = await requester.post("/api/sessions/login").send(adminUser);
    const cookieResult = result.headers["set-cookie"][0];

    cookieAdmin = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };

    //login Premium User

    const premiumUser = {
      email: 'nadusantiago@gmail.com',
      password: '123'
    }

    const resultPremium = await requester.post("/api/sessions/login").send(premiumUser);
    const cookieResultPremium = resultPremium.headers["set-cookie"][0];

    cookiePremium = {
      name: cookieResultPremium.split("=")[0],
      value: cookieResultPremium.split("=")[1],
    };
  });
  it('POST /api/carts: Debe poder crear un carrito vacio', async function(){
    const {statusCode, ok, _body} = await requester.post('/api/carts')

    this.cartId = _body.payload._id.toString()
    expect(statusCode).to.be.ok.and.eq(201)
    expect(_body.payload).to.have.property('_id')
    expect(ok).to.be.ok

  })

  it('GET /api/carts/:cid : Debe traer el carrito con el ID indicado', async function (){
    const {statusCode, ok, _body} = await requester.get(`/api/carts/${this.cartId}`)
    expect(statusCode).to.be.ok.and.eq(200)
    expect(_body.payload._id).to.be.eq(this.cartId)
    expect(ok).to.be.ok
  })

  it('POST /api/carts/:cid/products/:pid : Debe agregar un producto al carrito indicado', async function(){
    const {statusCode, ok, _body} = await requester
    .post(`/api/carts/${this.cartId}/products/${this.prodId}`)
    .set('Cookie', [`${cookiePremium.name} = ${cookiePremium.value}`])

    expect(statusCode).to.be.ok.and.eq(201)
    expect(_body.payload.modifiedCount).to.be.eq(1)
    expect(ok).to.be.ok
  })

  it('DELETE /api/carts/:cid : debe eliminar el carrito', async function(){
    const {statusCode, ok, _body} = await requester.delete(`/api/carts/${this.cartId}`)
    expect(statusCode).to.be.ok.and.eq(201)
    expect(_body.payload.modifiedCount).to.be.eq(1)
    expect(ok).to.be.ok
  })
});
