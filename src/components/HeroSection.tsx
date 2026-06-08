import { motion } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  musicPlaying: boolean;
  toggleMusic: () => void;
}

export default function HeroSection({ musicPlaying, toggleMusic }: HeroProps) {
  const lines = [
    '6 Years.',
    '2190 Days.',
    'Countless Memories.',
    'One Beautiful Love Story.',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-rose-500/5 z-[3]" />

      {/* Couple silhouette */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[3]"
      >
        <svg viewBox="0 0 400 300" className="w-[500px] max-w-[90vw] opacity-30">
          <defs>
            <linearGradient id="silGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a853" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <path
            d="M160,280 C160,260 145,230 145,200 C145,175 160,160 175,160 C190,160 205,175 205,200 C205,230 190,260 190,280 Z"
            fill="url(#silGrad)"
          />
          <circle cx="175" cy="140" r="22" fill="url(#silGrad)" />
          <path
            d="M210,280 C210,260 195,230 195,200 C195,175 210,155 225,155 C240,155 255,175 255,200 C255,230 240,260 240,280 Z"
            fill="url(#silGrad)"
          />
          <circle cx="225" cy="135" r="25" fill="url(#silGrad)" />
          <path
            d="M190,185 Q200,175 210,185"
            stroke="url(#silGrad)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-[5] text-center px-6 max-w-4xl">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <p
              className={`font-display ${
                i === 0
                  ? 'text-5xl md:text-7xl lg:text-8xl text-gradient-gold mb-2'
                  : i === 3
                  ? 'text-4xl md:text-6xl lg:text-7xl text-gradient-rose mt-4'
                  : 'text-2xl md:text-4xl lg:text-5xl text-white/80'
              }`}
            >
              {line}
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(212,168,83,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-full bg-gradient-gold text-luxury-black font-body font-medium text-lg tracking-wider"
          >
            Begin Our Journey
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5]"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-8 h-8 text-gold-500/60" />
        </motion.div>
      </motion.div>

      {/* Music toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-[50] p-3 rounded-full glass hover:border-gold-500/30 transition-colors"
      >
        {musicPlaying ? (
          <Volume2 className="w-5 h-5 text-gold-500" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/40" />
        )}
      </motion.button>
    </section>
  );
}
