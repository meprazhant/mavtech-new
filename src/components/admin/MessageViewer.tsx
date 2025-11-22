'use client';

import { useState, useEffect } from 'react';

export default function MessageViewer() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/messages');
            const data = await res.json();
            if (data.success) {
                setMessages(data.data);
            }
            console.log(data)
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 h-full flex flex-col max-w-7xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Messages</h2>
                <p className="text-gray-500 mt-2">Inbox from contact form</p>
            </div>

            <div className="flex gap-6 h-[calc(100vh-200px)]">
                {/* Message List */}
                <div className="w-1/3 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-xl shadow-gray-100/50">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
                        {messages.map((msg: any) => (
                            <div
                                key={msg._id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`
                  p-5 cursor-pointer transition-all hover:bg-gray-50
                  ${selectedMessage?._id === msg._id ? 'bg-gray-50 border-l-4 border-l-black' : 'border-l-4 border-l-transparent'}
                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm ${msg.status === 'unread' ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                        {msg.name}
                                    </h4>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-900 font-medium truncate mb-1">{msg.subject}</p>
                                <p className="text-xs text-gray-500 truncate">{msg.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-xl shadow-gray-100/50">
                    {selectedMessage ? (
                        <div className="flex flex-col h-full">
                            <div className="p-8 border-b border-gray-100">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                                                {selectedMessage.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{selectedMessage.name}</div>
                                                <div className="text-sm text-gray-500">&lt;{selectedMessage.email}&gt;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                        {new Date(selectedMessage.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 flex-1 overflow-y-auto bg-gray-50/30">
                                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">
                                    {selectedMessage.content}
                                </p>
                            </div>
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                                <button className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-white hover:text-black rounded-xl border border-transparent hover:border-gray-200 transition-all shadow-sm hover:shadow">
                                    Archive
                                </button>
                                <button className="px-6 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-900 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                    Reply via Email
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="font-medium">Select a message to read</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
