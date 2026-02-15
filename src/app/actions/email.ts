"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  // NOTE: You should add these to your .env.local file
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your business email
      pass: process.env.SMTP_PASS, // your app password or email password
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send it to yourself
      replyTo: email, // So you can reply directly to the user
      subject: `New Contact Submission: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'JetBrains Mono', monospace; padding: 30px; background-color: #030303; color: #ededed; border: 1px solid #39ff14; border-radius: 16px; max-width: 600px;">
          <h2 style="color: #39ff14; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">New Transmission Received</h2>
          <div style="margin-bottom: 15px;">
            <strong style="color: #39ff14;">SENDER:</strong> ${name}
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #39ff14;">DIRECT LINK:</strong> ${email}
          </div>
          <div style="margin-top: 30px; padding: 20px; background: rgba(57, 255, 20, 0.05); border-left: 4px solid #39ff14; font-size: 16px; line-height: 1.6;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="margin-top: 30px; font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1px;">
            SECURE CHANNEL GATEWAY // TYPEWARP INTEL
          </p>
        </div>
      `,
    });

    return { success: "Message sent successfully!" };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}
