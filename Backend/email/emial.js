
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aayushjha0112@gmail.com",
    pass: 'ktfn tohw kaxu hyds', // Use the generated App Password
  },
});

const sendMail = (email, subject, text) => {
  const mailOptions = {
    from: "aayushjha0112@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return false;
    } else {
      console.log("Email sent:", info.response);
      return true;
    }
  });
};

module.exports = sendMail;
