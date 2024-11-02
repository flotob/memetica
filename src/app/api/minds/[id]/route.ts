import { NextResponse } from 'next/server';
import { getMind, getMindHistory, getLineage } from '@/lib/github';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mind = await getMind(params.id);
    if (!mind) {
      return NextResponse.json(
        { error: 'Mind not found' },
        { status: 404 }
      );
    }

    // Get additional information
    const [history, lineage] = await Promise.all([
      getMindHistory(params.id),
      getLineage(params.id),
    ]);

    return NextResponse.json({
      mind,
      history,
      lineage,
    });
  } catch (error) {
    console.error('Error in mind API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mind' },
      { status: 500 }
    );
  }
} 