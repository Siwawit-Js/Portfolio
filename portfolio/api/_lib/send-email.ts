const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export interface SendInput {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

export interface SendEnv {
  RESEND_API_KEY?: string;
  TO_EMAIL?: string;
  FROM_EMAIL?: string;
}

export interface SendResult {
  status: number;
  body: { success?: true; error?: string };
}

export async function sendContactEmail(
  input: SendInput,
  env: SendEnv,
): Promise<SendResult> {
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const message = typeof input.message === 'string' ? input.message.trim() : '';

  if (!name || !email || !message) {
    return { status: 400, body: { error: 'Missing required fields' } };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: 400, body: { error: 'Invalid email address' } };
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return { status: 400, body: { error: 'Field too long' } };
  }

  const { RESEND_API_KEY, TO_EMAIL } = env;
  const FROM_EMAIL = env.FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  if (!RESEND_API_KEY || !TO_EMAIL) {
    return { status: 500, body: { error: 'Server misconfigured' } };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `New message from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return { status: 502, body: { error: err || 'Email provider error' } };
  }
  return { status: 200, body: { success: true } };
}
