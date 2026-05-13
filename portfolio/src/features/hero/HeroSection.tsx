import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { useProfile } from '../../hooks/useProfile';
import { toUrl } from '../../utils/helpers';

function useTypingRole(roles: string[]) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, roles]);

  return displayed;
}

export function HeroSection() {
  const profile = useProfile();
  const roles = profile?.role
    ? profile.role.split(',').map((r) => r.trim())
    : ['Full Stack Developer'];
  const typedRole = useTypingRole(roles);

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
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-none border-2 border-slate-900 bg-white text-slate-900 text-sm font-bold mb-8 relative"
            >
              <div className="absolute -inset-1 border-2 border-primary-500 pointer-events-none -z-10 translate-x-1 translate-y-1" />
              Hi everyone, I'm{' '}
              <span>{profile?.name ?? ''}</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-5xl sm:text-6xl xl:text-[4.5rem] font-display font-bold tracking-tight leading-[1.05] text-slate-900 mb-6"
            >
              {typedRole}
              <span className="animate-pulse text-primary-500">|</span>
            </motion.h1>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-base sm:text-lg text-slate-600 max-w-md leading-relaxed mb-10 font-medium"
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
                className="inline-flex items-center gap-2 px-7 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-200"
              >
                Get In Touch
                <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
              {profile?.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 text-slate-900 font-bold text-sm hover:text-primary-500 transition-colors"
                >
                  Download CV
                  <Download className="w-4 h-4" />
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
              <span className="text-xs text-slate-900 font-bold tracking-widest uppercase mr-3">Find me on:</span>
              {profile?.github && (
                <a href={toUrl(profile.github)} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-white hover:border-slate-900 hover:bg-slate-900 transition-all duration-200">
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
              {profile?.linkedin && (
                <a href={toUrl(profile.linkedin)} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-all duration-200 shadow-sm">
                  <FaLinkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.facebook && (
                <a href={toUrl(profile.facebook)} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-white hover:border-slate-900 hover:bg-slate-900 transition-all duration-200">
                  <FaFacebook className="w-4 h-4" />
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
            {/* Decorative shape — bottom right (large green blob) */}
            <div
              className="absolute -bottom-10 -right-20 w-[450px] h-[150px] bg-primary-500 rounded-full rotate-[-20deg]"
            />
            {/* Scribble top left */}
            <svg className="absolute top-10 -left-10 w-20 h-10 text-slate-900" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 38C20 10 30 5 45 20C60 35 70 5 98 2" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Photo card */}
            <div className="relative w-80 h-[400px] xl:w-[380px] xl:h-[480px] bg-slate-100 z-10 border-[6px] border-slate-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">

              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-100">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-900 flex items-center justify-center bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <span className="text-4xl font-display font-bold text-slate-900">
                      {profile?.name?.[0] ?? 'D'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{profile?.name ?? 'David'}</p>
                </div>
              )}
            </div>

            {/* Stats pill - removed for cleaner look, or adapt if necessary */}
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
          <span className="text-xs font-bold tracking-widest uppercase">Explore more about me</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
