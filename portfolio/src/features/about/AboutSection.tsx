import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Tv2, Music2, Gamepad2, Coffee, Star } from 'lucide-react';
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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cosmos-400/30 bg-cosmos-500/10 text-cosmos-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Star className="w-3.5 h-3.5" />
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Crafting Digital{' '}
            <span className="gradient-text-galaxy">Galaxies</span>
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
              {/* Glowing nebula border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-nebula-500 to-cosmos-500 rounded-2xl blur-md opacity-60 animate-gradient bg-300%" />
              <div className="relative rounded-2xl overflow-hidden bg-space-900 border border-white/10">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 via-nebula-500/15 to-cosmos-500/20 stars-bg-color">
                    <User className="w-32 h-32 text-nebula-300/50" />
                  </div>
                )}
              </div>
            </div>
            {/* Floating decorations */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-nebula-500/10 rounded-2xl border border-nebula-400/20 backdrop-blur-md -z-10 hidden lg:block animate-float" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cosmos-500/10 rounded-2xl border border-cosmos-400/20 backdrop-blur-md -z-10 hidden lg:block animate-float-delayed" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 text-slate-300 leading-relaxed">
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
                  className="text-center p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-nebula-400/30 hover:bg-white/[0.06] transition-all"
                >
                  <hobby.icon className="w-5 h-5 text-nebula-300 mx-auto mb-2" />
                  <div className="text-xs text-slate-300 font-medium">{hobby.value}</div>
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
