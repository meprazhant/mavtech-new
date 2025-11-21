'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Project {
  _id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  image: string;
  bgColor: string;
  textColor: string;
}



export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stackProgress, setStackProgress] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (loading || projects.length === 0) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate progress for each project card
      const cardHeight = windowHeight * 0.8;
      const spacing = 100;

      const newProgress = projects.map((_, index) => {
        const cardStart = sectionTop + (index * spacing);
        const cardEnd = cardStart + cardHeight;
        const progress = Math.max(0, Math.min(1, (scrollY - cardStart + windowHeight) / (windowHeight + cardHeight)));
        return progress;
      });

      setStackProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, projects]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white  z-10 pb-20"
      style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        // marginTop: '-100vh',
      }}
    >
      {/* Section Header */}
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-2 rounded-full border-2 border-green-600 mb-4">
            <span className="text-green-600 font-semibold text-sm">Industry Wins</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
            Proven Success In<br />
            <span className="italic font-serif">Every Industry</span>
          </h2>
        </div>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative">
        {projects.map((project, index) => {
          const progress = stackProgress[index] || 0;
          const scale = 0.9 + (progress * 0.1);
          const translateY = (1 - progress) * 100;
          const opacity = Math.min(1, progress * 2);

          // Fade out cards as the final card covers them
          const finalCardProgress = stackProgress[projects.length] || 0;
          const fadeOutOpacity = finalCardProgress > 0.5 ? Math.max(0, 1 - (finalCardProgress - 0.5) * 2) : 1;

          return (
            <div
              key={project._id}
              className="sticky top-32 mb-8"
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity: opacity * fadeOutOpacity,
                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
              }}
            >
              <div className="max-w-6xl mx-auto px-6">
                <div className={`${project.bgColor || 'bg-gray-200'} rounded-3xl overflow-hidden shadow-2xl`}>
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    {/* Left Content */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className={`${project.textColor || 'text-gray-800'} italic font-serif text-lg`}>
                            {project.category}
                          </span>
                        </div>
                        <h3 className={`text-4xl md:text-5xl font-black ${project.textColor || 'text-gray-800'} mb-6 leading-tight`}>
                          {project.title}
                        </h3>
                        <div className="mb-8">
                          <p className={`${project.textColor || 'text-gray-800'} text-lg leading-relaxed opacity-80 line-clamp-2`}>
                            {project.description}
                          </p>
                          <button className={`${project.textColor || 'text-gray-800'} font-semibold hover:underline mt-2`}>
                            See more
                          </button>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className={`${project.textColor || 'text-gray-800'} text-sm font-semibold mb-1 opacity-60`}>
                            Location
                          </p>
                          <p className={`${project.textColor || 'text-gray-800'} text-xl font-bold`}>
                            {project.location}
                          </p>
                        </div>
                        <div>
                          <p className={`${project.textColor || 'text-gray-800'} text-sm font-semibold mb-1 opacity-60`}>
                            Project Duration
                          </p>
                          <p className={`${project.textColor || 'text-gray-800'} text-xl font-bold`}>
                            {project.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className="relative w-full h-[400px] rounded-2xl overflow-hidden"
                        style={{
                          background: project.bgColor
                            ? `linear-gradient(135deg, ${project.bgColor.replace('200', '300')} 0%, ${project.bgColor.replace('200', '400')} 100%)`
                            : 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
                        }}
                      >
                        {/* Vertical stripes pattern */}
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)',
                          }}
                        />

                        {/* Placeholder for project image */}
                        {/* Project Image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-[80%] h-[80%] bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Final "See All Projects" Card - Overlaps all stacks */}
        <div className="sticky top-32 z-50 mb-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-teal-100 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Left Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-block mb-4">
                      <span className="text-gray-800 italic font-serif text-lg">
                        Vehicle Maintenance Platform
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 leading-tight">
                      Simplifying Vehicle Care
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed mb-8 opacity-80">
                      Zantrik is an innovative vehicle maintenance app. We revamped it with a fresh design, gamification, and intuitive features to boost user engagement.
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-800 text-sm font-semibold mb-1 opacity-60">
                        Project Duration
                      </p>
                      <p className="text-gray-800 text-xl font-bold">
                        8 Weeks
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm font-semibold mb-1 opacity-60">
                        Work Scope
                      </p>
                      <p className="text-gray-800 text-xl font-bold">
                        Mobile App
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="relative w-full h-[400px] rounded-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
                    }}
                  >
                    {/* Vertical stripes pattern */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)',
                      }}
                    />

                    {/* Placeholder for project image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="w-64 h-48 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 font-semibold">Project Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* See All Projects Button - Inside the card */}
              <div className="flex justify-center pb-8">
                <button className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                  See All Projects
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
