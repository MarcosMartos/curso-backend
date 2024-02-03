import sgMail from "@sendgrid/mail";
import config from "../../config.js";

// Función para enviar un correo electrónico de verificación
const dispatchVerificationEmail = async (
  recipientEmail,
  userAlias,
  verificationToken
) => {
  // Configurando la API key de SendGrid
  sgMail.setApiKey(config.SENDGRID_API_KEY);

  // Detalles del correo electrónico
  const emailDetails = {
    from: config.SENDGRID_USER, // Remitente del correo
    to: `<${recipientEmail}>`, // Destinatario del correo
    subject: "Cel - Account Verification", // Asunto del correo
    text: "Verify your Cel account", // Texto plano del correo
    // Contenido HTML del correo
    html: `
        <p>Dear ${userAlias}, thank you for registering at Cel.</p>
        <p>Your account is almost set up, just click the link below to verify: </p>
        <a href="${config.FRONTEND_URL}/verify/${verificationToken}">Verify Now</a>
        <p>If you didn't create this account, please disregard this email.</p>
      `,
  };

  // Intentando enviar el correo
  try {
    await sgMail.send(emailDetails);
    console.log("Verification email dispatched."); // Mensaje de éxito
  } catch (err) {
    return {
      message: `Error sending verification email: ${err}`, // Mensaje de error general
    };
  }
};

// Exportando la función para ser utilizada en otros módulos
export { dispatchVerificationEmail };
