'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Project {
    _id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    gallery: string[];
    tags: string[];
    category: string;
    location: string;
    duration: string;
    createdAt: string;
}

export default function ProjectDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const data = await res.json();
                if (data.success) {
                    setProject(data.data);
                } else {
                    router.push('/404');
                }
            } catch (error) {
                console.error('Failed to fetch project:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <article className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        {/* Date & Category */}
                        <div className="flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">
                            <span>{new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span className="w-1 h-1 bg-gray-700 rounded-full" />
                            <span className="text-white">{project.category}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                            {project.title}
                        </h1>

                        {/* Short Description */}
                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-serif italic">
                            {project.description}
                        </p>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10 max-w-lg mx-auto text-left md:text-center">
                            <div>
                                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location</span>
                                <span className="font-bold text-gray-200">{project.location}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Duration</span>
                                <span className="font-bold text-gray-200">{project.duration}</span>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tags</span>
                                <div className="flex flex-wrap gap-1 md:justify-center">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="text-sm font-medium text-gray-400">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-16 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="prose prose-lg prose-invert max-w-none mb-20 first-letter:text-7xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left"
                        dangerouslySetInnerHTML={{ __html: project.content || '' }}
                    />

                    {/* Dynamic Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="space-y-12 pt-12 border-t border-white/10">
                            <div className="text-center">
                                <h3 className="text-3xl font-black tracking-tight mb-2">Project Gallery</h3>
                                <p className="text-gray-500">Visual highlights from the development process</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.gallery.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`relative rounded-2xl overflow-hidden shadow-lg border border-white/10 ${i % 3 === 0 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Gallery ${i + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </div>
    );
}
