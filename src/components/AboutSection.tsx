import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart } from 'lucide-react';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-8 md:p-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Heart className="w-10 h-10 text-gold-500 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-body text-white/80 leading-[1.8] space-y-4"
          >
            <p>
              It's honestly hard to believe that we've completed six years together. We've been through so many highs and lows, but through everything, we've stayed by each other's side. Looking back, it feels incredible to see how far we've come.
            </p>
            <p>
              What makes me even happier is that things are finally falling into place. My parents know about us now, and that means so much to me. Knowing that the people who matter most to me also know about the person who holds such a special place in my heart is a feeling I can't fully put into words.
            </p>
            <p>
              And the best part? They genuinely like you. ❤️ That makes me even more excited about our future. A few more years, and we'll finally get to build the life we've always dreamed of together.
            </p>
            <p className="text-gold-500/70">
              I'm truly grateful for everything we've shared and for having you in my life. Here's to us, our journey, and all the beautiful years ahead. ❤️✨
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 pt-8 border-t border-gold-500/20 text-center"
          >
            <p className="font-heading text-lg text-white">Happy 6th Anniversary, Baby. 😘❤️</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
