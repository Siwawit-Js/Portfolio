import { motion } from 'framer-motion';
import { User, Star } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { HOBBIES } from '../../data/hobbies';

export function AboutSection() {
  const profile = useProfile();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-3 flex items-center gap-2">
            <Star className="w-3.5 h-3.5" />
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            A bit about myself
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center lg:justify-start"
          >
            {/* Decorative shape — bottom right (large green blob) */}
            <div className="absolute -bottom-10 -right-10 w-[450px] h-[150px] bg-primary-500 rounded-full rotate-[-20deg] hidden lg:block" />

            {/* Scribble top left */}
            <svg className="absolute top-6 -left-6 w-20 h-10 text-slate-900 hidden lg:block" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 38C20 10 30 5 45 20C60 35 70 5 98 2" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Photo card */}
            <div className="relative w-80 h-[400px] xl:w-[380px] xl:h-[480px] bg-slate-100 z-10 border-[6px] border-slate-900 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] animate-float">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover object-center" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <User className="w-32 h-32 text-slate-300" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {profile?.about?.split('\n').filter(Boolean).map((paragraph, i) => (
                <p key={i} className="text-base sm:text-lg">{paragraph}</p>
              ))}
            </div>

            {/* Hobbies grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {HOBBIES.map((hobby, i) => (
                <motion.div
                  key={hobby.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <hobby.icon className="w-5 h-5 text-slate-700 mx-auto mb-2" />
                  <div className="text-xs text-slate-900 font-bold">{hobby.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{hobby.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
