import nodemailer from 'nodemailer'
import config from "../config/config.js";

const {
  nodemailerConfig: { SERVICE, PORT, USER, PASSWORD },
} = config;

class MailingService {
  constructor(){
    this.transport = nodemailer.createTransport({
      service:SERVICE,
      port:PORT,
      auth: {
        user:USER,
        pass:PASSWORD,
      },
    });
  }
  async sendEmail(token, user){
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
    })
  }
}

export const mailingService = new MailingService()