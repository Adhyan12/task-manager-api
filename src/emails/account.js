const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_KEY;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: "adhyangupta1999@gmail.com",
      from: "adhyangupta1999@gmail.com",
      subject: "this is my first creation",
      text: "Test subject",
    })
    .then(() => {
      console.log("email sent");
    })
    .catch((e) => {
      console.log(e);
    });
};
