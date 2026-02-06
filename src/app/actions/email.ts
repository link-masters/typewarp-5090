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
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #dc2626;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #dc2626;">
            ${message}
          </div>
        </div>
      `,
    });

    return { success: "Message sent successfully!" };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}
