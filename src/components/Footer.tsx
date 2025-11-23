'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Newsletter from './Newsletter';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [mouseX, setMouseX] = useState(0);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const title = "MAVTECH";

  // do not render footer on admin pages
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) {
    return null;
  }


  const [cursorX, setCursorX] = useState(0);

  const handleMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorX(e.clientX - rect.left);
  };

  const menuSections = {
    services: [
      { name: 'Web Development', href: '/services/web' },
      { name: 'Mobile Apps', href: '/services/mobile', badge: 'NEW' },
      { name: 'UI/UX Design', href: '/services/design' },
      { name: 'Digital Marketing', href: '/services/digital' },
    ],
    explore: [
      { name: 'MavTech Showcase', href: '/project' },
      { name: 'Blogs', href: '/blogs' },
      { name: 'News', href: '/news' },
    ],
    featured: {
      title: 'New Site is Live',
      cta: 'Check it out',
      href: '/contact',
    },
  };

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'GitHub', href: 'https://github.com' },
  ];

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const subTextClass = isDark ? 'text-gray-400' : 'text-gray-500';
  const hoverClass = isDark ? 'hover:text-gray-300' : 'hover:text-gray-600';
  const borderClass = isDark ? 'border-white/10' : 'border-gray-200';
  const newsletterBg = isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100';

  return (
    <footer className={`relative overflow-hidden pt-20 pb-0 transition-colors duration-500 ${bgClass}`}>
      <div className="container mx-auto px-6">

        {/* Theme Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${isDark ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
          {/* Column 1: Services */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 ${subTextClass}`}>
              Services
            </h3>
            <ul className="space-y-4">
              {menuSections.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-lg font-medium transition-colors ${textClass} ${hoverClass} flex items-center gap-2`}
                  >
                    {item.name}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-[#7c3aed] text-white rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 ${subTextClass}`}>
              Explore
            </h3>
            <ul className="space-y-4">
              {menuSections.explore.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-lg font-medium transition-colors ${textClass} ${hoverClass}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 ${subTextClass}`}>
              Follow Us
            </h3>
            <ul className="space-y-4">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg font-medium transition-colors ${textClass} ${hoverClass}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-6 w-full">
            <div className={`p-6 rounded-2xl w-full transition-colors duration-500 ${newsletterBg}`}>
              <Newsletter
                title="Stay Updated"
                description="Get the latest news and updates."
                source="Footer"
                placeholder="Your email"
                buttonText="Join"
                layout="col"
                theme={theme}
              />
            </div>

            <Link
              href="/contact"
              className={`
                inline-flex items-center gap-2
                px-6 py-3
                font-semibold rounded-full
                transition-colors
                self-start
                ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}
              `}
            >
              <span>Book us</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`relative border-t pt-8 ${borderClass}`}>
          <div className={`flex justify-between items-center mb-4 text-sm ${subTextClass}`}>
            <p>&copy; {new Date().getFullYear()} MavTech. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className={hoverClass}>Privacy Policy</Link>
              <Link href="/terms" className={hoverClass}>Terms of Service</Link>
            </div>
          </div>

          {/* 🌟 Neon Hover Text */}
          <h1
            className={`text-[15vw] pb-10 font-black tracking-tighter text-center select-none pointer-events-auto flex justify-center gap-[0.02em] leading-[0.8] ${textClass}`}
            onMouseMove={handleMove}
            onMouseLeave={() => setCursorX(0)}
          >
            {title.split("").map((char, index) => (
              <span
                key={index}
                ref={(el) => { charRefs.current[index] = el }}
                style={{
                  opacity:
                    charRefs.current[index] &&
                      charRefs.current[index]!.offsetLeft < cursorX
                      ? 1
                      : 0.1,

                  textShadow:
                    charRefs.current[index] &&
                      charRefs.current[index]!.offsetLeft < cursorX
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
