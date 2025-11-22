'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

interface Client {
    _id: string;
    name: string;
    link?: string;
    mainImage?: string;
    logoImage?: string;
    description?: string;
}

export default function ClientManager() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        mainImage: '',
        logoImage: '',
        description: ''
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/clients');
            if (res.ok) {
                const data = await res.json();
                setClients(data);
            }
        } catch (error) {
            console.error('Failed to fetch clients', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: '', link: '', mainImage: '', logoImage: '', description: '' });
                fetchClients();
            }
        } catch (error) {
            console.error('Failed to create client', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this client?')) return;

        try {
            const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchClients();
            }
        } catch (error) {
            console.error('Failed to delete client', error);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Client Management</h2>
                    <p className="text-gray-500 mt-2">Manage brand collaborations and partnerships</p>
                </div>
            </div>

            {/* Add Client Form */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 mb-12">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    Add New Client
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Client Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                placeholder="e.g. Nike"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Website Link</label>
                            <input
                                type="url"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUpload
                            label="Main Image"
                            value={formData.mainImage}
                            onChange={(url) => setFormData({ ...formData, mainImage: url })}
                        />
                        <ImageUpload
                            label="Logo Image"
                            value={formData.logoImage}
                            onChange={(url) => setFormData({ ...formData, logoImage: url })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all resize-none"
                            rows={3}
                            placeholder="Brief description of the collaboration..."
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Client'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Client List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Existing Clients</h3>
                    <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full">{clients.length} Total</span>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading clients...</p>
                    </div>
                ) : clients.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <p className="text-lg font-medium text-gray-900 mb-1">No clients found</p>
                        <p>Add your first client using the form above.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {clients.map((client) => (
                            <div key={client._id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                                        {client.logoImage ? (
                                            <img src={client.logoImage} alt={client.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-black text-gray-300">{client.name[0]}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{client.name}</h4>
                                        {client.link && (
                                            <a href={client.link} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                {client.link.replace(/^https?:\/\//, '')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(client._id)}
                                    className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                    title="Delete Client"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
