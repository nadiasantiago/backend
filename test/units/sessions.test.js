import mongoose from "mongoose";
import config from "../../src/config/config.js";
import chai from "chai";

import Users from "../../src/dao/dbManagers/SessionsManager.js";
const { dbUrlTest } = config;

const expect = chai.expect;

describe("set de pruebas usersDao", function () {
  this.timeout(10000);
  this.userId = "";

  before(function () {
    mongoose.connect(dbUrlTest);
    this.userDao = new Users();
  });

  after(function () {
    mongoose.connection.collections.users.drop();
  });
  it('el Dao debe agregar correctamente un usuario a la base de datos', async function(){
      const mockUser = {
          first_name: 'Coder',
          last_name: 'House',
          email:'coder@correo.com',
          password: '123'
      }
      const result = await this.userDao.register(mockUser);
      this.userId = result._id.toString()
      expect(result).to.have.property('_id')
  })
  it('el usuario obtenido debe tener un id valido', async function(){
    const result = await this.userDao.getUser({_id: this.userId})
    expect(result).to.have.property('email')
  })
  it('el usuario ha actualizado el rol con exito', async function(){
    const result = await this.userDao.changeRole({_id: this.userId},'premium')
    const user = await this.userDao.getUser({_id: this.userId})

    expect(user.rol).to.be.eq('premium')
    expect(result).to.have.property('modifiedCount').eq(1)
  })
});
