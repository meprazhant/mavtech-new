'use client';

import { SessionProvider } from 'next-auth/react';
import { SettingsProvider } from '@/contexts/SettingsContext';
import SettingsModal from './SettingsModal';
import NextTopLoader from 'nextjs-toploader';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <SettingsProvider>
                <NextTopLoader />
                {children}
                <SettingsModal />
            </SettingsProvider>
        </SessionProvider>
    );
}
