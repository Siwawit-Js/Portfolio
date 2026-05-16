import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { PROFILE } from '../data/profile';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!PROFILE.email) return;
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in every field.');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setErrorMsg('That email address looks invalid.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }));
        throw new Error(data.error || 'Failed to send message');
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const submitting = status === 'submitting';

  return (
    <section
      id="contact"
      className="relative px-6 pt-28 pb-20 md:px-12 md:pt-36 lg:px-20 z-10 overflow-hidden"
    >
      {/* Local glow underlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass text-[11px] font-mono uppercase tracking-[0.22em] text-primary"
        >
          05 / Contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tighter text-ink max-w-4xl"
        >
          Let's build something{' '}
          <span className="text-gradient">extraordinary</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-6 text-muted text-lg max-w-2xl"
        >
          Have a project, a role, or just want to say hi? Drop me a message below — I reply within 24 hours.
        </motion.p>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 card-neon rounded-3xl p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Your name"
              id="contact-name"
              value={name}
              onChange={setName}
              placeholder="Jane Doe"
              disabled={submitting}
              autoComplete="name"
            />
            <Field
              label="Email"
              id="contact-email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              disabled={submitting}
              autoComplete="email"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="contact-message"
              className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-2"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
              rows={6}
              placeholder="Tell me about the role, project, or idea…"
              className="w-full resize-y bg-surface/60 border border-rule rounded-2xl px-4 py-3 text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-primary/60 focus:bg-surface disabled:opacity-60"
            />
          </div>

          {/* Status row */}
          <AnimatePresence mode="wait">
            {status === 'error' && errorMsg && (
              <motion.div
                key="err"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-5 flex items-center gap-2 text-sm text-accent"
                role="alert"
              >
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </motion.div>
            )}
            {status === 'success' && (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-5 flex items-center gap-2 text-sm text-primary"
                role="status"
              >
                <CheckCircle2 size={14} />
                <span>Message sent — talk to you soon.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              // delivered via resend
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-background font-semibold text-sm hover:shadow-[0_0_28px_rgb(var(--primary)/0.55)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin-slow" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send message
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Secondary: email + socials */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {PROFILE.email && (
            <div className="card-neon rounded-2xl px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Or email directly
                </div>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-display font-semibold text-ink hover:text-primary transition-colors break-all"
                >
                  {PROFILE.email}
                </a>
              </div>
              <button
                onClick={handleCopy}
                aria-label="Copy email"
                className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-rule text-ink hover:border-primary hover:text-primary transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          )}

          {PROFILE.github && (
            <SocialCard
              href={PROFILE.github}
              label="GitHub"
              handle="@Siwawit-Js"
              Icon={FaGithub}
            />
          )}
          {PROFILE.linkedin && (
            <SocialCard
              href={PROFILE.linkedin}
              label="LinkedIn"
              handle="/in/siwawit"
              Icon={FaLinkedin}
            />
          )}
        </div>

        {/* Footer-bar style bottom */}
        <div className="mt-20 pt-6 border-t border-rule flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.18em] text-muted">
          <div>© {new Date().getFullYear()} — {PROFILE.name}</div>
          <div className="flex items-center gap-2">
            <span className="live-dot" />
            <span>Built with React · Tailwind · Framer Motion</span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className="w-full bg-surface/60 border border-rule rounded-2xl px-4 py-3 text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-primary/60 focus:bg-surface disabled:opacity-60"
      />
    </div>
  );
}

interface SocialCardProps {
  href: string;
  label: string;
  handle: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

function SocialCard({ href, label, handle, Icon }: SocialCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3 }}
      className="card-neon rounded-2xl px-6 py-5 flex items-center justify-between group"
    >
      <div className="flex items-center gap-4">
        <span className="grid place-items-center w-11 h-11 rounded-full bg-surface-2 text-ink group-hover:text-primary transition-colors">
          <Icon size={18} />
        </span>
        <div>
          <div className="font-display font-semibold text-ink">{label}</div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {handle}
          </div>
        </div>
      </div>
      <ArrowUpRight
        size={18}
        className="text-muted transition-all duration-300 group-hover:text-primary group-hover:rotate-45"
      />
    </motion.a>
  );
}
