'use client';

import { useState, useEffect } from 'react';

export default function NoticeSender() {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        subject: '',
        content: '',
        audience: 'all',
        recipients: '', // Comma separated emails
    });

    useEffect(() => {
        fetchNotices();
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const recipientsArray = formData.recipients
                ? formData.recipients.split(',').map(email => email.trim())
                : [];

            const res = await fetch('/api/notices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    recipients: recipientsArray,
                    status: 'sent',
                }),
            });

            if (res.ok) {
                setFormData({ subject: '', content: '', audience: 'all', recipients: '' });
                fetchNotices();
                alert('Notice sent successfully!');
            }
        } catch (error) {
            console.error('Failed to send notice:', error);
        }
    };

    return (
        <div className="p-8 flex gap-8 h-full">
            {/* Compose Section */}
            <div className="flex-1">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Send Notice</h2>
                    <p className="text-gray-500">Email marketing and announcements</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                placeholder="e.g., New Feature Announcement"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
                                <select
                                    value={formData.audience}
                                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                >
                                    <option value="all">All Users</option>
                                    <option value="subscribers">Subscribers Only</option>
                                    <option value="custom">Custom List</option>
                                </select>
                            </div>
                        </div>

                        {formData.audience === 'custom' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients (comma separated)</label>
                                <textarea
                                    rows={2}
                                    value={formData.recipients}
                                    onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-mono text-sm"
                                    placeholder="john@example.com, jane@example.com"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                            <textarea
                                required
                                rows={10}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-mono"
                                placeholder="Write your message here..."
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Save Draft
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
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
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Recent Notices</h3>
                <div className="space-y-4">
                    {notices.map((notice: any) => (
                        <div key={notice._id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${notice.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {notice.status}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="font-medium text-gray-900 text-sm mb-1">{notice.subject}</h4>
                            <p className="text-xs text-gray-500 truncate">{notice.content}</p>
                            <div className="mt-2 text-xs text-gray-400">
                                To: {notice.audience}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
