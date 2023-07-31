export default class InputUserDto {
  constructor(user) {
    this.name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.password = user.password;
    this.age = user.age;
    this.rol = user.rol;
    this.cart = user.cart;
  }
}
