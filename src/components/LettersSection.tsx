import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, X } from 'lucide-react';

const letters = [
  {
    id: 1,
    title: 'My Dearest',
    preview: 'A letter from the heart...',
    content: `My love,\n\nSix years ago, I found the missing piece of my soul in you. Every day since has been a beautiful dream I never want to wake from.\n\nYou are my sunrise and my sunset, my calm in every storm, my reason to smile. When I look at you, I see every beautiful thing this world has to offer.\n\nThank you for choosing me, for loving me, for being my everything.\n\nForever yours,\nWith all my heart`,
  },
  {
    id: 2,
    title: 'To My Forever',
    preview: 'Words cannot express...',
    content: `My beautiful love,\n\nThey say time flies when you're having fun, but with you, time flies because every moment is lived so fully, so deeply, so perfectly.\n\nI want you to know that I notice everything - the way you tuck your hair behind your ear, the way your eyes light up when you laugh, the way you hold my hand like it's the most natural thing in the world.\n\nYou make ordinary extraordinary.\n\nWith infinite love,\nNow and always`,
  },
  {
    id: 3,
    title: 'A Promise',
    preview: 'My vow to you...',
    content: `My darling,\n\nSix years is just the prologue of our story. I promise you a lifetime of adventures, of slow mornings, of laughter that echoes through the years.\n\nI promise to love you on the easy days and the hard ones. To be your partner, your best friend, your biggest supporter, and your safe place.\n\nThis is my promise, renewed today and every day.\n\nYours without end,\nWith my whole heart`,
  },
];

export default function LettersSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [openLetter, setOpenLetter] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">Words From The Heart</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Letters To You</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {letters.map((letter, i) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
            onClick={() => setOpenLetter(letter.id)}
            className="cursor-pointer group"
          >
            {/* Envelope */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="glass rounded-2xl p-8 text-center hover:border-gold-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Envelope flap effect */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-gold-500/10 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-gold opacity-20" />

                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Mail className="w-10 h-10 text-gold-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                </motion.div>

                <h3 className="font-heading text-xl text-white mb-2">{letter.title}</h3>
                <p className="font-body text-sm text-white/40">{letter.preview}</p>
                <p className="font-body text-xs text-gold-500/50 mt-4 tracking-wider">CLICK TO OPEN</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Letter modal */}
      <AnimatePresence>
        {openLetter !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-6"
            onClick={() => setOpenLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.7, rotateX: 20, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-xl w-full glass-strong rounded-2xl p-8 md:p-12 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenLetter(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Paper texture effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />

              <h3 className="font-heading text-2xl text-gradient-gold mb-6">
                {letters.find((l) => l.id === openLetter)?.title}
              </h3>
              <div className="font-body text-white/80 leading-[1.8] whitespace-pre-line text-sm md:text-base">
                {letters.find((l) => l.id === openLetter)?.content}
              </div>

              {/* Seal */}
              <div className="mt-8 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Heart className="w-6 h-6 text-luxury-black" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Heart({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
