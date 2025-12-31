import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession();
    
    return NextResponse.json({
      hasSession: !!session,
      email: session?.user?.email || 'No email',
      name: session?.user?.name || 'No name',
      fullSession: session,
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      hasSession: false,
    });
  }
}
