import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { TESTIMONIALS } from '../data/testimonials';
import { useState } from 'react';

export function Contact() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <>
      {/* Testimonial Section */}
      <section className="relative px-6 py-20 md:px-12 lg:px-20 bg-background z-10">
        <div className="mx-auto w-full max-w-[1000px]">
          <div className="bg-surface rounded-3xl p-8 md:p-16 relative overflow-hidden">
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
              {/* Left Title */}
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block border border-primary/40 rounded-full px-5 py-2 text-sm font-medium text-ink bg-background mb-8"
                >
                  Testimonial
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-display font-medium text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ink"
                >
                  Keeps Us<br />Organized
                </motion.h2>
              </div>

              {/* Right Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="relative border-t border-rule/50 pt-8">
                  <div className="absolute top-4 left-0 text-7xl text-rule font-serif leading-none opacity-50">&ldquo;</div>
                  
                  <motion.p 
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg md:text-xl text-ink/80 leading-relaxed font-medium pl-16 min-h-[120px]"
                  >
                    {TESTIMONIALS[activeTestimonial].text}
                  </motion.p>
                </div>

                {/* Author & Controls */}
                <div className="mt-12 flex items-center justify-between pl-16">
                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border border-rule flex items-center justify-center hover:bg-white transition-colors bg-background">
                      <ArrowLeft size={16} className="text-ink/60" />
                    </button>
                    <div className="flex gap-1.5">
                      {TESTIMONIALS.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeTestimonial ? 'w-4 bg-primary' : 'w-1.5 bg-rule'}`} />
                      ))}
                    </div>
                    <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md">
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 text-right md:text-left">
                    <img src={TESTIMONIALS[activeTestimonial].avatar_url} alt={TESTIMONIALS[activeTestimonial].author} className="w-10 h-10 rounded-full object-cover shadow-sm hidden sm:block" />
                    <div>
                      <div className="font-bold text-ink">{TESTIMONIALS[activeTestimonial].author}</div>
                      <div className="text-sm text-muted">{TESTIMONIALS[activeTestimonial].role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Footer Contact Section */}
      <section id="contact" className="dark-section relative px-6 pt-32 pb-8 md:px-12 lg:px-20 bg-background text-ink z-10 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-cyan-500/20 via-primary/10 to-transparent pointer-events-none blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-48 w-96 bg-accent/20 pointer-events-none blur-3xl rounded-full"></div>

        <div className="mx-auto w-full max-w-[800px] flex flex-col items-center text-center relative z-10">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-medium text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-tight text-white mb-16"
          >
            Have a project in mind?<br />let's make it happen!
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-lg text-left"
          >
            <label className="text-sm font-semibold tracking-wide text-white/80 mb-4 block">
              Hey There! Subscribe To Our Newsletter!
            </label>
            <div className="relative border-b border-rule pb-2 flex items-center group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-none outline-none text-white placeholder-white/40 focus:ring-0 text-lg py-2"
              />
              <button className="text-white opacity-60 hover:opacity-100 transition-opacity p-2">
                <ArrowRight size={20} />
              </button>
              <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-white transition-all duration-300 group-focus-within:w-full"></div>
            </div>
          </motion.div>

          {/* Social Icons */}
          <div className="mt-16 flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full border border-rule flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"><FaFacebookF size={18} /></a>
            <a href="#" className="w-12 h-12 rounded-full border border-rule flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"><FaTwitter size={18} /></a>
            <a href="#" className="w-12 h-12 rounded-full border border-rule flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"><FaInstagram size={18} /></a>
            <a href="#" className="w-12 h-12 rounded-full border border-rule flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"><FaLinkedinIn size={18} /></a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-32 border-t border-rule/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 relative z-10">
          <div>© Sans Brothers 2024</div>
          <div className="flex gap-6 font-semibold tracking-wide">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>

      </section>
    </>
  );
}
