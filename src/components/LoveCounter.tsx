import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Clock, Calendar, Heart } from 'lucide-react';

const ANNIVERSARY = new Date('2020-06-07T00:00:00');

function getTimeTogether() {
  const now = new Date();
  const diff = now.getTime() - ANNIVERSARY.getTime();
  const years = now.getFullYear() - ANNIVERSARY.getFullYear();
  const months = years * 12 + (now.getMonth() - ANNIVERSARY.getMonth());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  return { years, months, days, hours, minutes };
}

const counters = [
  { key: 'years' as const, label: 'Years Together', icon: Heart },
  { key: 'months' as const, label: 'Months Together', icon: Calendar },
  { key: 'days' as const, label: 'Days Together', icon: Clock },
  { key: 'hours' as const, label: 'Hours Together', icon: Clock },
  { key: 'minutes' as const, label: 'Minutes Together', icon: Clock },
];

export default function LoveCounter() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [time, setTime] = useState(getTimeTogether());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeTogether()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">Every Second Counts</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Love Counter</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {counters.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass rounded-2xl p-6 text-center group hover:border-gold-500/30 transition-all duration-500"
            >
              <Icon className="w-6 h-6 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <motion.p
                key={time[c.key]}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="font-display text-3xl md:text-4xl text-white mb-1"
              >
                {time[c.key].toLocaleString()}
              </motion.p>
              <p className="font-body text-xs md:text-sm text-white/50">{c.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
