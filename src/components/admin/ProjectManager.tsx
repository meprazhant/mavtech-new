'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from './ImageUpload';

export default function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Wizard State
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        longDescription: '',
        featuredImage: '',
        gallery: [] as string[],
        tags: '',
        link: '',
        featured: false,
        category: 'Website',
        location: 'Remote',
        duration: '1 Month',
        bgColor: '#000000',
        textColor: '#ffffff',
        status: 'In Development',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        if (!formData.longDescription || !formData.shortDescription || !formData.title) return;
        try {
            const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim()),
                }),
            });

            if (res.ok) {
                closeModal();
                fetchProjects();
            }
        } catch (error) {
            console.error('Failed to save project:', error);
        }
    };

    const handleEdit = (project: any) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            shortDescription: project.shortDescription,
            longDescription: project.longDescription || '',
            featuredImage: project.featuredImage,
            gallery: project.gallery || [],
            tags: project.tags.join(', '),
            link: project.link || '',
            featured: project.featured,
            category: project.category,
            location: project.location,
            duration: project.duration,
            bgColor: project.bgColor,
            textColor: project.textColor,
            status: project.status,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchProjects();
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleGalleryUpload = (url: string) => {
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, url] }));
    };

    const removeGalleryImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setCurrentStep(1);
        setFormData({
            title: '',
            shortDescription: '',
            longDescription: '',
            featuredImage: '',
            gallery: [],
            tags: '',
            link: '',
            featured: false,
            category: 'Website',
            location: 'Remote',
            duration: '1 Month',
            bgColor: '#000000',
            textColor: '#ffffff',
            status: 'In Development',
        });
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    // Prevent accidental double-clicks on "Next" triggering "Submit"
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        if (currentStep === totalSteps) {
            setCanSubmit(false);
            const timer = setTimeout(() => setCanSubmit(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [currentStep]);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Projects</h2>
                    <p className="text-gray-500 mt-2">Manage your portfolio items</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Project
                </button>
            </div>

            {/* Project List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">All Projects</h3>
                    <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full">{projects.length} Total</span>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tags</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.map((project: any) => (
                            <tr key={project._id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shadow-sm border border-gray-200">
                                            <img src={project.featuredImage} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{project.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{project.shortDescription}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {project.tags.map((tag: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md border border-gray-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {project.status === 'Released' ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                            Released
                                        </span>
                                    ) : project.status === 'Beta Released' ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">
                                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                            Beta
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                            Dev
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg mr-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Project Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        {[1, 2, 3, 4].map(step => (
                                            <div
                                                key={step}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${step <= currentStep ? 'w-8 bg-black' : 'w-2 bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-xs font-bold text-gray-400 ml-2">Step {currentStep} of {totalSteps}</span>
                                    </div>
                                </div>
                                <button onClick={closeModal} className="text-gray-400 hover:text-black p-2 hover:bg-gray-100 rounded-full transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                                <div className="flex-1 overflow-y-auto px-1 py-2">
                                    {currentStep === 1 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <h4 className="text-lg font-bold text-gray-900">Essentials</h4>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                                    placeholder="Project Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                                                <div className="relative">
                                                    <select
                                                        required
                                                        value={formData.category}
                                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all appearance-none"
                                                    >
                                                        <option value="Website">Website</option>
                                                        <option value="Mobile App">Mobile App</option>
                                                        <option value="Digital Marketing">Digital Marketing</option>
                                                        <option value="Game 3D">Game 3D</option>
                                                        <option value="UI/UX Design">UI/UX Design</option>
                                                        <option value="Branding">Branding</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Short Description</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={formData.shortDescription}
                                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all resize-none"
                                                    placeholder="Brief summary..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</label>
                                                <input
                                                    type="text"
                                                    placeholder="React, Next.js"
                                                    value={formData.tags}
                                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <h4 className="text-lg font-bold text-gray-900">Project Details</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Duration</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.duration}
                                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                                                <div className="relative">
                                                    <select
                                                        required
                                                        value={formData.status}
                                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all appearance-none"
                                                    >
                                                        <option value="In Development">In Development</option>
                                                        <option value="Released">Released</option>
                                                        <option value="Beta Released">Beta Released</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Link</label>
                                                <input
                                                    type="url"
                                                    value={formData.link}
                                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <input
                                                    type="checkbox"
                                                    id="featured"
                                                    checked={formData.featured}
                                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black transition-all"
                                                />
                                                <label htmlFor="featured" className="text-sm font-medium text-gray-900 cursor-pointer select-none">Mark as Featured Project</label>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <h4 className="text-lg font-bold text-gray-900">Media</h4>
                                            <ImageUpload
                                                label="Feature Image"
                                                value={formData.featuredImage}
                                                onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                                            />
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Gallery Images</label>
                                                <div className="grid grid-cols-4 gap-2 mb-2">
                                                    {formData.gallery.map((url, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeGalleryImage(idx)}
                                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-all"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <div className="aspect-square">
                                                        <ImageUpload
                                                            label="+"
                                                            value=""
                                                            onChange={handleGalleryUpload}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 4 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <h4 className="text-lg font-bold text-gray-900">The Story</h4>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Content (HTML)</label>
                                                <textarea
                                                    rows={12}
                                                    value={formData.longDescription}
                                                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all font-mono text-sm"
                                                    placeholder="<p>Write your article here...</p>"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="flex justify-between pt-6 border-t border-gray-100 mt-6">
                                    <button
                                        type="button"
                                        onClick={currentStep === 1 ? closeModal : prevStep}
                                        className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        {currentStep === 1 ? 'Cancel' : 'Back'}
                                    </button>

                                    {currentStep < totalSteps ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all"
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={!canSubmit}
                                            className={`px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {editingId ? 'Update Project' : 'Create Project'}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
