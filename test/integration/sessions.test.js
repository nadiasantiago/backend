import chai from "chai";
import supertest from "supertest";
import config from "../../src/config/config.js";
import { sessionService } from "../../src/services/sessions.service.js";
import { cartService } from "../../src/services/carts.service.js";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integracion para modulo de sesiones", function () {

  this.timeout(10000)
  let cookie
  this.userEmail = ''
  this.userId = ''
  this.cartId = ''
  
  before(async function () {
    this.sessionService = sessionService
    this.cartService = cartService
  })

  // after(async function () {
  //   await this.sessionService.deleteUser(this.userId)
  //   await this.cartService.deleteAllFromCart(this.cartId)
  // })

  it('POST /api/sessions/register: Debe crear correctamente un usuario', async function(){
    const userMock = {
      first_name: 'Coder',
      last_name: 'House',
      email: 'prueba@coderhouse',
      age: 10,
      password: 'prueba123'
    }
    this.userEmail = userMock.email
    const {statusCode, ok, _body} = await requester.post('/api/sessions/register').send(userMock)
    expect(statusCode).to.be.ok.and.eq(201)
    expect(_body).to.have.property('message').eq('Usuario registrado')
    expect(ok).to.be.ok
  })

  it('POST /api/sessions/login: Debe loguear correctamente al usuario y devolver una cookie', async function () {
    
    const userMock = {
      email: this.userEmail,
      password: "prueba123",
    };

    const result = await requester.post("/api/sessions/login").send(userMock);
    const cookieResult = result.headers["set-cookie"][0];

    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };

    expect(cookie.name).to.be.ok.and.eql("jwtCookie");
    expect(cookie.value).to.be.ok;
  });

  // it('PUT /api/sessions/premium/:uid : Debe poder cambiar el rol user a premium', async function(){
  //   const adminUser = {
  //     email: config.adminEmail,
  //     password: config.adminPassword
  //   }
  //   const email = this.userEmail
  //   const user = await this.sessionService.getUser(this.userEmail)
  //   console.log(user)
    // this.userId = userId
    // this.cartId = cartId

    // const result = await requester.post('/api/sessions/login').send(adminUser)
    // const cookieResult = result.headers["set-cookie"][0];

    // cookie = {
    //   name: cookieResult.split("=")[0],
    //   value: cookieResult.split("=")[1],
    // };

    // const {statusCode, ok} = await requester
    //   .post(`/api/sessions/premium/${userId}`)
    //   .set('Cookie', [`${cookie.name} = ${cookie.value}`])

    // expect(statusCode).to.be.ok.and.eq(200)
    // expect(ok).to.be.ok

  // });
});
