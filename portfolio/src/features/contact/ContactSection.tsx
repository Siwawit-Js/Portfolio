import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getProfile } from '../../services/profile';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { Profile } from '../../types';

export function ContactSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const toUrl = (url: string) => url.startsWith('http') ? url : `https://${url}`;

  const contactLinks = [
    { icon: Mail, label: 'Email', value: profile?.email ?? undefined, href: undefined },
    { icon: Github, label: 'GitHub', value: 'GitHub Profile', href: profile?.github ? toUrl(profile.github) : undefined },
    { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn Profile', href: profile?.linkedin ? toUrl(profile.linkedin) : undefined },
  ].filter((l) => l.value);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!isSupabaseConfigured) {
      setStatus('error');
      setErrorMsg('Contact form is not configured yet.');
      return;
    }

    const { error } = await supabase.functions.invoke('send-email', {
      body: form,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again.');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
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
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary-500 tracking-wider uppercase mb-3">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Let's Work{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">Together</span>
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
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 via-accent-400/20 to-primary-500/20 rounded-3xl blur-xl opacity-40" />

          <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur-xl p-8 sm:p-12">
            <div className="grid sm:grid-cols-2 gap-10">
              {/* Left - Social links */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary-500" />
                  Reach out
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Feel free to reach out through any of my social links or send me a message directly.
                </p>



                <div className="space-y-3">
                  {contactLinks.map((link, i) => {
                    const inner = (
                      <>
                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                          <link.icon className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{link.label}</div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">{link.value}</div>
                        </div>
                      </>
                    );
                    const className = "flex items-center gap-4 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 transition-all duration-300 group" + (link.href ? " hover:border-primary-500/30 hover:bg-primary-500/5 cursor-pointer" : " cursor-default");
                    return link.href ? (
                      <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }} className={className}>
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
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                    <p className="font-semibold text-slate-900 dark:text-white">Message sent!</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">I'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-sm text-primary-500 hover:underline"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-primary-500/25"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
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
