import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo (in production, use a real database)
const ratings: Array<{
  id: string;
  name: string;
  phone: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}> = [];

// GET - Retrieve all ratings
export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      ratings: ratings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' }, 
      { status: 500 }
    );
  }
}

// POST - Add new rating
export async function POST(request: NextRequest) {
  try {
    const { name, phone, rating, comment } = await request.json();

    if (!name || !phone || !rating) {
      return NextResponse.json({ error: 'Name, phone, and rating are required' }, { status: 400 });
    }

    // Check if phone already exists
    const existingRating = ratings.find(r => r.phone === phone);
    if (existingRating) {
      return NextResponse.json({ error: 'Phone number already rated' }, { status: 409 });
    }

    // Create new rating
    const newRating = {
      id: Date.now().toString(),
      name,
      phone,
      rating: Number(rating),
      comment: comment || '',
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    ratings.push(newRating);

    return NextResponse.json({ 
      success: true, 
      message: 'Rating added successfully',
      rating: newRating
    });

  } catch (error) {
    console.error('Error adding rating:', error);
    return NextResponse.json(
      { error: 'Failed to add rating' }, 
      { status: 500 }
    );
  }
}
