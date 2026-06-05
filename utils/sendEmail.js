const axios = require("axios");

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);
const sendEmail = async ({ name, email, message }) => {
  try {
    // Validation
    if (!name || !email || !message) {
      throw new Error("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    };

    // Email to Admin
    const adminEmail = {
      sender: {
        name: "Portfolio Contact",
        email: process.env.SENDER_EMAIL,
      },
      to: [
        {
          email: process.env.ADMIN_EMAIL,
          name: "Satwik",
        },
      ],
      replyTo: {
        email: email,
        name: name,
      },
      subject: "📩 New Portfolio Contact Message",
      htmlContent: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div style="
            padding: 10px;
            background: #f4f4f4;
            border-left: 4px solid #007bff;
          ">
            ${message}
          </div>

          <br>

          <small>
            Submitted on ${new Date().toLocaleString()}
          </small>
        </div>
      `,
    };

    // Auto Reply Email
    const userEmail = {
      sender: {
        name: "Satwik Portfolio",
        email: process.env.SENDER_EMAIL,
      },
      to: [
        {
          email: email,
          name: name,
        },
      ],
      subject: "✅ We Received Your Message",
      htmlContent: `
        <div style="
          max-width: 600px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
        ">
          <h2>Hi ${name} 👋</h2>

          <p>
            Thank you for contacting me through my portfolio.
          </p>

          <p>
            Your message has been received successfully.
          </p>

          <p>
            I will review your query and get back to you shortly.
          </p>

          <br>

          <p>
            Best Regards,<br>
            <strong>Satwik Saxena</strong>
          </p>

          <hr>

          <p style="font-size:12px;color:#666;">
            This is an automated email. Please do not reply.
          </p>
        </div>
      `,
    };

    // Send Admin Email
    const adminResponse = await axios.post(
      BREVO_API_URL,
      adminEmail,
      { headers }
    );

    console.log("✅ Admin Email Sent:", adminResponse.data);

    // Send User Email
    const userResponse = await axios.post(
      BREVO_API_URL,
      userEmail,
      { headers }
    );

    console.log("✅ User Email Sent:", userResponse.data);

    return {
      success: true,
      admin: adminResponse.data,
      user: userResponse.data,
    };

  } catch (error) {
    console.error(
      "❌ Brevo Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Failed to send email"
    );
  }
};

module.exports = sendEmail;