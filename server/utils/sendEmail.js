const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use your SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"DxResumee" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
