import nodemailer from "nodemailer";
import config from "../config/config.js";

const {
  nodemailerConfig: { SERVICE, PORT, USER, PASSWORD },
} = config;

class MailingService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: SERVICE,
      port: PORT,
      auth: {
        user: USER,
        pass: PASSWORD,
      },
    });
  }
  async emailToRestorePassword(token, user) {
    await this.transport.sendMail({
      from: `Equipo Ecommerce ${USER}`,
      to: user.email,
      subject: "Restablecer Contraseña",
      html: `
      <div>
        <h1>Hola ${user.name}!</h1>
        <p>Hemos recibido una solicitud para restablecer su contraseña. Haz click en el siguiente link: </p>
        <a href="http://localhost:8080/resetPassword?token=${token}"> Restablecer Contraseña</a>
        <br>
        <p>Saludos</p>
      </div>
      `,
    });
  }
  async ticketEmail(ticket) {
    await this.transport.sendMail({
      from: `Equipo Ecommerce ${USER}`,
      to: ticket.purchaser,
      subject: "Pedido confirmado",
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Pedido confirmado</h1>
          <p>¡Gracias por tu compra! Aquí tienes los detalles de tu pedido:</p>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${ticket.products.map(
                (product) => `
                <tr>
                  <td>${product.title}</td>
                  <td>${product.quantity}</td>
                  <td>$${product.subtotal}</td>
                </tr>
              `
              )}
            </tbody>
          </table>
          
          <p>Total a pagar: $${ticket.amount}</p>
          
          <p>¡Gracias por tu compra!</p>
        </body>
      </html>`,
    });
  }
  async userDeleted(user) {
    await this.transport.sendMail({
      from: `Equipo Ecommerce ${USER}`,
      to: user.email,
      subject: "Usuario eliminado",
      html: `
        <div>
          <h1>Ecommerce</h1>
          <p>El usuario ha sido eliminado por inactividad</p>
        </div>`,
    });
  }
}

export const mailingService = new MailingService();
