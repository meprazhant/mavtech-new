import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Template from '@/models/Template';
import { requireAuth } from '@/lib/auth-helpers';

export async function GET() {
    try {
        await requireAuth();
        await dbConnect();
        const templates = await Template.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: templates }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAuth();
        await dbConnect();
        const body = await request.json();

        const template = await Template.create(body);

        return NextResponse.json({ success: true, data: template }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
