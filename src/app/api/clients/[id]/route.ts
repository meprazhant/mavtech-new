import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Client from '@/models/Client';
import { requireAuth } from '@/lib/auth-helpers';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;
        const deletedClient = await Client.findByIdAndDelete(id);

        if (!deletedClient) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Client deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth();
        await dbConnect();
        const { id } = await params;
        const body = await request.json();
        const updatedClient = await Client.findByIdAndUpdate(id, body, { new: true });

        if (!updatedClient) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        return NextResponse.json(updatedClient);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
    }
}
