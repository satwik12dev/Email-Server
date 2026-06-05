const nodemailer = require("nodemailer");
const sendEmail = async ({ name, email, message }) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminMailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,      
    replyTo: email,                  
    subject: "📩 New Portfolio Contact Message",
    html: `
      <div style="font-family:Arial;">
        <h2>New Contact Query</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <small>Received on ${new Date().toLocaleString()}</small>
      </div>
    `,
  };

const userMailOptions = {
    from: `"Satwik | Portfolio" <${process.env.EMAIL_USER}>`,
    to: email,                  
    subject: "✅ We received your message",
    html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;
                  background:#f9f9f9;padding:20px;border-radius:8px;">
        
        <h2 style="color:#333;">Hi ${name}, 👋</h2>

        <p>
          Thank you for reaching out!  
          We have successfully received your message.
        </p>

        <p>
          📌 I will 
          review your query and get back to you shortly.
        </p>

        <p style="margin-top:20px;">
          Best regards,<br />
          <strong>Satwik</strong><br />
          Portfolio Team
        </p>

        <hr style="margin:20px 0;" />

        <p style="font-size:12px;color:#888;">
          This is an automated response. Please do not reply to this email.
        </p>
      </div>
    `,
  };
  // Send both emails
  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(userMailOptions);
};

module.exports = sendEmail;