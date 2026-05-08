import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Sparkles } from 'lucide-react';
import { getProfile } from '../../services/profile';
import type { Profile } from '../../types';

export function HeroSection() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const roles = profile?.role?.split(',').map((r) => r.trim()) || [];
  const toUrl = (url: string) => /^https?:\/\//.test(url) ? url : `https://${url}`;
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    if (roles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Orbital rings (decorative) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5 opacity-60 hidden md:block" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 opacity-50 animate-spin-slow hidden md:block" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-nebula-500/10 opacity-50 hidden md:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-aurora-500/30 bg-aurora-500/10 text-aurora-400 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-aurora-500" />
          </span>
          Available for work — exploring the universe
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight mb-4"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="gradient-text-galaxy">{profile?.name}</span>
        </motion.h1>

        {/* Role with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-12 flex items-center justify-center mb-6"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-300">
            {roles[currentRole]}
            <span className="animate-pulse ml-0.5 text-nebula-400">|</span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {profile?.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 via-nebula-500 to-cosmos-500 text-white font-medium shadow-glow-nebula hover:shadow-glow-cosmos transition-all duration-500 hover:-translate-y-0.5 bg-[length:200%_100%] hover:bg-[position:100%_0]"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Explore My Work
            </span>
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-md text-slate-200 font-medium hover:bg-white/[0.08] hover:border-nebula-400/40 transition-all duration-300"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          {profile?.github && (
            <a href={toUrl(profile.github)} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-slate-400 hover:text-white hover:border-nebula-400/40 hover:bg-white/[0.06] transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
          )}
          {profile?.linkedin && (
            <a href={toUrl(profile.linkedin)} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-slate-400 hover:text-white hover:border-nebula-400/40 hover:bg-white/[0.06] transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {profile?.facebook && (
            <a href={toUrl(profile.facebook)} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-slate-400 hover:text-white hover:border-nebula-400/40 hover:bg-white/[0.06] transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-nebula-300 transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
