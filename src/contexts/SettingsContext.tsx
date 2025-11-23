'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
    show3DModel: boolean;
    toggleShow3DModel: () => void;
    isSettingsOpen: boolean;
    openSettings: () => void;
    closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [show3DModel, setShow3DModel] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        const storedSettings = localStorage.getItem('website-settings');
        if (storedSettings) {
            try {
                const parsed = JSON.parse(storedSettings);
                setShow3DModel(parsed.show3DModel ?? true);
            } catch (error) {
                console.error('Failed to parse settings:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever settings change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('website-settings', JSON.stringify({ show3DModel }));
        }
    }, [show3DModel, isLoaded]);

    const toggleShow3DModel = () => {
        setShow3DModel(prev => !prev);
    };

    const openSettings = () => setIsSettingsOpen(true);
    const closeSettings = () => setIsSettingsOpen(false);

    return (
        <SettingsContext.Provider
            value={{
                show3DModel,
                toggleShow3DModel,
                isSettingsOpen,
                openSettings,
                closeSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
