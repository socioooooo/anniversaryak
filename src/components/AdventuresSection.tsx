import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Plane, Mountain, Waves, Building, TreePine, Heart } from 'lucide-react';

const places = [
  { name: 'Paris', country: 'France', icon: Building, x: 48, y: 22, memory: 'The city of love, where we truly found ours.', date: 'Summer 2022' },
  { name: 'Bali', country: 'Indonesia', icon: Waves, x: 77, y: 55, memory: 'Temples, sunsets, and the peace of being together.', date: 'Winter 2021' },
  { name: 'Tokyo', country: 'Japan', icon: TreePine, x: 82, y: 30, memory: 'Neon lights and quiet gardens - contrasts just like us.', date: 'Spring 2023' },
  { name: 'Swiss Alps', country: 'Switzerland', icon: Mountain, x: 50, y: 24, memory: 'On top of the world, literally and figuratively.', date: 'Fall 2022' },
  { name: 'Santorini', country: 'Greece', x: 54, y: 32, icon: Building, memory: 'Blue domes and golden sunsets over the Aegean.', date: 'Summer 2023' },
  { name: 'Home', country: 'Wherever You Are', icon: Heart, x: 45, y: 40, memory: 'The best destination of all - wherever we are together.', date: 'Always' },
];

export default function AdventuresSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activePlace, setActivePlace] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">Exploring Together</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Our Adventures</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Stylized map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative glass rounded-3xl p-8 md:p-12 mb-8"
        >
          <div className="relative w-full aspect-[2/1] min-h-[300px]">
            {/* World map outline (simplified) */}
            <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full opacity-10">
              <ellipse cx="50" cy="25" rx="48" ry="23" fill="none" stroke="#d4a853" strokeWidth="0.3" />
              <line x1="2" y1="25" x2="98" y2="25" stroke="#d4a853" strokeWidth="0.2" />
              <line x1="50" y1="2" x2="50" y2="48" stroke="#d4a853" strokeWidth="0.2" />
            </svg>

            {/* Place markers */}
            {places.map((place, i) => {
              const Icon = place.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                  className="absolute cursor-pointer group"
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  onMouseEnter={() => setActivePlace(i)}
                  onMouseLeave={() => setActivePlace(null)}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center shadow-gold">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-luxury-black" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-500/50" />
                  </motion.div>

                  {/* Tooltip */}
                  {activePlace === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 glass rounded-xl p-4 min-w-[200px] z-10"
                    >
                      <p className="font-heading text-sm text-gold-500">{place.date}</p>
                      <p className="font-heading text-lg text-white">{place.name}</p>
                      <p className="font-body text-xs text-white/40">{place.country}</p>
                      <p className="font-body text-sm text-white/70 mt-2">{place.memory}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Animated route lines */}
            <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full pointer-events-none">
              {places.slice(0, -1).map((place, i) => {
                const next = places[i + 1];
                return (
                  <motion.line
                    key={i}
                    x1={place.x}
                    y1={place.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="#d4a853"
                    strokeWidth="0.15"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                    transition={{ delay: 1 + i * 0.2, duration: 1 }}
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-white/30">
            <Plane className="w-4 h-4" />
            <span className="font-body text-xs tracking-wider">6 DESTINATIONS, INFINITE MEMORIES</span>
          </div>
        </motion.div>

        {/* Place cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {places.map((place, i) => {
            const Icon = place.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass rounded-xl p-5 hover:border-gold-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-4 h-4 text-gold-500" />
                  <h4 className="font-heading text-lg text-white">{place.name}</h4>
                </div>
                <p className="font-body text-xs text-white/40 mb-1">{place.country}</p>
                <p className="font-body text-sm text-white/60">{place.memory}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
