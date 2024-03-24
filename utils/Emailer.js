const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    return await resend.emails.send(options);
  } catch ({ error }) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
