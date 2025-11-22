'use client';

import { useState, useCallback, useEffect } from 'react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label: string;
    className?: string;
}

export default function ImageUpload({ value, onChange, label, className = '' }: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(value);

    useEffect(() => {
        setPreview(value);
    }, [value]);

    const handleUpload = useCallback(async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                onChange(data.url);
                setPreview(data.url);
            } else {
                alert(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    }, [onChange]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    }, [handleUpload]);

    const onPaste = useCallback((e: React.ClipboardEvent) => {
        if (e.clipboardData.files && e.clipboardData.files[0]) {
            handleUpload(e.clipboardData.files[0]);
        }
    }, [handleUpload]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    }, [handleUpload]);

    return (
        <div className={className}>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {label}
            </label>

            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
                    relative w-full h-48 rounded-xl border-2 border-dashed transition-all overflow-hidden group
                    ${isDragging ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}
                    ${preview ? 'border-solid' : ''}
                `}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    disabled={isUploading}
                />

                {/* Paste Handler Overlay */}
                <div
                    className="absolute inset-0 z-10"
                    onPaste={onPaste}
                    tabIndex={0}
                />

                {isUploading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-30">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-2"></div>
                        <p className="text-sm font-medium text-gray-600">Uploading...</p>
                    </div>
                ) : preview ? (
                    <div className="relative w-full h-full">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                            <p className="text-white font-medium text-sm">Click or drop to replace</p>
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 32MB)</p>
                        <p className="text-[10px] text-gray-400 mt-2 bg-gray-50 px-2 py-1 rounded">
                            Tip: Paste image (Ctrl+V) directly
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
