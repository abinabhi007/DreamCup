import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, subject, text, html, secret } = req.body;

  // Protect this route from abuse so only your backend can call it
  // This ensures random bots can't hit your Vercel endpoint and use your Gmail to send spam
  if (secret !== process.env.RELAY_SECRET) {
    return res.status(401).json({ message: 'Unauthorized relay request' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"DreamCup Fantasy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully via Vercel', infoId: info.messageId });
  } catch (error) {
    console.error("Vercel Relay SMTP Error:", error);
    return res.status(500).json({ success: false, message: "Error sending email from Vercel", error: error.message });
  }
}
