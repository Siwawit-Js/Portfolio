import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { sendContactEmail } from './api/_lib/send-email';

function devApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'dev-api-send-email',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        let body: unknown = {};
        try {
          body = JSON.parse(Buffer.concat(chunks).toString('utf-8') || '{}');
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
          return;
        }

        const result = await sendContactEmail(body as Record<string, unknown>, {
          RESEND_API_KEY: env.RESEND_API_KEY,
          TO_EMAIL: env.TO_EMAIL,
          FROM_EMAIL: env.FROM_EMAIL,
        });
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result.body));
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), devApiPlugin(env)],
    server: { port: 5173 },
  };
});
