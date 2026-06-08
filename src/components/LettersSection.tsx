import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, X } from 'lucide-react';

const letters = [
  {
    id: 1,
    title: 'My Love',
    preview: 'Reflecting on our journey...',
    content: `My Baby,\n\nIt's honestly hard to believe that we've completed six years together. We've been through so many highs and lows, but through everything, we've stayed by each other's side. Looking back, it feels incredible to see how far we've come.\n\nWhat makes me even happier is that things are finally falling into place. My parents know about us now, and that means so much to me. Knowing that the people who matter most to me also know about the person who holds such a special place in my heart is a feeling I can't fully put into words.\n\nWith all my love,\nForever yours ❤️`,
  },
  {
    id: 2,
    title: 'They Like You',
    preview: 'The best part of this journey...',
    content: `My Love,\n\nThe best part? They genuinely like you. ❤️\n\nThat makes me even more excited about our future. Knowing that the people I love most in this world also see what makes you so special to me is beyond words.\n\nA few more years, and we'll finally get to build the life we've always dreamed of together. Every day with you brings me closer to that dream.\n\nThank you for being you,\nAll my love ❤️✨`,
  },
  {
    id: 3,
    title: 'Our Forever',
    preview: 'To our beautiful future...',
    content: `My Darling,\n\nThere are still so many memories to create, so many adventures to have, and so much happiness waiting for us. Even today, it doesn't feel real that we've completed six whole years. Time has flown by, and yet every moment with you remains special.\n\nI'm truly grateful for everything we've shared and for having you in my life. Here's to us, our journey, and all the beautiful years ahead. ❤️✨\n\nHappy 6th Anniversary, Baby. 😘❤️\n\nForever and always,\nYours ❤️`,
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
