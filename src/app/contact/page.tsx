'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        content: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', content: '' });
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#050011] text-white selection:bg-[#CCFF00] selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                            LET'S START A <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-emerald-500">
                                CONVERSATION
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">
                            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-mono text-[#CCFF00] mb-2 uppercase tracking-wider">Email Us</h3>
                                <a href="mailto:hello@mavtech.com.np" className="text-2xl font-bold hover:text-gray-300 transition-colors">
                                    hello@mavtech.com.np
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-mono text-[#CCFF00] mb-2 uppercase tracking-wider">Visit Us</h3>
                                <p className="text-2xl font-bold">
                                    Bhadrapur, Jhapa, Nepal
                                </p>
                            </div>

                            <div className="pt-8">
                                <div className="flex gap-4">
                                    {['LinkedIn', 'Instagram', 'Twitter'].map((social) => (
                                        <a
                                            key={social}
                                            href="#"
                                            className="px-6 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-medium text-sm"
                                        >
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10"
                    >
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-20"
                            >
                                <div className="w-20 h-20 bg-[#CCFF00] rounded-full flex items-center justify-center mb-6 text-black">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                                <p className="text-gray-400 max-w-xs mx-auto mb-8">
                                    Thank you for reaching out. We'll be in touch with you shortly.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                        {errorMessage || 'Something went wrong. Please try again.'}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-4 bg-[#CCFF00] hover:bg-[#b3e600] text-black font-black text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {status === 'submitting' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        'SEND MESSAGE'
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
