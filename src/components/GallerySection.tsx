import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, Heart } from 'lucide-react';

const memories = [
  { id: 1,  caption: 'Where it all began',            aspect: 'tall',   image: '/Img1.jpeg' },
  { id: 2,  caption: 'Every moment counts',           aspect: 'wide',   image: '/img2.jpeg' },
  { id: 3,  caption: 'Just the two of us',            aspect: 'square', image: '/img3.jpeg' },
  { id: 4,  caption: 'Together always',               aspect: 'tall',   image: '/img4.jpeg' },
  { id: 5,  caption: 'You and me',                    aspect: 'wide',   image: '/img_5.jpeg' },
  { id: 6,  caption: 'Our favourite chapter',         aspect: 'square', image: '/Img7.jpeg' },
  { id: 7,  caption: 'A love that grows',             aspect: 'tall',   image: '/img8.jpeg' },
  { id: 8,  caption: 'Smiles that say it all',        aspect: 'wide',   image: '/img9.jpeg' },
  { id: 9,  caption: 'Endless adventures ahead',      aspect: 'square', image: '/img10.jpeg' },
  { id: 10, caption: 'My favourite person',           aspect: 'tall',   image: '/img11.jpeg' },
  { id: 11, caption: 'Our beautiful journey',         aspect: 'wide',   image: '/img12.jpeg' },
  { id: 12, caption: 'With sunflowers and love',      aspect: 'square', image: '/img13.jpeg' },
  { id: 13, caption: 'You and your flowers',          aspect: 'tall',   image: '/img14.jpeg' },
  { id: 14, caption: 'Our special moments',           aspect: 'wide',   image: '/img15.jpeg' },
  { id: 15, caption: 'Smiles at the station',         aspect: 'square', image: '/img16.jpeg' },
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
                src={mem.image}
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
              src={memories.find((m) => m.id === selected)?.image.replace('.jpeg', '.jpeg')}
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
