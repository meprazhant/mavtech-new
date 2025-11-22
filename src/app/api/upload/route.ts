import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'ImgBB API key not configured' },
                { status: 500 }
            );
        }

        const imgbbFormData = new FormData();
        imgbbFormData.append('image', file);
        imgbbFormData.append('key', apiKey);

        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: imgbbFormData,
        });

        const data = await response.json();

        if (!data.success) {
            return NextResponse.json(
                { error: data.error?.message || 'Failed to upload to ImgBB' },
                { status: response.status }
            );
        }

        return NextResponse.json({
            url: data.data.url,
            display_url: data.data.display_url,
            delete_url: data.data.delete_url
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
