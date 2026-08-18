import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || SMTP_USER;

function getTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function POST(request) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return Response.json({ error: "Email is not configured on the server." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, type, message } = body || {};
  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const transporter = getTransporter();

  try {
    // Notification to Nazhir
    await transporter.sendMail({
      from: `"Still By Nazhir Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New inquiry: ${type || "General"} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Shoot type: ${type || "Not specified"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    // Auto-reply to the person who submitted the form
    await transporter.sendMail({
      from: `"Nazhir Jackson — Still By Nazhir" <${SMTP_USER}>`,
      to: email,
      subject: "Got your message — Still By Nazhir",
      text: `Hi ${name},\n\nThanks for reaching out to Still By Nazhir! I've received your message and will be in touch within a few hours.\n\n— Nazhir\nstillbynazhir.com`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return Response.json({ error: "Failed to send message." }, { status: 502 });
  }
}
