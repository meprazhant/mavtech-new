import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Newsletter from '@/models/Newsletter';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        const subscriber = await Newsletter.findOne({ email });

        if (!subscriber) {
            // For privacy, we can still say success, or say "Email not found".
            // Let's say "Email not found" for clarity in this context, or just handle it gracefully.
            // If we want to be strict, we return 404. But often for unsubscribe, if it's not there, it's effectively unsubscribed.
            // Let's return a specific message so the UI can decide.
            return NextResponse.json(
                { success: false, error: 'Email not found in our subscription list.' },
                { status: 404 }
            );
        }

        subscriber.status = 'unsubscribed';
        await subscriber.save();

        return NextResponse.json({ success: true, message: 'Successfully unsubscribed.' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
