'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};


const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative text-3xl inline-block">
      <span className="relative tex z-20">{text}</span>

      {/* Red duplicate */}
      <motion.span
        className="absolute inset-0 text-red-500 z-10 pointer-events-none"
        initial={{ x: 0, opacity: 0 }}
        animate={{
          x: [2, -2, 2, -1, 1, 0],
          opacity: [0, 0.6, 0.8, 0.6, 0.4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>

      {/* Blue duplicate */}
      <motion.span
        className="absolute inset-0 text-blue-500 z-0 pointer-events-none"
        initial={{ x: 0, opacity: 0 }}
        animate={{
          x: [-2, 2, -2, 1, -1, 0],
          opacity: [0, 0.6, 0.8, 0.6, 0.4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default function ScrollHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050011] flex flex-col">

      {/* Background */}
      <StarField />

      <motion.img
        className="absolute top-0 left-0 w-[200vw] h-[100vh] object-cover pointer-events-none z-0"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 2 }}
        src="https://i.ibb.co/BHfnV06r/image.png"
        alt="Sunrise Gradient"
        style={{ filter: 'blur(5px) brightness(0.5)' }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-30 flex flex-col w-full max-w-7xl mx-auto px-6 py-8 h-full">



        {/* HEADLINE SECTION */}
        <div className="flex-1  flex-col  gap-5 flex items-center justify-center text-center">
          <motion.div
            className="text-xs md:text-sm font-mono tracking-[0.3em] text-white/70 uppercase border border-white/10 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.9, duration: 0.8 }}
          >
            <span className="animate-pulse mr-2 text-green-500">●</span>
            <GlitchText text="Welcome to Mavtech" />
          </motion.div>

          <motion.h1
            className="text-lg md:text-2xl lg:text-3xl font-black text-white tracking-tight max-w-5xl leading-[1.05]"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            transition={{ delay: 5.3, duration: 1.5 }}
          >
            Mavtech combines modern tech stacks,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              AI-powered insights
            </span>
            {' '}and responsive design to build scalable web & mobile apps, SEO, e-commerce, and more.
          </motion.h1>
        </div>

        {/* BOTTOM INDICATOR */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.8 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
