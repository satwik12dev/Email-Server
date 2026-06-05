const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP Connected");

    // Mail to Admin
    const adminMailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "📩 New Portfolio Contact Message",
      html: `
        <h2>New Contact Query</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Auto Reply to User
    const userMailOptions = {
      from: `"Satwik Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your message",
      html: `
        <h2>Hello ${name} 👋</h2>
        <p>Thank you for contacting me.</p>
        <p>Your message has been received successfully.</p>
        <p>I will get back to you soon.</p>
        <br/>
        <p>Regards,</p>
        <strong>Satwik</strong>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("✅ Emails sent successfully");
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

module.exports = sendEmail;
