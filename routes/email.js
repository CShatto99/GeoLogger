require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message)
    return res.status(400).json({ msg: "Please enter both fields" });

  const htmlEmail = `
    <h2>Contact Details</h2>
    <h3>Email</h3>
    <p>${email}</p>
    <h3>Message</h3>
    <p>
      ${message}
    </p>
  `;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: email,
      to: process.env.USER_EMAIL,
      subject: `Message from ${email}`,
      text: message,
      html: htmlEmail,
    });

    // console.log('Message sent: %s', info.messageId)
    // console.log('Message URL %s', nodemailer.getTestMessageUrl(info))

    res.json({ msg: "Email sent" });
  } catch (err) {
    res.status(500).send("Error sending email");
  }
});
