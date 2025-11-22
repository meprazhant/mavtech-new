'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Subscriber {
    _id: string;
    email: string;
    status: string;
    source: string;
    createdAt: string;
}

interface Template {
    _id: string;
    name: string;
    html: string;
    isDefault: boolean;
}

export default function NoticeSender() {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sendOption, setSendOption] = useState<'single' | 'subscribers'>('single');
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);

    // Template State
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [newTemplateData, setNewTemplateData] = useState({ name: '', html: '<div style="padding: 20px; font-family: sans-serif;">\n  <h1>MavTech Update</h1>\n  <hr />\n  {{CONTENT}}\n  <hr />\n  <p style="font-size: 12px; color: #888;">© 2025 MavTech</p>\n</div>' });

    const [formData, setFormData] = useState({
        subject: '',
        content: '',
        singleRecipient: '',
    });

    useEffect(() => {
        fetchNotices();
        fetchTemplates();
    }, []);

    useEffect(() => {
        if (sendOption === 'subscribers') {
            fetchSubscribers();
        }
    }, [sendOption]);

    const fetchNotices = async () => {
        try {
            const res = await fetch('/api/notices');
            const data = await res.json();
            if (data.success) {
                setNotices(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch notices:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubscribers = async () => {
        setIsLoadingSubscribers(true);
        try {
            const res = await fetch('/api/newsletter');
            const data = await res.json();
            if (data.success) {
                setSubscribers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch subscribers:', error);
        } finally {
            setIsLoadingSubscribers(false);
        }
    };

    const fetchTemplates = async () => {
        try {
            const res = await fetch('/api/templates');
            const data = await res.json();
            if (data.success) {
                setTemplates(data.data);
                // Auto-select default or first template if available
                if (data.data.length > 0 && !selectedTemplate) {
                    setSelectedTemplate(data.data.find((t: Template) => t.isDefault) || data.data[0]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch templates:', error);
        }
    };

    const handleCreateTemplate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTemplateData),
            });
            const data = await res.json();
            if (data.success) {
                setTemplates([data.data, ...templates]);
                setSelectedTemplate(data.data);
                setIsTemplateModalOpen(false);
                setNewTemplateData({ name: '', html: newTemplateData.html }); // Reset name but keep HTML structure
            }
        } catch (error) {
            console.error('Failed to create template:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let recipients: string[] = [];
            let audience = '';

            if (sendOption === 'single') {
                if (!formData.singleRecipient) {
                    alert('Please enter a recipient email');
                    return;
                }
                recipients = [formData.singleRecipient];
                audience = 'Single Recipient';
            } else {
                if (subscribers.length === 0) {
                    alert('No subscribers to send to');
                    return;
                }
                recipients = subscribers.map(s => s.email);
                audience = `Newsletter Subscribers (${subscribers.length})`;
            }

            // Wrap content with template if selected
            let finalContent = formData.content;
            if (selectedTemplate) {
                finalContent = selectedTemplate.html.replace('{{CONTENT}}', formData.content.replace(/\n/g, '<br/>'));
            }

            const res = await fetch('/api/notices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: formData.subject,
                    content: finalContent, // Send the templated HTML
                    audience,
                    recipients,
                    status: 'sent',
                }),
            });

            if (res.ok) {
                setFormData({ subject: '', content: '', singleRecipient: '' });
                fetchNotices();
                alert('Notice sent successfully!');
            }
        } catch (error) {
            console.error('Failed to send notice:', error);
        }
    };

    return (
        <div className="p-8 flex gap-8 h-full max-w-7xl mx-auto">
            {/* Compose Section */}
            <div className="flex-1">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Send Notice</h2>
                    <p className="text-gray-500 mt-2">Email marketing and announcements</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xl shadow-gray-100/50">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Option Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setSendOption('single')}
                                className={`p-6 rounded-xl border-2 text-left transition-all ${sendOption === 'single'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-100 hover:border-gray-200'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${sendOption === 'single' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900">Single Recipient</h3>
                                <p className="text-sm text-gray-500 mt-1">Send to a specific person</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSendOption('subscribers')}
                                className={`p-6 rounded-xl border-2 text-left transition-all ${sendOption === 'subscribers'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-100 hover:border-gray-200'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${sendOption === 'subscribers' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900">Newsletter Subscribers</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {isLoadingSubscribers ? 'Loading...' : `${subscribers.length} Active Subscribers`}
                                </p>
                            </button>
                        </div>

                        {/* Template Selection */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Template</label>
                                <button
                                    type="button"
                                    onClick={() => setIsTemplateModalOpen(true)}
                                    className="text-xs font-bold text-black hover:underline"
                                >
                                    + Create New
                                </button>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                {templates.map(template => (
                                    <button
                                        key={template._id}
                                        type="button"
                                        onClick={() => setSelectedTemplate(template)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedTemplate?._id === template._id
                                                ? 'bg-black text-white shadow-md'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {template.name}
                                    </button>
                                ))}
                                {templates.length === 0 && (
                                    <span className="text-sm text-gray-400 italic">No templates found. Create one to get started.</span>
                                )}
                            </div>
                        </div>

                        {/* Dynamic Input Fields */}
                        <AnimatePresence mode="wait">
                            {sendOption === 'single' ? (
                                <motion.div
                                    key="single"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recipient Email</label>
                                    <input
                                        type="email"
                                        required={sendOption === 'single'}
                                        value={formData.singleRecipient}
                                        onChange={(e) => setFormData({ ...formData, singleRecipient: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="subscribers"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                                >
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">Subscriber List</h4>
                                    <div className="max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                        {subscribers.map((sub) => (
                                            <div key={sub._id} className="flex justify-between items-center text-sm p-2 bg-white rounded-lg border border-gray-100">
                                                <span className="text-gray-600">{sub.email}</span>
                                                <span className="text-xs text-gray-400">{new Date(sub.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        ))}
                                        {subscribers.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">No active subscribers found.</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Common Fields */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subject Line</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                placeholder="e.g., New Feature Announcement"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Content</label>
                            <textarea
                                required
                                rows={8}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all font-mono"
                                placeholder="Write your message here..."
                            />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                            >
                                <span>Send Notice</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* History Section */}
            <div className="w-80 border-l border-gray-200 pl-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Recent Notices</h3>
                <div className="space-y-4">
                    {notices.map((notice: any) => (
                        <div key={notice._id} className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border ${notice.status === 'sent' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                    {notice.status}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-black transition-colors">{notice.subject}</h4>
                            <p className="text-xs text-gray-500 truncate mb-3">{notice.content}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-gray-50 pt-3">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {notice.audience}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Template Modal */}
            <AnimatePresence>
                {isTemplateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black text-gray-900">Create Template</h2>
                                <button onClick={() => setIsTemplateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleCreateTemplate} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Template Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newTemplateData.name}
                                        onChange={(e) => setNewTemplateData({ ...newTemplateData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all"
                                        placeholder="e.g., Holiday Theme"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">HTML Structure</label>
                                    <p className="text-xs text-gray-400 mb-2">Use <code className="bg-gray-100 px-1 rounded text-black">{'{{CONTENT}}'}</code> where the message body should go.</p>
                                    <textarea
                                        required
                                        rows={10}
                                        value={newTemplateData.html}
                                        onChange={(e) => setNewTemplateData({ ...newTemplateData, html: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white outline-none transition-all font-mono text-sm"
                                    />
                                </div>

                                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsTemplateModalOpen(false)}
                                        className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all"
                                    >
                                        Save Template
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
