import nodemailer from "nodemailer";
import { db } from "./db";

export async function getNotificationEmail(): Promise<string> {
  try {
    const settings = await db.adminSettings.findUnique({
      where: { id: "default" },
    });
    return settings?.notificationEmail || process.env.NOTIFICATION_EMAIL || "admin@devosphere.com";
  } catch (err) {
    console.error("Failed to fetch notification email from settings:", err);
    return process.env.NOTIFICATION_EMAIL || "admin@devosphere.com";
  }
}

export async function sendEmailNotification(subject: string, htmlContent: string) {
  const toEmail = await getNotificationEmail();

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("=========================================");
    console.log(`[EMAIL NOTIFICATION MOCK] To: ${toEmail}`);
    console.log(`Subject: ${subject}`);
    console.log("-----------------------------------------");
    // Strip HTML tags for cleaner console logging
    console.log(htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
    console.log("=========================================");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Devosphere Notifications" <${smtpUser}>`,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    });
    console.log(`[EMAIL SENT] Successfully sent notification to ${toEmail}`);
  } catch (err) {
    console.error("Failed to send email via SMTP:", err);
  }
}
