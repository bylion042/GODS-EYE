const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // <-- make sure this points to your user schema

// Admin page
router.get('/gods-eye', isAdmin, (req, res) => {
    res.render('gods_eye', { emailStatus: null });
});

// Handle form submission
router.post('/send-email', isAdmin, async (req, res) => {
    const { subject, message } = req.body;

    try {
        const users = await User.find({}, 'email name'); // <-- Added `name` field
        const emailList = users.map(user => user.email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send individually to inject user names
        for (let user of users) {
            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: user.email,
              subject,
              html: `
                <div style="background-color: #f4f6f9; color: #1f2125; padding: 25px; font-family: 'Arial', sans-serif; font-weight: bold; border-radius: 30px; max-width: 620px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                  <div style="text-align: center;">
                    <img src="https://i.postimg.cc/43ZsK0dj/logo.png" alt="Code Lab Logo" style="width: 90%; margin-bottom: 20px;" />
                  </div>
                  <h1 style="font-size: 30px; color: #696fdd; text-align: center;">📢QUICCK NOTICE📢</h1>
                  <p style="font-size: 20px; color: #333;">Hello <strong>${user.username || 'there'}</strong>,</p>
                  <p style="font-size: 20px; line-height: 1.8;">
                    ${message}
                  </p>
                  <hr style="border: 0; border-top: 1px solid #ffffff; margin: 24px 0;">
                  <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">
                    This is an automated message from <strong>Code Lab</strong>. Do not reply directly to this email.
                  </p>
                </div>
              `
            });
          }
          

        res.render('gods_eye', { emailStatus: 'Emails sent successfully!' });
    } catch (error) {
        console.error(error);
        res.render('gods_eye', { emailStatus: 'Error sending emails.' });
    }
});

module.exports = router;
