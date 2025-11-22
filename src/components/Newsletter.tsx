'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterProps {
    title?: string;
    description?: string;
    source?: string;
    placeholder?: string;
    buttonText?: string;
    layout?: 'row' | 'col';
    theme?: 'light' | 'dark';
}

export default function Newsletter({
    title = "Subscribe to our newsletter",
    description = "Stay updated with our latest news and releases.",
    source = "General",
    placeholder = "Enter your email",
    buttonText = "Subscribe",
    layout = 'row',
    theme = 'dark'
}: NewsletterProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(data.message || "Thanks for subscribing!");
                setEmail('');
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-black';
    const descColor = isDark ? 'text-gray-400' : 'text-gray-600';
    const inputBg = isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-gray-100 border-gray-200 text-black placeholder-gray-400';
    const buttonBg = isDark ? 'bg-[#CCFF00] text-black' : 'bg-black text-white';
    const buttonHover = isDark ? 'hover:bg-[#b3e600]' : 'hover:bg-gray-800';

    return (
        <div className="w-full">
            <div className="mb-4">
                <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{title}</h3>
                {description && <p className={`text-sm ${descColor}`}>{description}</p>}
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <div className={`flex ${layout === 'col' ? 'flex-col' : 'flex-col sm:flex-row'} gap-3`}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={placeholder}
                        disabled={status === 'loading' || status === 'success'}
                        className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all disabled:opacity-50 ${inputBg}`}
                        required
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className={`px-6 py-3 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap ${buttonBg} ${buttonHover}`}
                    >
                        {status === 'loading' ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className={`w-4 h-4 border-2 ${isDark ? 'border-black/30 border-t-black' : 'border-white/30 border-t-white'} rounded-full animate-spin`} />
                                Processing
                            </span>
                        ) : status === 'success' ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                Subscribed
                            </span>
                        ) : (
                            buttonText
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`absolute -bottom-10 left-0 text-sm font-medium ${status === 'error' ? 'text-red-400' : 'text-[#CCFF00]'
                                }`}
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
