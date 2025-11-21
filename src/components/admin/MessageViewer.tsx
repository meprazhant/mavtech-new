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
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
                <p className="text-gray-500">Inbox from contact form</p>
            </div>

            <div className="flex gap-6 h-[calc(100vh-200px)]">
                {/* Message List */}
                <div className="w-1/3 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {messages.map((msg: any) => (
                            <div
                                key={msg._id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`
                  p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50
                  ${selectedMessage?._id === msg._id ? 'bg-blue-50 hover:bg-blue-50' : ''}
                  ${msg.status === 'unread' ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}
                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm ${msg.status === 'unread' ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                        {msg.name}
                                    </h4>
                                    <span className="text-xs text-gray-400">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
                                <p className="text-xs text-gray-400 truncate mt-1">{msg.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
                    {selectedMessage ? (
                        <div className="flex flex-col h-full">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedMessage.subject}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">{selectedMessage.name}</span>
                                            <span>&lt;{selectedMessage.email}&gt;</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {new Date(selectedMessage.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto bg-gray-50/50">
                                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                    {selectedMessage.content}
                                </p>
                            </div>
                            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
                                    Archive
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors">
                                    Reply via Email
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            Select a message to read
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
