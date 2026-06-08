import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';

const videos = [
  { id: 1, title: 'Our First Dance', subtitle: 'The song that became ours', pexels: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, title: 'Sunset Kisses', subtitle: 'Golden hour, golden memories', pexels: 'https://images.pexels.com/photos/1194256/pexels-photo-1194256.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, title: 'Adventures Together', subtitle: 'Every road leads to you', pexels: 'https://images.pexels.com/photos/1114903/pexels-photo-1114903.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export default function VideoSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-gold-500 tracking-[0.3em] uppercase text-sm mb-4">Moving Memories</p>
        <h2 className="font-display text-4xl md:text-6xl text-gradient-gold">Video Memories</h2>
        <div className="mt-6 w-24 h-[1px] bg-gradient-gold mx-auto" />
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
            onClick={() => setActiveVideo(video.id)}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative glass rounded-2xl overflow-hidden"
            >
              <img
                src={video.pexels}
                alt={video.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold"
                >
                  <Play className="w-6 h-6 text-luxury-black ml-0.5" />
                </motion.div>
              </div>
              {/* Floating effect */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="p-5">
                  <h3 className="font-heading text-lg text-white">{video.title}</h3>
                  <p className="font-body text-sm text-white/40">{video.subtitle}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Video modal */}
      {activeVideo !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-3xl w-full glass rounded-2xl p-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video rounded-xl bg-luxury-dark flex items-center justify-center">
              <div className="text-center">
                <Play className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                <p className="font-heading text-xl text-white">
                  {videos.find((v) => v.id === activeVideo)?.title}
                </p>
                <p className="font-body text-sm text-white/40 mt-2">
                  Replace with your special video memory
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
