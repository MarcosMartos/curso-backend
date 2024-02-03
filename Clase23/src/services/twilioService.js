import twilio from "twilio";
import config from "../config";

const client = new twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, body) => {
  try {
    await client.messages.create({
      to: to,
      from: config.TWILIO_PHONE_NUMBER,
      body: body,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export { sendSMS };
