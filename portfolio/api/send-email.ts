import { sendContactEmail } from './_lib/send-email';

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
  end(): VercelResponse;
}

declare const process: { env: Record<string, string | undefined> };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await sendContactEmail((req.body ?? {}) as Record<string, unknown>, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TO_EMAIL: process.env.TO_EMAIL,
    FROM_EMAIL: process.env.FROM_EMAIL,
  });
  return res.status(result.status).json(result.body);
}
