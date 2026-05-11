import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, Satellite, Loader2 } from 'lucide-react';
import { getProfile } from '../../services/profile';
import type { Profile } from '../../types';

export function ContactSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const toUrl = (url: string) => url.startsWith('http') ? url : `https://${url}`;

  const contactLinks = [
    { icon: Mail, label: 'Email', value: profile?.email ?? undefined, href: profile?.email ? `mailto:${profile.email}` : undefined },
    { icon: Github, label: 'GitHub', value: 'GitHub Profile', href: profile?.github ? toUrl(profile.github) : undefined },
    { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn Profile', href: profile?.linkedin ? toUrl(profile.linkedin) : undefined },
  ].filter((l) => l.value);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Failed to send message');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-3 flex items-center gap-2">
            <Satellite className="w-3.5 h-3.5" />
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Let&apos;s work together
          </h2>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 via-nebula-500/30 to-cosmos-500/30 rounded-3xl blur-2xl opacity-50" />

          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12">
            <div className="grid sm:grid-cols-2 gap-10">
              {/* Left - Social links */}
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <Send className="w-5 h-5 text-nebula-300" />
                  Reach out
                </h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Send a signal across the cosmos — I&apos;ll respond from my home planet.
                </p>

                <div className="space-y-3">
                  {contactLinks.map((link, i) => {
                    const inner = (
                      <>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-nebula-500/20 border border-white/10 flex items-center justify-center group-hover:from-primary-500/30 group-hover:to-nebula-500/30 transition-colors">
                          <link.icon className="w-5 h-5 text-nebula-300" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">{link.label}</div>
                          <div className="text-sm font-medium text-white">{link.value}</div>
                        </div>
                      </>
                    );
                    const className = "flex items-center gap-4 p-3 rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 group" + (link.href ? " hover:border-nebula-400/40 hover:bg-white/[0.06] cursor-pointer" : " cursor-default");
                    return link.href ? (
                      <motion.a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }} className={className}>
                        {inner}
                      </motion.a>
                    ) : (
                      <motion.div key={link.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }} className={className}>
                        {inner}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right - Contact form */}
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-6">Send a Message</h3>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
                    <CheckCircle className="w-12 h-12 text-aurora-400" />
                    <p className="font-semibold text-white">Message launched!</p>
                    <p className="text-sm text-slate-400">I&apos;ll get back to you soon.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-sm text-nebula-300 hover:underline"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-slate-500 focus:outline-none focus:border-nebula-400/60 focus:ring-2 focus:ring-nebula-400/20 transition-all text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-slate-500 focus:outline-none focus:border-nebula-400/60 focus:ring-2 focus:ring-nebula-400/20 transition-all text-sm"
                    />
                    <textarea
                      placeholder="Your message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-slate-500 focus:outline-none focus:border-nebula-400/60 focus:ring-2 focus:ring-nebula-400/20 transition-all text-sm resize-none"
                    />

                    {status === 'error' && (
                      <p className="text-sm text-red-400">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 via-nebula-500 to-cosmos-500 text-white font-medium text-sm hover:shadow-glow-nebula transition-all duration-300 shadow-lg bg-[length:200%_100%] hover:bg-[position:100%_0] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
