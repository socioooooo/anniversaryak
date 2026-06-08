import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plane, Home, Cake, Baby, Globe, Heart } from 'lucide-react';

const dreams = [
  { title: 'Future Trips', icon: Plane, items: ['Northern Lights in Iceland', 'Cherry blossoms in Kyoto', 'Sailing the Mediterranean'], color: 'from-blue-400 to-cyan-300' },
  { title: 'Future Goals', icon: Home, items: ['Our dream home', 'Learning to cook together', 'Building our legacy'], color: 'from-emerald-400 to-green-300' },
  { title: 'Future Celebrations', icon: Cake, items: ['7th anniversary in Paris', 'Milestone birthdays', 'Every little victory'], color: 'from-rose-400 to-pink-300' },
];

const milestones = [
  { label: 'Year 7', icon: Globe, desc: 'New horizons await' },
  { label: 'Year 8', icon: Home, desc: 'Building our nest' },
  { label: 'Year 9', icon: Baby, desc: 'Growing our family' },
  { label: 'Year 10', icon: Cake, desc: 'A decade of love' },
  { label: 'Forever', icon: Heart, desc: 'And beyond' },
];

export default function FutureSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">What Lies Ahead</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Future Together</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      {/* Dream cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {dreams.map((dream, i) => {
          const Icon = dream.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl p-8 hover:border-gold-500/30 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${dream.color} flex items-center justify-center mb-6`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-xl text-white mb-4">{dream.title}</h3>
              <ul className="space-y-3">
                {dream.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15 + j * 0.1 }}
                    className="flex items-center gap-3 font-body text-sm text-white/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Glowing timeline */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          {/* Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-500/40 via-gold-500/20 to-transparent" />

          {milestones.map((ms, i) => {
            const Icon = ms.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
                className={`flex items-center mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-[45%] ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h4 className="font-heading text-lg text-white">{ms.label}</h4>
                  <p className="font-body text-sm text-white/40">{ms.desc}</p>
                </div>

                <div className="w-[10%] flex justify-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.15, duration: 0.3 }}
                    className="w-10 h-10 rounded-full bg-luxury-dark border border-gold-500/30 flex items-center justify-center"
                    style={{ boxShadow: '0 0 20px rgba(212,168,83,0.2)' }}
                  >
                    <Icon className="w-4 h-4 text-gold-500" />
                  </motion.div>
                </div>

                <div className="w-[45%]" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
