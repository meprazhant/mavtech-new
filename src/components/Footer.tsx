'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [mouseX, setMouseX] = useState(0);
  const charRefs = useRef([]);



  const title = "MAVTECH";
const [cursorX, setCursorX] = useState(0);

const handleMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setCursorX(e.clientX - rect.left);
};

  const glow = `
    0 0 15px rgba(255, 255, 255, ${mouseX}),
    0 0 40px rgba(255, 255, 255, ${mouseX}),
    0 0 80px rgba(0, 150, 255, ${mouseX})
  `;

  const menuSections = {
    services: [
      { name: 'Web Development', href: '/services/web' },
      { name: 'Mobile Apps', href: '/services/mobile' },
      { name: 'UI/UX Design', href: '/services/design' },
      { name: 'Consulting', href: '/services/consulting' },
    ],
    explore: [
      { name: 'MavTech Showcase', href: '/showcase' },
      { name: 'Updates', href: '/updates' },
      { name: 'Pricing', href: '/pricing' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'GitHub', href: 'https://github.com' },
  ];

  return (
    <footer className="relative bg-white text-black overflow-hidden pt-20 pb-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
          {/* Column 1: Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {menuSections.services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Explore
            </h3>
            <ul className="space-y-4">
              {menuSections.explore.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Follow Us
            </h3>
            <ul className="space-y-4">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div className="flex flex-col items-start justify-start">
            <Link
              href="/contact"
              className="
                inline-flex items-center gap-2
                px-6 py-3
                bg-black text-white
                font-semibold rounded-full
                hover:bg-gray-800 transition-colors
              "
            >
              <span>Book us</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} MavTech. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-black">Terms of Service</Link>
            </div>
          </div>

          {/* 🌟 Neon Hover Text */}
         <h1
  className="text-[15vw] pb-10 font-black tracking-tighter text-center select-none pointer-events-auto flex justify-center gap-[0.02em] leading-[0.8]"
  onMouseMove={handleMove}
  onMouseLeave={() => setCursorX(0)}
>
  {title.split("").map((char, index) => (
    <span
      key={index}
      ref={(el) => (charRefs.current[index] = el)}
      style={{
        opacity:
          charRefs.current[index] &&
          charRefs.current[index].offsetLeft < cursorX
            ? 1
            : 0.1,

        textShadow:
          charRefs.current[index] &&
          charRefs.current[index].offsetLeft < cursorX
            ? "0 0 10px rgba(0,255,255,1), 0 0 25px rgba(0,150,255,1)"
            : "none",

        transition: "opacity 0.12s ease-out, text-shadow 0.12s ease-out",
      }}
    >
      {char}
    </span>
  ))}
</h1>

        </div>
      </div>
    </footer>
  );
}
