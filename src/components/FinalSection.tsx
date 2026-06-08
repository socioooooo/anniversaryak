import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FinalSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden" ref={sectionRef}>
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.15, 0.15, 0],
                    y: [100, -200 - i * 80],
                  }
                : {}
            }
            transition={{
              duration: 6 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute"
            style={{ left: `${10 + (i * 7) % 80}%` }}
          >
            <svg
              viewBox="0 0 24 24"
              className="text-rose-500/20"
              fill="currentColor"
              style={{ width: `${12 + (i % 5) * 4}px` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <p className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[1.2]">
            In every lifetime,
          </p>
          <p className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient-gold leading-[1.2] mt-2">
            I would still choose you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16"
        >
          <div className="w-24 h-[1px] bg-gradient-gold mx-auto mb-8" />
          <p className="font-heading text-xl md:text-2xl text-white/40">
            Happy 6th Anniversary
          </p>
          <p className="font-body text-sm text-gold-500/50 mt-4 tracking-[0.3em]">
            2020 &mdash; 2026
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 py-8 text-center"
      >
        <p className="font-heading text-sm md:text-base text-white/20 tracking-wider">
          Forever Starts Again Every Day.
        </p>
      </motion.footer>
    </section>
  );
}
