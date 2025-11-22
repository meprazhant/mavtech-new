import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Client from '@/models/Client';
import { requireAuth } from '@/lib/auth-helpers';

export async function GET() {
    try {
        await dbConnect();
        const clients = await Client.find({}).sort({ createdAt: -1 });
        return NextResponse.json(clients);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth();

        await dbConnect();
        const body = await request.json();
        const client = await Client.create(body);
        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}
