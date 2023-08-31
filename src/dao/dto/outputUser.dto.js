export default class outputUserDto {
  constructor(user) {
    this.name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.age = user.age;
    this.rol = user.rol;
    this.cart = user.cart;
    this.documents = user.documents;
    this.last_connection = user.last_connection;
  }
}
