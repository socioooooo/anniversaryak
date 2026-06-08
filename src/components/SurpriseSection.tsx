import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // Confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#d4a853', '#fcd34d', '#f43f5e', '#fb7185', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">Something Special</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Anniversary Surprise</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      <div className="max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
              onClick={handleOpen}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                <div className="relative">
                  {/* Gift box */}
                  <div className="w-40 h-40 md:w-52 md:h-52 mx-auto relative">
                    {/* Box body */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-44 h-24 md:h-32 rounded-xl bg-gradient-to-br from-gold-600 to-gold-400 shadow-gold" />
                    {/* Box lid */}
                    <motion.div
                      animate={{ rotate: [0, -2, 2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 w-36 md:w-48 h-8 md:h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-300"
                    />
                    {/* Ribbon */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-24 md:h-32 bg-rose-500/80 rounded-full" />
                    <div className="absolute bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 w-4 h-8 md:h-10 bg-rose-500/80 rounded-full" />
                    {/* Bow */}
                    <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-6 relative">
                        <div className="absolute left-0 top-0 w-6 h-6 bg-rose-500 rounded-full" />
                        <div className="absolute right-0 top-0 w-6 h-6 bg-rose-400 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <p className="font-body text-white/40 mt-8 tracking-wider text-sm">TAP TO OPEN YOUR GIFT</p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glass-strong rounded-3xl p-10 md:p-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Gift className="w-12 h-12 text-gold-500 mx-auto mb-6" />
                <h3 className="font-display text-3xl md:text-5xl text-gradient-gold mb-6">
                  Thank You For The Best 6 Years Of My Life
                </h3>
                <p className="font-heading text-xl text-white/60">
                  Every moment with you is a gift I never want to stop unwrapping.
                </p>
              </motion.div>

              {/* Decorative hearts */}
              <div className="flex justify-center gap-4 mt-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-rose-500" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
