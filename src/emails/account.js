const sgMail = require("@sendgrid/mail");
const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name)=>{

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
  
}

