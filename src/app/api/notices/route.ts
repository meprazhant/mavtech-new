import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notice from '@/models/Notice';
import { requireAdmin } from '@/lib/auth-helpers';

export async function GET() {
  try {
    await requireAdmin();
    await dbConnect();
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notices });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();

    const body = await request.json();
    
    // If status is 'sent', set sentAt date
    if (body.status === 'sent') {
      body.sentAt = new Date();
    }

    const notice = await Notice.create(body);

    return NextResponse.json({ success: true, data: notice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
