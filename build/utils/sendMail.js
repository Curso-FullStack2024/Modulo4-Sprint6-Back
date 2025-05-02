import nodemailer from 'nodemailer';
import mailRegisterContent from './mailRegisterContent.js';
import mailResetPasswordContent from './mailResetPasswordContent.js';


const sendEmail = async (options) => {
  const {email, link, subject, message, type}= options
  let html='';
  
  switch (type) {
    case 'verify':
      html=mailRegisterContent(email, link )
      break;
    case 'reset':
       html=mailResetPasswordContent(email, link )
      break;
    default:
      throw new Error('Tipo de correo no soportado');
  }
  
  // Crear un transporter (puedes usar servicios como SendGrid, Mailgun, etc.)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Definir opciones del email
  const mailOptions = {
    from: `Nexflit <nextfliks.site@gmail.com>`,
    to: email,
    subject: subject,
    text: message,
    html:html
  };

  // Enviar el email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;