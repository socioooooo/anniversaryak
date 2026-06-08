import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarField from './components/StarField';
import HeartParticles from './components/HeartParticles';
import MouseGlow from './components/MouseGlow';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import LoveCounter from './components/LoveCounter';
import WhyILoveYou from './components/WhyILoveYou';
import AdventuresSection from './components/AdventuresSection';
import LettersSection from './components/LettersSection';
import FutureSection from './components/FutureSection';
import SurpriseSection from './components/SurpriseSection';
import FinalSection from './components/FinalSection';
import SectionDivider from './components/SectionDivider';

function App() {
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audio] = useState(new Audio());

  useEffect(() => {
    // Use a royalty-free romantic music URL
    audio.src = 'https://cdn.pixabay.com/audio/2024/11/01/audio_071ef1e4c4.mp3';
    audio.loop = true;
    audio.volume = 0.3;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audio]);

  const toggleMusic = () => {
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="relative bg-luxury-black min-h-screen overflow-x-hidden">
      {/* Background effects */}
      <StarField />
      <HeartParticles />
      <MouseGlow />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <main>
          <HeroSection musicPlaying={musicPlaying} toggleMusic={toggleMusic} />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <TimelineSection />
          <SectionDivider />
          <GallerySection />
          <SectionDivider />
          <LoveCounter />
          <SectionDivider />
          <WhyILoveYou />
          <SectionDivider />
          <AdventuresSection />
          <SectionDivider />
          <LettersSection />
          <SectionDivider />
          <FutureSection />
          <SectionDivider />
          <SurpriseSection />
          <SectionDivider />
          <FinalSection />
        </main>
      )}
    </div>
  );
}

export default App;
