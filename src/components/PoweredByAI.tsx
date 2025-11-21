'use client';

import { useState } from 'react';

interface TalentCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  technologies?: string[];
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const talents: TalentCard[] = [
  {
    id: 1,
    title: 'App Development',
    description: 'Building powerful mobile applications for iOS and Android with cutting-edge technologies.',
    icon: '📱',
    color: 'from-blue-500 to-cyan-500',
    technologies: ['React Native', 'Flutter', 'Swift'],
    position: 'top-left',
  },
  {
    id: 2,
    title: 'Website Development',
    description: 'Creating stunning, responsive websites that deliver exceptional user experiences.',
    icon: '💻',
    color: 'from-purple-500 to-pink-500',
    technologies: ['Next.js', 'React', 'Node.js'],
    position: 'top-center',
  },
  {
    id: 3,
    title: 'Graphics Designing',
    description: 'Crafting beautiful visual designs that capture attention and communicate your brand.',
    icon: '🎨',
    color: 'from-orange-500 to-red-500',
    technologies: ['Figma', 'Photoshop', 'Illustrator'],
    position: 'top-right',
  },
  {
    id: 4,
    title: 'Digital Marketing',
    description: 'Driving growth through strategic digital marketing campaigns and SEO optimization.',
    icon: '📊',
    color: 'from-green-500 to-emerald-500',
    technologies: ['SEO', 'Social Media', 'Analytics'],
    position: 'bottom-left',
  },
  {
    id: 5,
    title: 'Game Development',
    description: 'Developing immersive gaming experiences with stunning graphics and engaging gameplay.',
    icon: '🎮',
    color: 'from-indigo-500 to-purple-500',
    technologies: ['Unity', 'Unreal Engine', 'C#'],
    position: 'bottom-center',
  },
  {
    id: 6,
    title: '3D Designing',
    description: 'Creating photorealistic 3D models and animations for products, architecture, and more.',
    icon: '🎭',
    color: 'from-pink-500 to-rose-500',
    technologies: ['Blender', 'Maya', '3ds Max'],
    position: 'bottom-right',
  },
];

export default function PoweredByAI() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
      
      {/* Header */}
      <div className="relative z-10 text-center mb-20">
        <div className="inline-block px-4 py-2 rounded-full border-2 border-green-500 mb-6">
          <span className="text-green-400 font-semibold text-sm">Our Expertise</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
          Talent <span className="italic font-serif bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">We Have</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto px-6">
          From mobile apps to 3D designs, our talented team delivers exceptional results
          across all digital platforms with creativity and technical excellence.
        </p>
      </div>

      {/* Feature Cards Grid with Central Orb */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="relative min-h-[800px]">
          {/* Connecting Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Lines from cards to center */}
            {talents.map((talent) => {
              const isHovered = hoveredCard === talent.id;
              return (
                <line
                  key={talent.id}
                  x1="50%"
                  y1="50%"
                  x2={
                    talent.position.includes('left') ? '20%' :
                    talent.position.includes('right') ? '80%' : '50%'
                  }
                  y2={talent.position.includes('top') ? '15%' : '85%'}
                  stroke="url(#lineGradient)"
                  strokeWidth={isHovered ? "3" : "1.5"}
                  strokeDasharray="5,5"
                  className="transition-all duration-300"
                  opacity={isHovered ? 1 : 0.4}
                />
              );
            })}
          </svg>

          {/* Central Logo Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 10 }}>
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-3xl animate-pulse" style={{ width: '200px', height: '200px', margin: '-50px' }} />
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-2xl animate-pulse" style={{ width: '160px', height: '160px', margin: '-30px', animationDelay: '0.5s' }} />
              
              {/* Main orb */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">MT</span>
                  </div>
                </div>
              </div>

              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full -translate-x-1/2" />
              </div>
            </div>
          </div>

          {/* Talent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative" style={{ zIndex: 5 }}>
            {talents.map((talent, index) => (
              <div
                key={talent.id}
                className={`
                  ${index < 3 ? 'mb-[400px]' : ''}
                  transform transition-all duration-300
                  ${hoveredCard === talent.id ? 'scale-105' : 'scale-100'}
                `}
                onMouseEnter={() => setHoveredCard(talent.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 shadow-xl hover:shadow-purple-500/20">
                  {/* Card Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${talent.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {talent.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {talent.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {talent.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {talent.technologies && (
                    <div className="space-y-2">
                      <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">Technologies</p>
                      {talent.technologies.map((tech, idx) => (
                        <div
                          key={idx}
                          className="bg-purple-900/50 rounded-lg px-4 py-2 border border-purple-500/20 flex items-center gap-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${talent.color}`} />
                          <span className="text-white text-sm font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
