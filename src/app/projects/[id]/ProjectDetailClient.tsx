'use client';

import { motion } from 'framer-motion';

interface Project {
    _id: string;
    title: string;
    featuredImage: string;
    gallery: string[];
    shortDescription: string;
    longDescription: string;
    status: 'In Development' | 'Released' | 'Beta Released';
    tags: string[];
    category: string;
    location: string;
    duration: string;
    createdAt: string;
}

interface ProjectDetailClientProps {
    project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-black/10" data-theme="light">
            <main className="pt-32 pb-20 px-6">
                <article className="max-w-3xl mx-auto">
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
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-black">{project.category}</span>
                        </div>

                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-6">
                            <span className={`w-2 h-2 rounded-full ${project.status === 'Released' ? 'bg-green-500' :
                                    project.status === 'Beta Released' ? 'bg-yellow-500' :
                                        'bg-blue-500'
                                }`} />
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">{project.status}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none text-gray-900">
                            {project.title}
                        </h1>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100 max-w-lg mx-auto text-left md:text-center">
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</span>
                                <span className="font-bold text-gray-900">{project.location}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</span>
                                <span className="font-bold text-gray-900">{project.duration}</span>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tags</span>
                                <div className="flex flex-wrap gap-1 md:justify-center">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="text-sm font-medium text-gray-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Short Description */}
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed text-center max-w-2xl mx-auto font-serif italic mb-12">
                        "{project.shortDescription}"
                    </p>

                    {/* Feature Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-16 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100"
                    >
                        <img
                            src={project.featuredImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="prose prose-lg prose-gray max-w-none mb-20 first-letter:text-7xl first-letter:font-bold first-letter:text-black first-letter:mr-3 first-letter:float-left"
                        dangerouslySetInnerHTML={{ __html: project.longDescription || '' }}
                    />

                    {/* Dynamic Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="space-y-12 pt-12 border-t border-gray-100">
                            <div className="text-center">
                                <h3 className="text-3xl font-black tracking-tight mb-2 text-gray-900">Project Gallery</h3>
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
                                        className={`relative rounded-2xl overflow-hidden shadow-lg shadow-gray-100 border border-gray-100 ${i % 3 === 0 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'
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
        </div>
    );
}
