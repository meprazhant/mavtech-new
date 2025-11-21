'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function BlurText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // 0: left, 1: center, 2: right
  const previousXRef = useRef(0);

  // Images for different directions
  const images = [
    '/images/tech-left.png',   // Left movement
    '/images/tech-center.png', // Center/no movement
    '/images/tech-right.png',  // Right movement
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate progress through the section
      const start = sectionTop - windowHeight * 0.8;
      const end = sectionTop + sectionHeight - windowHeight * 0.2;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      
      // Check if mouse is within section
      const inSection = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inSection) {
        // Calculate vertical position as percentage (0 to 1)
        const relativeY = (e.clientY - rect.top) / rect.height;
        
        // Only show image if mouse is between 30% and 70% of component height
        const inVerticalRange = relativeY >= 0.3 && relativeY <= 0.7;
        setIsMouseInSection(inVerticalRange);

        if (inVerticalRange) {
          // Update mouse position relative to the viewport (for fixed positioning)
          setMousePosition({
            x: e.clientX,
            y: e.clientY,
          });

          // Determine direction based on mouse movement
          const deltaX = e.clientX - previousXRef.current;
          
          if (Math.abs(deltaX) > 2) { // Threshold to avoid jitter
            if (deltaX < 0) {
              setCurrentImageIndex(0); // Moving left
            } else if (deltaX > 0) {
              setCurrentImageIndex(2); // Moving right
            }
          } else {
            setCurrentImageIndex(1); // Stationary or minimal movement
          }

          previousXRef.current = e.clientX;
        }
      } else {
        setIsMouseInSection(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split text into words
  const text = "We transform ideas into powerful digital solutions using cutting-edge technology and innovative design principles";
  const words = text.split(' ');

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-white flex items-center justify-center py-32 px-6 overflow-hidden cursor-default"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed text-gray-900 text-center font-[family-name:var(--font-poppins)]">
          {words.map((word, index) => {
            // Calculate when this word should start unblurring
            // Increased multiplier to reveal more words faster
            const wordProgress = (scrollProgress * words.length * 1.5) - index;
            const wordBlur = Math.max(0, Math.min(15, 15 - (wordProgress * 15)));
            const wordOpacity = Math.max(0.2, Math.min(1, 0.2 + (wordProgress * 0.8)));

            return (
              <span
                key={index}
                className="inline-block mr-2 md:mr-3"
                style={{
                  filter: `blur(${wordBlur}px)`,
                  opacity: wordOpacity,
                  transition: 'filter 0.3s ease-out, opacity 0.3s ease-out',
                }}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>

      {/* Mouse-following image */}
      {isMouseInSection && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(10px, 10px)',
          }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50 transition-all duration-200">
            <Image
              src={images[currentImageIndex]}
              alt="Tech visual"
              fill
              className="object-cover transition-all duration-300"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
