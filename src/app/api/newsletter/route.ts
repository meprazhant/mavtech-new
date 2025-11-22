import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Newsletter from '@/models/Newsletter';
import { requireAuth } from '@/lib/auth-helpers';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { email, source } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email });

        if (existingSubscriber) {
            // If exists but unsubscribed, reactivate
            if (existingSubscriber.status === 'unsubscribed') {
                existingSubscriber.status = 'active';
                existingSubscriber.source = source || existingSubscriber.source;
                await existingSubscriber.save();
                return NextResponse.json({ success: true, data: existingSubscriber, message: 'Welcome back!' }, { status: 200 });
            }

            return NextResponse.json(
                { success: true, message: 'You are already subscribed!' },
                { status: 200 }
            );
        }

        const subscriber = await Newsletter.create({
            email,
            source: source || 'General',
        });

        return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
    } catch (error: any) {
        // Handle duplicate key error specifically if needed, though check above covers it
        if (error.code === 11000) {
            return NextResponse.json(
                { success: true, message: 'You are already subscribed!' },
                { status: 200 }
            );
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        await requireAuth();

        const subscribers = await Newsletter.find();

        return NextResponse.json({ success: true, data: subscribers }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

