import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, Heart } from 'lucide-react';

const memories = [
  { id: 1, caption: 'Our first adventure together', aspect: 'tall', pexels: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, caption: 'Sunset walks and endless talks', aspect: 'wide', pexels: 'https://images.pexels.com/photos/1194256/pexels-photo-1194256.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, caption: 'Coffee dates that lasted hours', aspect: 'square', pexels: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, caption: 'Dancing in the rain', aspect: 'tall', pexels: 'https://images.pexels.com/photos/1166583/pexels-photo-1166583.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, caption: 'Stargazing on quiet nights', aspect: 'wide', pexels: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, caption: 'Spontaneous road trips', aspect: 'square', pexels: 'https://images.pexels.com/photos/1114903/pexels-photo-1114903.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, caption: 'Laughter that fills the room', aspect: 'tall', pexels: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, caption: 'Home is wherever you are', aspect: 'wide', pexels: 'https://images.pexels.com/photos/1010654/pexels-photo-1010654.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 9, caption: 'Every moment a treasure', aspect: 'square', pexels: 'https://images.pexels.com/photos/1028965/pexels-photo-1028965.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export default function GallerySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">Captured Moments</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Memory Gallery</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      {/* Masonry grid */}
      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {memories.map((mem, i) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="break-inside-avoid group"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer glass"
              onClick={() => setSelected(mem.id)}
            >
              <img
                src={mem.pexels}
                alt={mem.caption}
                className={`w-full object-cover ${
                  mem.aspect === 'tall' ? 'h-80' : mem.aspect === 'wide' ? 'h-52' : 'h-64'
                } group-hover:scale-105 transition-transform duration-700`}
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="font-heading text-lg text-white">{mem.caption}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(mem.id); }}
                  className="mt-2 self-start"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      liked.has(mem.id) ? 'text-rose-500 fill-rose-500' : 'text-white/60'
                    }`}
                  />
                </button>
              </div>
              {/* Floating animation */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-4"
              >
                <div className="w-2 h-2 rounded-full bg-gold-500/40" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={memories.find((m) => m.id === selected)?.pexels.replace('w=400', 'w=800').replace('w=600', 'w=800')}
              alt=""
              className="w-full h-full object-contain rounded-2xl"
            />
            <p className="text-center font-heading text-xl text-white mt-4">
              {memories.find((m) => m.id === selected)?.caption}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
