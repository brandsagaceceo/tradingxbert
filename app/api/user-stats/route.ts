import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        analyses: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10 // Get last 10 analyses for stats
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate stats
    const totalAnalyses = user.analyses.length;
    const allAnalyses = await prisma.analysis.count({
      where: { userId: user.id }
    });

    const recentAnalyses = user.analyses.map(a => ({
      id: a.id,
      signal: a.signal,
      confidence: a.confidence,
      riskLevel: a.riskLevel,
      createdAt: a.createdAt
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalAnalyses: allAnalyses,
        recentAnalyses
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
