import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Tv2, Music2, Gamepad2, Coffee } from 'lucide-react';
import { getProfile } from '../../services/profile';
import type { Profile } from '../../types';

export function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const hobbies = [
    { icon: Tv2, label: 'ดูหนัง', value: 'Movies' },
    { icon: Music2, label: 'ฟังเพลง', value: 'Music' },
    { icon: Gamepad2, label: 'เล่นเกม', value: 'Gaming' },
    { icon: Coffee, label: 'กินชา', value: 'Tea' },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary-500 tracking-wider uppercase mb-3">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Crafting Digital{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">Experiences</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto lg:mx-0">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500 rounded-2xl blur opacity-30 animate-gradient bg-300%" />
              <div className="relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-accent-400/20">
                    <User className="w-32 h-32 text-primary-500/40" />
                  </div>
                )}
              </div>
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-2xl border border-primary-500/20 backdrop-blur-md -z-10 hidden lg:block" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-400/10 rounded-2xl border border-accent-400/20 backdrop-blur-md -z-10 hidden lg:block" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              {profile?.about?.split('\n').filter(Boolean).map((paragraph, i) => (
                <p key={i} className="text-base sm:text-lg">{paragraph}</p>
              ))}
            </div>

            {/* Hobbies grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {hobbies.map((hobby, i) => (
                <motion.div
                  key={hobby.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                >
                  <hobby.icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{hobby.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
