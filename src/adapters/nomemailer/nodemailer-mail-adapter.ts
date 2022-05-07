import { MailAdapter, SendEmailData } from "../mail-adapter";
import nodemailer from "nodemailer";
export class NodemailerMailAdapter implements MailAdapter{

  async sendMail({ subject, body }: SendEmailData){

    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6fe847e7993956",
        pass: "d0e96d409402fd"
      }
    });

    transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Batata Doce <batata@doce.com>",
      subject,
      html: body
    });
  }
}

