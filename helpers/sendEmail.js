const sendgrid = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const mail = { ...data, from: 'bazna.yuliya@gmail.com' };
  await sendgrid.send(mail);
  return true;
};

module.exports = sendEmail;
