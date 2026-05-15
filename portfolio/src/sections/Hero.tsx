import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaBehance, FaLinkedin, FaDribbble, FaStar } from 'react-icons/fa';

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen px-6 pt-32 pb-16 md:px-12 md:pt-40 lg:px-20 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-[1200px]">
        
        {/* Main Title Area */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start mb-16 md:mb-24 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-[clamp(4rem,10vw,8.5rem)] leading-[0.9] tracking-tight text-ink w-full"
          >
            <div className="md:pl-20">Digital – Visual</div>
            <div>Designer</div>
          </motion.h1>
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mt-8">
          
          {/* Left / Middle: Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1 md:col-span-6 flex flex-col justify-end border-t border-rule/50 pt-8 relative"
          >
            <div className="flex items-start gap-4 max-w-md">
              <div className="mt-1.5 shrink-0 text-muted/50">
                <ArrowRight size={20} strokeWidth={1} />
              </div>
              <p className="text-lg md:text-xl font-medium text-ink/80 leading-relaxed">
                Specialized in Web Design, UX /UI, Webflow, and Front End Development.
              </p>
            </div>
          </motion.div>

          {/* Right: Big Numbers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-1 md:col-span-6 flex flex-col items-start md:items-end justify-end border-t border-rule/50 pt-8"
          >
            <div className="max-w-[280px]">
              <p className="text-muted text-sm md:text-base leading-relaxed mb-2">
                Creative masterpieces delivered in the last 8 years
              </p>
              <div className="font-display font-bold text-7xl md:text-8xl tracking-tighter text-ink flex items-end">
                50<span className="text-[0.7em]">+</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer / Trust Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {/* Trust Rating */}
          <div className="flex items-center gap-3">
            <div className="flex text-amber-400">
              <FaStar size={18} />
            </div>
            <div>
              <div className="font-bold text-ink">4.8</div>
              <div className="text-xs text-muted">from 150,000+ Reviews</div>
            </div>
          </div>

          {/* Trustpilot Logo Mock */}
          <div className="flex items-center justify-start md:justify-center gap-2">
            <div className="flex gap-1 text-emerald-500">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="bg-emerald-500 text-white p-1 rounded-sm"><FaStar size={12}/></div>)}
            </div>
            <span className="font-bold text-sm">Trustpilot</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-start md:justify-end gap-6 text-ink">
            <a href="#" className="hover:text-primary transition-colors"><FaDribbble size={22} /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaBehance size={22} /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaLinkedin size={22} /></a>
            <div className="flex gap-0.5 opacity-50 ml-2">
              <div className="w-3 h-3 bg-ink rounded-full"></div>
              <div className="w-1.5 h-3 bg-ink rounded-full"></div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
