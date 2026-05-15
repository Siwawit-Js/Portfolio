import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/experience';
import { PROFILE } from '../data/profile';

export function About() {
  const experiences = [...EXPERIENCE].sort((a, b) => (a.start_date > b.start_date ? -1 : 1));

  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20 bg-background z-10">
      <div className="mx-auto w-full max-w-[1000px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column (Pill + Intro) */}
          <div className="lg:col-span-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-primary/40 rounded-full px-5 py-2 text-sm font-medium text-ink mb-10 bg-white/50 backdrop-blur-sm"
            >
              About Me
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-medium text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-ink mb-8 max-w-2xl"
            >
              Driven - And<br />Adaptable
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-medium text-ink/80 leading-relaxed max-w-2xl"
            >
              <span className="text-ink font-semibold">Passionate about creating seamless user experiences.</span>{' '}
              <span className="text-muted/80">Over {PROFILE.stats?.find(s => s.label.includes('Exp'))?.value || '8'} years in the digital design world. Expert in full-stack development</span>
            </motion.p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-2xl border-b border-rule/50 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex font-display font-bold text-6xl md:text-7xl tracking-tighter text-ink mb-3">
              <span className="text-3xl mt-2 font-normal">+</span>40
            </div>
            <div className="text-sm font-semibold tracking-widest text-muted uppercase">Total Projects<br/>Completed</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex font-display font-bold text-6xl md:text-7xl tracking-tighter text-ink mb-3">
              <span className="text-3xl mt-2 font-normal">+</span>15
            </div>
            <div className="text-sm font-semibold tracking-widest text-muted uppercase">Years Of<br/>Experience</div>
          </motion.div>
        </div>

        {/* Professional Journey */}
        <div className="mt-20">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-medium text-muted mb-10"
          >
            My professional journey
          </motion.h3>

          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-rule/50 hover:bg-surface/30 transition-colors px-4 -mx-4 rounded-xl"
              >
                <div className="flex items-start md:items-center gap-6 md:gap-12 w-full md:w-auto mb-4 md:mb-0">
                  <span className="font-medium text-lg text-ink w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-semibold text-2xl text-ink group-hover:text-primary transition-colors">
                      {exp.title}
                    </h4>
                    <span className="text-muted text-sm mt-1 block">
                      ({exp.start_date.substring(0, 4)} - {exp.is_current ? 'Present' : exp.end_date?.substring(0, 4) || 'Present'})
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto ml-14 md:ml-0 gap-6">
                  {/* Mock thumbnail images as seen in the screenshot */}
                  <div className="hidden md:flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-20 h-14 bg-rule rounded-md overflow-hidden shadow-sm">
                      <img src={`https://picsum.photos/seed/${exp.id}1/200/100`} className="w-full h-full object-cover opacity-80" alt="Work sample" />
                    </div>
                    <div className="w-20 h-14 bg-rule rounded-md overflow-hidden shadow-sm">
                      <img src={`https://picsum.photos/seed/${exp.id}2/200/100`} className="w-full h-full object-cover opacity-80" alt="Work sample" />
                    </div>
                  </div>
                  <span className="font-medium text-muted whitespace-nowrap text-right">
                    {exp.company}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
