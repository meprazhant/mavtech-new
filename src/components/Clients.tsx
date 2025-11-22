'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Client {
  _id: string;
  name: string;
  link?: string;
  mainImage?: string;
  logoImage?: string;
  description?: string;
}

const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch trigger
  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() > 0.85) { // 15% chance to glitch per interval
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
      }
    };

    const interval = setInterval(triggerGlitch, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative inline-block group cursor-pointer"
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Main Text */}
      <span className="relative z-10 block text-5xl md:text-7xl font-black text-white/90 tracking-tighter">
        {text}
      </span>

      {/* Cyan Layer */}
      <motion.span
        className="absolute top-0 left-0 -z-10 block text-5xl md:text-7xl font-black text-cyan-400 tracking-tighter opacity-0 mix-blend-screen"
        animate={{
          opacity: isGlitching ? [0, 1, 0, 1, 0] : 0,
          x: isGlitching ? [-2, 2, -1, 3, 0] : 0,
          y: isGlitching ? [1, -1, 0, 2, 0] : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {text}
      </motion.span>

      {/* Magenta Layer */}
      <motion.span
        className="absolute top-0 left-0 -z-10 block text-5xl md:text-7xl font-black text-fuchsia-500 tracking-tighter opacity-0 mix-blend-screen"
        animate={{
          opacity: isGlitching ? [0, 1, 0, 1, 0] : 0,
          x: isGlitching ? [2, -2, 1, -3, 0] : 0,
          y: isGlitching ? [-1, 1, 0, -2, 0] : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch (error) {
        console.error('Failed to fetch clients', error);
      }
    };

    fetchClients();
  }, []);

  if (clients.length === 0) {
    return null; // Or a loading state/skeleton
  }

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden flex flex-col justify-center">


      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Masks for smooth fade in/out */}
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* Scrolling Content */}
        <div className="flex w-full overflow-hidden select-none">
          <motion.div
            className="flex flex-shrink-0 gap-16 md:gap-32 pr-16 md:pr-32 items-center"
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {clients.map((client) => (
              <Link key={client._id} href={client.link || '#'} target="_blank" rel="noopener noreferrer">
                <GlitchText text={client.name} />
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-shrink-0 gap-16 md:gap-32 pr-16 md:pr-32 items-center"
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {clients.map((client) => (
              <Link key={`dup-${client._id}`} href={client.link || '#'} target="_blank" rel="noopener noreferrer">
                <GlitchText text={client.name} />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
