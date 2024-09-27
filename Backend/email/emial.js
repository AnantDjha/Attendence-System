const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail', // or use other email services like Outlook, Yahoo, etc.
    auth: {
      user: 'aayushjha0112@gmail.com',
      pass: 'wnxg clqz spmu geud',
    },
});

const sendMail = (email , subject , text)=>{
    const mailOptions = {
        from: 'aayushjha0112@gmail.com',
        to: email, // Recipient's email
        subject: subject, // Email subject
        text: text, // Email message
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           return false;
        } else {
            return true
        }
      });
}

module.exports = sendMail