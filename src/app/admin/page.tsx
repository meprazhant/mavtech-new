'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProjectManager from '@/components/admin/ProjectManager';
import MessageViewer from '@/components/admin/MessageViewer';
import NoticeSender from '@/components/admin/NoticeSender';
import ClientManager from '@/components/admin/ClientManager';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Projects</h3>
                                <p className="text-4xl font-black text-gray-900">12</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Unread Messages</h3>
                                <p className="text-4xl font-black text-blue-600">5</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Notices Sent</h3>
                                <p className="text-4xl font-black text-purple-600">8</p>
                            </div>
                        </div>
                    </div>
                );
            case 'projects':
                return <ProjectManager />;
            case 'clients':
                return <ClientManager />;
            case 'messages':
                return <MessageViewer />;
            case 'notices':
                return <NoticeSender />;
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 overflow-y-auto h-screen">
                {renderContent()}
            </main>
        </div>
    );
}
