const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  // Using Resend's testing domain by default. 
  // Once you verify a domain in Resend, you can change this to something like 'noreply@yourdomain.com'
  const { data, error } = await resend.emails.send({
    from: "DreamCup Fantasy <onboarding@resend.dev>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });

  if (error) {
    console.error("Resend API Error:", error);
    throw new Error(error.message);
  }

  return data;
};

module.exports = sendEmail;
