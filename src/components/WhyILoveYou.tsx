import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Smile, HandHeart, Users, Zap, Music, Infinity } from 'lucide-react';

const reasons = [
  { front: 'Your Smile', back: 'The way your smile lights up every room and makes every moment brighter. It\'s my favorite sight in the world.', icon: Smile, color: 'from-amber-400 to-yellow-300' },
  { front: 'Your Kindness', back: 'The gentle kindness you show to everyone around you. It inspires me to be better, kinder, stronger every single day.', icon: HandHeart, color: 'from-rose-400 to-pink-300' },
  { front: 'Your Support', back: 'Through every storm and every celebration, you stand beside me with unwavering strength, love, and belief in me. You\'re my rock.', icon: Users, color: 'from-blue-400 to-cyan-300' },
  { front: 'Your Craziness', back: 'The wild, beautiful, unpredictable energy you bring to life. You make every day an adventure and keep me laughing.', icon: Zap, color: 'from-emerald-400 to-green-300' },
  { front: 'Your Laugh', back: 'That infectious laugh that turns ordinary moments into the most precious memories of my life. I never want to stop hearing it.', icon: Music, color: 'from-violet-400 to-purple-300' },
  { front: 'Everything About You', back: 'Every imperfection, every quirk, every detail - together they make the most perfect person I have ever known. You\'re my forever.', icon: Infinity, color: 'from-gold-400 to-gold-200' },
];

function FlipCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = reason.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="perspective-1000 h-[280px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center p-8 hover:border-gold-500/30 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-heading text-2xl text-white text-center">{reason.front}</h3>
          <p className="font-body text-xs text-white/30 mt-3 tracking-wider">TAP TO REVEAL</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, rgba(212,168,83,0.1), rgba(244,63,94,0.1))',
            border: '1px solid rgba(212,168,83,0.2)',
          }}
        >
          <Icon className="w-8 h-8 text-gold-500 mb-4" />
          <p className="font-heading text-lg text-white/90 text-center leading-relaxed">{reason.back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyILoveYou() {
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
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">From My Heart</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Why I Love You</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, i) => (
          <FlipCard key={i} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}
