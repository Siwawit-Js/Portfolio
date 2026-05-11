import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Download } from 'lucide-react';
import { getProfile } from '../../services/profile';
import type { Profile } from '../../types';

export function HeroSection() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const toUrl = (url: string) => /^https?:\/\//.test(url) ? url : `https://${url}`;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full py-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Left ── */}
          <div>
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-medium mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
              Hi everyone, I&apos;m{' '}
              <span className="text-white font-semibold">{profile?.name ?? 'Siwawit'}</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-5xl sm:text-6xl xl:text-[4.5rem] font-display font-bold tracking-tight leading-[1.05] text-white mb-6"
            >
              Front-end
              <br />
              Developer &
              <br />
              <span className="text-primary-400">UI Enthusiast.</span>
            </motion.h1>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-base sm:text-lg text-slate-400 max-w-md leading-relaxed mb-10"
            >
              {profile?.bio ?? 'Passionate developer crafting clean, accessible, and beautiful web experiences with modern technologies.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-brand"
              >
                Get In Touch
              </button>
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/15 text-slate-300 font-semibold text-sm hover:border-white/25 hover:text-white transition-all duration-200"
              >
                View Work
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              {profile?.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </a>
              )}
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs text-slate-600 font-medium tracking-widest uppercase mr-1">Find me on</span>
              {profile?.github && (
                <a href={toUrl(profile.github)} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/40 hover:bg-primary-500/10 transition-all duration-200">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile?.linkedin && (
                <a href={toUrl(profile.linkedin)} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/40 hover:bg-primary-500/10 transition-all duration-200">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.facebook && (
                <a href={toUrl(profile.facebook)} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/40 hover:bg-primary-500/10 transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
            </motion.div>
          </div>

          {/* ── Right: Photo + shapes ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Decorative blob — top right (green, like reference) */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-[2rem] rotate-12 animate-float"
              style={{ background: 'linear-gradient(135deg, #00cc82, #12e99c)', opacity: 0.85 }}
            />
            {/* Decorative blob — bottom left */}
            <div
              className="absolute -bottom-4 -left-8 w-16 h-16 rounded-2xl -rotate-6 animate-float-delayed"
              style={{ background: 'linear-gradient(135deg, #12e99c, #45f9b7)', opacity: 0.7 }}
            />
            {/* Small dot */}
            <div className="absolute top-1/3 -right-2 w-5 h-5 rounded-full bg-primary-400/60 blur-[2px]" />

            {/* Photo card */}
            <div className="relative w-72 h-[350px] xl:w-80 xl:h-[390px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary-500/15 via-transparent to-transparent pointer-events-none z-10" />

              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4"
                  style={{ background: 'linear-gradient(160deg, rgba(0,204,130,0.08) 0%, rgba(10,10,10,0.9) 60%)' }}>
                  <div className="w-24 h-24 rounded-full border border-primary-500/30 flex items-center justify-center"
                    style={{ background: 'rgba(0,204,130,0.12)' }}>
                    <span className="text-4xl font-display font-bold text-primary-400/80">
                      {profile?.name?.[0] ?? 'S'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{profile?.name}</p>
                </div>
              )}
            </div>

            {/* Stats pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-6 px-7 py-3.5 rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.75)] backdrop-blur-xl whitespace-nowrap"
            >
              {(profile?.stats ?? [
                { label: 'Projects', value: '10+' },
                { label: 'Years Exp', value: '2+' },
                { label: 'Clients', value: '5+' },
              ]).slice(0, 3).map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
