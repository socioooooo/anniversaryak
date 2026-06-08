import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Camera, MapPin, Coffee, Star, Sparkles } from 'lucide-react';

const milestones = [
  { year: 'Day 1', title: 'First Meeting', icon: Heart, desc: 'Who would have thought that a simple moment of you coming to buy milk would turn into the most beautiful chapter of my life? ❤️', color: 'from-rose-500 to-pink-400' },
  { year: 'Day 1', title: 'First Selfie', icon: Camera, desc: 'Our first selfie, taken on the same day we met. ❤️ Back then it was just a photo; today it\'s a reminder of where our beautiful story began.', color: 'from-amber-500 to-yellow-400' },
  { year: 'Year 1', title: 'First Trip', icon: MapPin, desc: 'Our first long ride to Lonavala. 🏍️❤️ A simple trip that turned into one of my favorite memories. The roads ended, but the journey we started that day never did.', color: 'from-blue-500 to-cyan-400' },
  { year: 'Year 4-5', title: 'Family Knows', icon: Star, desc: 'One of my happiest moments was telling my family about us. ❤️ After years of memories and dreams together, it felt amazing to finally share our story with the people I love most.', color: 'from-emerald-500 to-green-400' },
  { year: 'Year 5-6', title: 'They Like You Too', icon: Coffee, desc: 'The best part? They genuinely like you. ❤️ Knowing that the people who matter most to me also know about the person who holds such a special place in my heart is a feeling I can\'t fully put into words.', color: 'from-violet-500 to-purple-400' },
  { year: 'Year 6', title: "Today's Anniversary", icon: Sparkles, desc: 'Six years of love, growth, and memories. A few more years, and we\'ll finally get to build the life we\'ve always dreamed of together. ❤️✨', color: 'from-gold-500 to-gold-300' },
];

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">Our Journey</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Our Story</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      {/* Timeline line */}
      <div className="max-w-5xl mx-auto relative">
        {/* Center line */}
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: '100%' } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute left-1/2 top-0 w-[1px] bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent hidden md:block"
        />

        {milestones.map((item, i) => {
          const Icon = item.icon;
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
              className={`relative flex items-center mb-16 md:mb-20 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col md:gap-8`}
            >
              {/* Card */}
              <div className={`w-full md:w-[45%] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass rounded-2xl p-8 hover:border-gold-500/30 transition-all duration-500 group"
                >
                  <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-body text-gold-500/70 text-sm tracking-wider">{item.year}</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl text-white mb-3">{item.title}</h3>
                  <p className="font-body text-white/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              </div>

              {/* Center dot */}
              <div className="hidden md:flex w-[10%] justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                  className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color} shadow-gold`}
                />
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
