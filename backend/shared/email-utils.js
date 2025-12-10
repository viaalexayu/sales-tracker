const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

async function sendEmail(to, subject, message) {
  if (!to) {
    console.error("Email address is missing!");
  } else if (!subject) {
    console.error("Subject is missing!");
  } else if (!message) {
    console.error("Message is missing!");
  } else {

    transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: to,
      subject: subject,
      text: "OTP Code is " + message.toString(),
    }, (err, info) => {
      if (err) console.error(err);
      else console.log("Successfully sent OTP to email!", info.response);
    });
  }
};

module.exports = sendEmail;
