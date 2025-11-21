'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrambleText from './ScrambleText';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle theme switching based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            setIsDark(theme === 'dark');
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -80% 0px', // Trigger when section is near top
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('[data-theme]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const menuSections = {
    services: [
      { name: 'Web Development', href: '/services/web' },
      { name: 'Mobile Apps', href: '/services/mobile', badge: 'NEW' },
      { name: 'UI/UX Design', href: '/services/design' },
      { name: 'Consulting', href: '/services/consulting' },
    ],
    explore: [
      { name: 'MavTech Showcase', href: '/showcase' },
      { name: 'Updates', href: '/updates' },
      { name: 'Pricing', href: '/pricing' },
    ],
    featured: {
      title: 'We just hit 1400 Members!',
      cta: 'Join them',
      href: '/join',
    },
  };

  // Dynamic styles based on theme
  const navStyles = isDark
    ? {
        bg: 'bg-white/10',
        border: 'border-white/20',
        text: 'text-gray-100',
        hoverText: 'hover:text-white',
        logoText: 'text-gray-100',
        hamburger: 'bg-gray-100',
        // Expanded menu styles
        expandedBg: 'bg-black/90',
        expandedBorder: 'border-white/10',
        headingText: 'text-gray-300',
        menuLinkText: 'text-gray-100',
        menuLinkHover: 'hover:text-white',
        divider: 'border-white/10',
        socialIcon: 'text-white/60',
        socialIconHover: 'hover:text-white',
        featuredCardBg: 'bg-white/5',
        featuredCardBorder: 'border-white/10',
        featuredCardTitle: 'text-white',
        featuredBtnBg: 'bg-white',
        featuredBtnText: 'text-black',
        featuredBtnHover: 'hover:bg-white/90',
      }
    : {
        bg: 'bg-white/70 shadow-lg',
        border: 'border-black/10',
        text: 'text-gray-900',
        hoverText: 'hover:text-black',
        logoText: 'text-gray-900',
        hamburger: 'bg-gray-900',
        // Expanded menu styles
        expandedBg: 'bg-white/95',
        expandedBorder: 'border-black/10',
        headingText: 'text-gray-500',
        menuLinkText: 'text-gray-900',
        menuLinkHover: 'hover:text-black',
        divider: 'border-black/10',
        socialIcon: 'text-gray-400',
        socialIconHover: 'hover:text-black',
        featuredCardBg: 'bg-black/5',
        featuredCardBorder: 'border-black/10',
        featuredCardTitle: 'text-gray-900',
        featuredBtnBg: 'bg-black',
        featuredBtnText: 'text-white',
        featuredBtnHover: 'hover:bg-black/90',
      };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className={`mx-auto flex justify-center ${isMenuOpen ? 'px-2' : 'px-4 sm:px-6'}`}>
          <div
            className={`
              relative
              backdrop-blur-xl
              px-4 sm:px-6
              py-3
              transition-all duration-500 ease-in-out
              ${isMenuOpen ? `w-full max-w-7xl rounded-xl ${navStyles.expandedBg} ${navStyles.expandedBorder}` : `w-full max-w-[400px] rounded-full ${navStyles.bg} ${navStyles.border}`}
              ${!isMenuOpen && 'border'}
              ${isMenuOpen && 'border'}
            `}
            style={!isMenuOpen ? {
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            } : {}}
          >
            <div className="flex items-center justify-between">
              {/* Menu Button - Left Side */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  flex items-center gap-2
                  transition-colors duration-200
                  group
                  ${isMenuOpen ? navStyles.menuLinkText : `${navStyles.text} ${navStyles.hoverText}`}
                `}
                aria-label="Toggle menu"
              >
                {!isMenuOpen ? (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className={`w-4 h-0.5 rounded-full transition-all duration-300 ${navStyles.hamburger}`} />
                      <span className={`w-4 h-0.5 rounded-full transition-all duration-300 ${navStyles.hamburger}`} />
                      <span className={`w-4 h-0.5 rounded-full transition-all duration-300 ${navStyles.hamburger}`} />
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Menu</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-sm font-medium hidden sm:inline">Menu</span>
                  </>
                )}
              </button>

              {/* Logo - Center */}
              <Link
                href="/"
                className={`
                  absolute left-1/2 -translate-x-1/2
                  font-bold text-xl tracking-wider
                  transition-colors duration-200
                  ${isMenuOpen ? navStyles.menuLinkText : `${navStyles.logoText} ${navStyles.hoverText}`}
                `}
              >
                <ScrambleText text="MAVTECH" />
              </Link>

              {/* Auth Buttons - Right Side */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/contact"
                  className="
                    px-4 sm:px-5 py-2
                    bg-[#84cc16] hover:bg-[#65a30d]
                    text-white font-semibold text-sm
                    rounded-full
                    transition-all duration-200
                    hover:shadow-[0_0_20px_rgba(132,204,22,0.4)]
                  "
                >
                  Book us
                </Link>
              </div>
            </div>

            {/* Expanded Menu Content */}
            <div
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${isMenuOpen ? 'max-h-[500px] overflow-y-auto opacity-100 mt-6' : 'max-h-0 opacity-0'}
              `}
            >
              <div className={`pt-6 pb-4 border-t ${navStyles.divider}`}>
                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {/* Column 1: Our Services */}
                  <div>
                    <h3 className={`text-xs font-semibold tracking-wider uppercase mb-4 ${navStyles.headingText}`}>
                      Our Services
                    </h3>
                    <ul className="space-y-3">
                      {menuSections.services.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`
                              text-lg font-medium transition-colors duration-200 flex items-center gap-2
                              ${navStyles.menuLinkText} ${navStyles.menuLinkHover}
                            `}
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
                    <h3 className={`text-xs font-semibold tracking-wider uppercase mb-4 ${navStyles.headingText}`}>
                      Explore
                    </h3>
                    <ul className="space-y-3">
                      {menuSections.explore.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`
                              text-lg font-medium transition-colors duration-200
                              ${navStyles.menuLinkText} ${navStyles.menuLinkHover}
                            `}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 mt-6">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors duration-200 ${navStyles.socialIcon} ${navStyles.socialIconHover}`}
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors duration-200 ${navStyles.socialIcon} ${navStyles.socialIconHover}`}
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors duration-200 ${navStyles.socialIcon} ${navStyles.socialIconHover}`}
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Column 3: Featured */}
                  <div className="md:block hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className={`text-xs font-semibold tracking-wider uppercase ${navStyles.headingText}`}>
                        Featured
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-bold bg-[#7c3aed] text-white rounded">
                        MILESTONE
                      </span>
                    </div>
                    <div className={`rounded-xl p-6 border ${navStyles.featuredCardBg} ${navStyles.featuredCardBorder}`}>
                      <h4 className={`text-2xl font-bold mb-4 ${navStyles.featuredCardTitle}`}>
                        {menuSections.featured.title}
                      </h4>
                      <Link
                        href={menuSections.featured.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`
                          inline-block px-5 py-2.5
                          font-semibold text-sm
                          rounded-full
                          transition-all duration-200
                          ${navStyles.featuredBtnBg} ${navStyles.featuredBtnText} ${navStyles.featuredBtnHover}
                        `}
                      >
                        {menuSections.featured.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay - Only shows when menu is open, doesn't cover full page */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
          transition-opacity duration-500
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
