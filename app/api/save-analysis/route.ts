import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      chartUrl,
      signal,
      confidence,
      riskLevel,
      trendSummary,
      patternSummary,
      keyLevels,
      styleNotes,
      teachingTips,
      emotionSummary,
      riskPlan,
    } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        chartUrl: chartUrl || null,
        signal,
        confidence,
        riskLevel,
        trendSummary,
        patternSummary,
        keyLevels,
        styleNotes,
        teachingTips,
        emotionSummary: emotionSummary || null,
        riskPlan: riskPlan || null,
      },
    });

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error('Error saving analysis:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
