const { Resend } = require('resend');

const resend = new Resend({
  apiKey: process.env.RESSEND_API_KEY,
});
const sendEmail = async (options) => {
  try {
    await resend.emails.send(options);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
