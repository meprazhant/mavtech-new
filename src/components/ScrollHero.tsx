'use client';

import { useEffect, useState } from 'react';

// Text scramble hook
const useScrambleText = (text: string, trigger: number) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    let frame = 0;
    const maxFrames = 30;
    let animationFrameId: number | null = null;

    const scramble = () => {
      if (frame >= maxFrames) {
        setDisplayText(text);
        return;
      }

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (frame / maxFrames > index / text.length) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(scrambled);
      frame++;
      animationFrameId = requestAnimationFrame(scramble);
    };

    scramble();

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [text, trigger]);

  return displayText;
};

export default function AutoHero() {
  const stages = [
    {
      text: "Your all in one software development partner.",
      color: "from-gray-400 via-gray-500 to-gray-600",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    },
    {
      text: "Develops mobile applications",
      color: "from-blue-400 via-blue-500 to-cyan-600",
      bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
    },
    {
      text: "Develops SaaS applications",
      color: "from-purple-400 via-purple-500 to-pink-600",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    },
    {
      text: "Develops cafe management systems",
      color: "from-orange-400 via-amber-500 to-yellow-600",
      bgImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80",
    },
    {
      text: "Develops school management systems",
      color: "from-green-400 via-emerald-500 to-teal-600",
      bgImage: "https://softchimps.com/wp-content/uploads/schools.jpg",
    },
    {
      text: "Helps you in digital marketing",
      color: "from-red-400 via-pink-500 to-rose-600",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    },
  ];

  const [stageIndex, setStageIndex] = useState(0);

  // Change stage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentStage = stages[stageIndex];

  // Scramble animations
  const scrambledHeading = useScrambleText('MAVTECH', 0);
  const scrambledSubtext = useScrambleText(currentStage.text, stageIndex);

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${currentStage.bgImage})`, opacity: 0.4 }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-[12vw] sm:text-[10vw] lg:text-[9vw] font-black leading-[0.9] tracking-tighter">
          <span
            className={`block bg-gradient-to-r ${currentStage.color} bg-clip-text text-transparent transition-all duration-700`}
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
          >
            {scrambledHeading}
          </span>
        </h1>
        <div className="mt-6 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 max-w-4xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
            {scrambledSubtext}
          </h2>
        </div>
      </div>
    </section>
  );
}
