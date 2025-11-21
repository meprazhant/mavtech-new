'use client';

import { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  scrambleOnMount?: boolean;
}

export default function ScrambleText({ 
  text, 
  className = '', 
  scrambleOnHover = true,
  scrambleOnMount = false 
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = '!<>-_\\/[]{}—=+*^?#@$%&';

  const scramble = () => {
    let frame = 0;
    const maxFrames = 20;
    let animationFrameId: number | null = null;

    const animate = () => {
      if (frame >= maxFrames) {
        setDisplayText(text);
        setIsScrambling(false);
        return;
      }

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          // Gradually reveal the real text from left to right
          if (frame / maxFrames > index / text.length) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(scrambled);
      frame++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  // Scramble on mount if enabled
  useEffect(() => {
    if (scrambleOnMount) {
      setIsScrambling(true);
      scramble();
    }
  }, []);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      setIsScrambling(true);
      scramble();
    }
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ 
        display: 'inline-block',
        cursor: scrambleOnHover ? 'pointer' : 'default'
      }}
    >
      {displayText}
    </span>
  );
}
