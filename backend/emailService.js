const nodemailer = require('nodemailer');

// Configure the email transporter
// You can use Gmail, Outlook, or any SMTP service.
// For Gmail, you might need to use an "App Password".
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  family: 4, // Force IPv4 to avoid ENETUNREACH on IPv6
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Send an email notification
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} html - HTML body (optional)
 */
async function sendEmailNotification(to, subject, text, html) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`\x1b[33m[EMAIL SIMULATION] To: ${to}\x1b[0m`);
    console.log(`\x1b[33mSubject: ${subject}\x1b[0m`);
    console.log(`\x1b[33mBody: ${text}\x1b[0m`);
    console.log(`\x1b[31m(!) Setup EMAIL_USER and EMAIL_PASS in .env to send real emails.\x1b[0m\n`);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Academic Assistant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`[EMAIL] Success: "${subject}" sent to ${to} (${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

module.exports = { sendEmailNotification };
