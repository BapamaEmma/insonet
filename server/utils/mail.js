import nodemailer from "nodemailer";
import {
  CONTACT_NOTIFY_EMAIL,
  SMTP_FROM,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from "../config.js";

function isSmtpConfigured() {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmail({ submission, notifyEmail }) {
  const fullName = `${submission.firstName} ${submission.lastName}`.trim();
  const subject = `New contact message from ${fullName}`;

  const text = [
    "You have a new message from the INSONET website contact form.",
    "",
    `Name: ${fullName}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "Not provided"}`,
    `Submitted: ${new Date(submission.createdAt).toLocaleString()}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New contact form message</h2>
      <p style="margin: 0 0 20px;">A client submitted the contact form on the INSONET website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tr><td style="padding: 8px 0; font-weight: 600;">Name</td><td style="padding: 8px 0;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td style="padding: 8px 0;">${escapeHtml(submission.phone || "Not provided")}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Submitted</td><td style="padding: 8px 0;">${escapeHtml(new Date(submission.createdAt).toLocaleString())}</td></tr>
      </table>
      <h3 style="margin: 24px 0 8px;">Message</h3>
      <p style="margin: 0; white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 8px;">${escapeHtml(submission.message)}</p>
    </div>
  `;

  return {
    from: SMTP_FROM,
    to: notifyEmail,
    replyTo: submission.email,
    subject,
    text,
    html,
  };
}

let transporter;

function getTransporter() {
  if (!isSmtpConfigured()) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  return transporter;
}

export function isContactEmailConfigured() {
  return isSmtpConfigured();
}

export async function sendContactNotification({ submission, notifyEmail }) {
  const recipient = notifyEmail || CONTACT_NOTIFY_EMAIL;
  const mail = buildContactEmail({ submission, notifyEmail: recipient });

  if (!isSmtpConfigured()) {
    console.warn("[contact] SMTP not configured — set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env");
    return { sent: false, reason: "smtp_not_configured" };
  }

  const transport = getTransporter();
  await transport.sendMail({
    from: mail.from,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });

  return { sent: true };
}
