import { NextResponse } from 'next/server';
import { getMinds } from '@/lib/github';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const model = searchParams.get('model');
    const search = searchParams.get('search');

    let minds = await getMinds();

    // Apply filters
    if (tag) {
      minds = minds.filter(mind => mind.metadata.tags.includes(tag));
    }
    if (model) {
      minds = minds.filter(mind => mind.model.name === model);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      minds = minds.filter(mind => 
        mind.name.toLowerCase().includes(searchLower) ||
        mind.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(minds);
  } catch (error) {
    console.error('Error in minds API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch minds' },
      { status: 500 }
    );
  }
} 