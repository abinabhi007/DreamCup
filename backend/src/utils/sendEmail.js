const axios = require("axios");

const sendEmail = async (options) => {
  // We use our own Next.js frontend as an email relay to bypass Railway's SMTP block.
  // Make sure FRONTEND_URL is set to your actual Vercel domain in production, 
  // or http://localhost:3000 locally.
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  
  try {
    const response = await axios.post(`${frontendUrl}/api/send-email`, {
      email: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
      secret: process.env.RELAY_SECRET // Must match between backend and frontend
    });

    return response.data;
  } catch (error) {
    console.error("Error communicating with Vercel Relay:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to send email via Vercel Relay");
  }
};

module.exports = sendEmail;
