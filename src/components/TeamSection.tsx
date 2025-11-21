'use client';

import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Sanket Siwakoti',
    role: 'CEO',
    image: 'https://i.ibb.co/s3SFrR2/IMG-20240905-125811-620.jpg',
  },
  {
    id: 2,
    name: 'Prashant Kafle',
    role: 'Overall Lead | CTO',
    image: 'https://i.ibb.co/yV7Y7Wj/prashant.jpg',
  },
  {
    id: 3,
    name: 'Samir Kharel',
    role: 'Project Manager',
    image: 'https://i.ibb.co/8m7pzxW/quantum.jpg',
  },
  {
    id: 4,
    name: 'Nishant Kafle',
    role: 'Android Developer | Full Stack',
    image: 'https://i.ibb.co/DH88HVFG/89f9cd9eeec457500491d5c7a7b5804f-0.jpg',
  },
  {
    id: 5,
    name: 'Krishna Dahal',
    role: 'Lead Game Developer',
    image: 'https://i.ibb.co/FLyPKChy/image.png',
  },
  {
    id: 6,
    name: 'Suresh Rajbanshi',
    role: 'Cinematographer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ILC-g9MczjiJrGGPsZ7avQljFzI15tmuzBto_ichjlzZBVSxMqdhnmFUGVg2bV2tei6LjN1nS--K2EDXn0RmAuyp5qwBCK7JGvQgL8_Wmw&s=10',
  },
  {
    id: 7,
    name: 'Aditya Upreti',
    role: 'CEO (Chepex Every Occasion)',
    image: 'https://i.ibb.co/KjfP8Qjv/image.png',
  },
  {
    id: 8,
    name: 'Santosh Bhandari',
    role: 'Naam Matra Rakhdyaa',
    image: 'https://i.ibb.co/XXHzGQG/kaka.jpg',
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      {/* Main Container - Dark Card */}
      <div className="w-full max-w-7xl bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl relative">

        {/* Header Section */}
        <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/10">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter">
              EXPERIENCE<br />
              MEETS PASSION
            </h2>
          </div>

          <div className="flex items-start gap-4 max-w-xs">
            <p className="text-gray-400 text-sm leading-relaxed font-mono">
              Say hello to our amazing team members, working on web development, mobile development, Graphics Designing, Game development, DIgital marketing and more.
            </p>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Marquee Animation */}
        <div className="relative py-8 bg-[#ff66cc] overflow-hidden border-y border-black">
          <div className="flex whitespace-nowrap">
            <motion.div
              className="flex gap-8 items-center"
              animate={{ x: '-50%' }}
              transition={{
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8">
                  <span className="text-6xl md:text-8xl font-black text-black tracking-tighter">
                    People behind Mavtech
                  </span>
                  <span className="text-6xl md:text-8xl font-black text-black tracking-tighter opacity-30">
                    //
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="p-8 md:p-12 relative">

          {/* Central Technical Label */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#111] px-4 py-1 rounded-full border border-white/20">
              <span className="text-[10px] font-mono text-gray-400 tracking-[0.2em]">
                MAVTECH CORE TEAMS | {new Date().getFullYear()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative">
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-gray-800 overflow-hidden mb-6 grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500 ease-out">

                  {/* Dither/Noise Overlay */}
                  <div
                    className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                      backgroundSize: '4px 4px'
                    }}
                  />

                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover h-full w-full"
                  />

                  {/* Technical Markings */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/50" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/50" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#ff66cc]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-white text-xl font-bold uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-[#ff66cc] text-xs font-mono uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>

                {/* Crosshair between items (visual decoration) */}
                <div className="absolute -right-4 top-1/2 w-8 h-8 text-white/10 hidden lg:flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[1px] bg-current absolute" />
                  <div className="h-full w-[1px] bg-current absolute" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
