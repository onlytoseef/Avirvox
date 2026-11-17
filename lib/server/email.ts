import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!process.env.SMTP_HOST) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || "587");
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
    });
  }

  return transporter;
}

const DEFAULT_FROM = '"Avirvox Labs" <coin@avirvox.io>';
const DEFAULT_CC = "avirvoxlabs@gmail.com";

export type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
  cc?: string;
};

/**
 * Sends a transactional email.
 * Purchase notifications use MAIL_CC (client/business copy).
 */
export async function sendMail(options: MailOptions): Promise<boolean> {
  const transport = getTransporter();

  if (!transport) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email] SMTP not configured; skipped "${options.subject}" to ${options.to}`);
    }
    return false;
  }

  await transport.sendMail({
    from: process.env.MAIL_FROM || DEFAULT_FROM,
    to: options.to,
    cc: options.cc ?? process.env.MAIL_CC ?? DEFAULT_CC,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  return true;
}

/**
 * Legacy email-verification link.
 * No CC: verification emails must go only to the account owner.
 */
export async function sendVerificationEmail(
  to: string,
  url: string,
): Promise<void> {
  const transport = getTransporter();

  if (!transport) {
    // Never log verification links in production.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email] SMTP not configured. Verification link for ${to}: ${url}`);
    }
    return;
  }

  await transport.sendMail({
    from: process.env.MAIL_FROM || DEFAULT_FROM,
    to,
    subject: "Verify your Avirvox Labs account",
    text: `Verify your email address by opening this link:\n\n${url}\n\nThis link expires in 24 hours.`,
    html: `<p>Verify your email address by opening the link below:</p><p><a href="${url}">${url}</a></p><p>This link expires in 24 hours.</p>`,
  });
}

/**
 * Sends the 6-digit signup verification code.
 * No CC copy is sent — the code goes only to the account owner.
 */
export async function sendSignupCodeEmail(
  to: string,
  code: string,
): Promise<void> {
  const transport = getTransporter();

  if (!transport) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email] SMTP not configured. Signup code for ${to}: ${code}`);
    }
    return;
  }

  const subject = "Your Avirvox Labs verification code";
  const text = `Your Avirvox Labs verification code is ${code}.\n\nIt expires in 10 minutes.\n\nIf you did not request this, you can ignore this email. Never share this code with anyone.`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f2eef7;font-family:Arial,Helvetica,sans-serif;color:#1c1424;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2eef7;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e6dced;">
            <tr>
              <td style="background:linear-gradient(120deg,#160a24 0%,#3a0f4a 55%,#6b1f7a 100%);padding:28px 32px;">
                <div style="font-size:20px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">Avirvox Labs</div>
                <div style="margin-top:6px;font-size:11px;color:#d9c9e6;text-transform:uppercase;letter-spacing:2px;">The Participation Layer</div>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 28px;">
                <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#1c1424;">Verify your email</h1>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4a3b52;">
                  Use the 6-digit code below to finish creating your Avirvox Labs purchaser account.
                </p>
                <div style="margin:0 0 10px;padding:20px;text-align:center;background:#f8f3fb;border:1px dashed #c99adf;border-radius:12px;">
                  <div style="font-size:38px;font-weight:bold;letter-spacing:10px;color:#8a1fb0;font-family:'Courier New',monospace;">${code}</div>
                </div>
                <p style="margin:0 0 22px;font-size:13px;color:#7a6a84;">This code expires in 10 minutes.</p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#4a3b52;">
                  If you did not request this email, you can safely ignore it.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#faf7fc;border-top:1px solid #eee4f2;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#8a7a94;">
                  For your security, never share this code with anyone. Avirvox Labs will never ask for your password or verification code.
                </p>
                <p style="margin:10px 0 0;font-size:12px;color:#8a7a94;">Avirvox Labs &middot; coin@avirvox.io</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  await transport.sendMail({
    from: process.env.MAIL_FROM || DEFAULT_FROM,
    to,
    subject,
    text,
    html,
  });
}
