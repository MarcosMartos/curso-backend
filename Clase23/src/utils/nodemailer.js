import nodemailer from "nodemailer";
import config from "../../config";

// Función para enviar un correo electrónico de verificación
const dispatchVerificationEmail = async (
  recipientEmail,
  userAlias,
  verificationToken
) => {
  // Creando un transportador de correo usando nodemailer
  let mailTransport = nodemailer.createTransport({
    service: "Gmail", // Servicio de correo
    port: 587, // Puerto para el servicio de correo
    auth: {
      user: config.EMAIL_USER, // Usuario del correo
      pass: config.EMAIL_PASSWORD, // Contraseña del correo
    },
  });

  // Detalles del correo electrónico
  const mailDetails = {
    from: '"cel" <support@cel.com>', // Remitente del correo
    to: `<${recipientEmail}>`, // Destinatario del correo
    subject: "Cel - Account Verification", // Asunto del correo
    text: "Please verify your GuitarWorld account", // Texto plano del correo
    // Contenido HTML del correo
    html: `
    <p>Dear ${userAlias}, thank you for joining Cel</p>
    <p>Your account is almost set up, just click on the link below to verify: </p>
    <a href="${config.WEB_APP_URL}/verify/${verificationToken}">Click to Verify</a>
    <p>If you didn't create this account, you can safely ignore this email.</p>
  `,
  };

  // Intentando enviar el correo
  try {
    const response = await mailTransport.sendMail(mailDetails);
    console.log(response); // Imprimiendo la respuesta del envío
  } catch (err) {
    return {
      msg: `There was an error while trying to send the verification email: ${err}`, // Mensaje de error en caso de fallo
    };
  }
};

// Exportando la función para ser utilizada en otros módulos
export { dispatchVerificationEmail };
