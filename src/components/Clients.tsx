'use client';

import { useEffect, useRef, useState } from 'react';

export default function Clients() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const isScrollingRef = useRef(false);
  const currentIndexRef = useRef(index); // Ref to hold the current index

  useEffect(() => {
    currentIndexRef.current = index; // Keep the ref updated with the latest index
  }, [index]);

  const clients = [
    { id: 1, name: 'Reflex', description: 'Modern web solutions' },
    { id: 2, name: 'TechCorp', description: 'Enterprise software' },
    { id: 3, name: 'InnovateLab', description: 'AI-powered tools' },
    { id: 4, name: 'DataFlow', description: 'Data analytics platform' },
    { id: 5, name: 'CloudSync', description: 'Cloud infrastructure' },
    { id: 6, name: 'NextGen', description: 'Digital transformation' },
    { id: 7, name: 'PixelPro', description: 'Creative design studio' },
    { id: 8, name: 'CodeBase', description: 'Developer tools' }
  ];

  // Handle scroll to trigger carousel
  useEffect(() => {
    const handleWheel = (e) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (!inView) return;

      const currentIdx = currentIndexRef.current;
      const atStart = currentIdx === 0 && e.deltaY < 0;
      const atEnd = currentIdx === clients.length - 1 && e.deltaY > 0;

      // Prevent default scroll only if we are not at the ends and trying to scroll further
      if (!atStart && !atEnd) {
        e.preventDefault();
      } else {
        // If at start/end and trying to scroll further, allow vertical page scroll
        return;
      }

      if (isScrollingRef.current) return;

      isScrollingRef.current = true;

      if (e.deltaY > 0) {
        // Scroll down → next slide
        setIndex((i) => Math.min(i + 1, clients.length - 1));
      } else {
        // Scroll up → prev slide
        setIndex((i) => Math.max(i - 1, 0));
      }

      // Smooth + slow transition window
      setTimeout(() => (isScrollingRef.current = false), 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []); // Empty dependency array means this effect runs once on mount

  // Move Carousel
  const translateX = -(index * 520); // card + gap

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 overflow-hidden"
    >
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="text-[50vw] font-black text-purple-600 blur-[100px]">MT</div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-16">
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-2">Trusted by</h2>
        <p className="text-gray-600 text-lg">Leading companies worldwide</p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative z-10 flex justify-center w-full overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-[1100ms] ease-[cubic-bezier(.4,0,.2,1)]"
          style={{
            transform: `translateX(${translateX}px)`
          }}
        >
          {clients.map((client, i) => (
            <div
              key={client.id}
              className={`w-[500px] h-[400px] flex-shrink-0 bg-white/90 backdrop-blur-md border-2 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center transition-all duration-700 ${
                i === index ? 'scale-105 border-purple-400 shadow-purple-300' : 'scale-95 opacity-50'
              }`}
            >
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-xl">
                <span className="text-5xl font-black text-white">{client.name[0]}</span>
              </div>

              <h3 className="text-4xl font-black text-gray-900 mb-2">{client.name}</h3>
              <p className="text-gray-600 text-lg text-center">{client.description}</p>
            </div>
          ))}
        </div>
      </div>

     
      {/* Dots */}
      <div className="relative z-10 mt-6 flex justify-center gap-2">
        {clients.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
