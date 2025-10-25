import { NextRequest, NextResponse } from 'next/server';

// Maoz Digital business information
const BUSINESS_INFO = {
  name: "Maoz digital",
  rating: 5.0,
  user_ratings_total: 1,
  reviews: [
    {
      author_name: "לקוח מרוצה",
      rating: 5,
      text: "שירות מעולה ומקצועי! הצוות מאוד יעיל ויצירתי. ממליץ בחום!",
      relative_time_description: "לפני זמן מה",
      time: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
      language: "he"
    }
  ]
};

export async function GET() {
  try {
    // Return the business information directly
    return NextResponse.json({
      success: true,
      placeDetails: {
        rating: BUSINESS_INFO.rating,
        user_ratings_total: BUSINESS_INFO.user_ratings_total,
      },
      reviews: BUSINESS_INFO.reviews
    });

  } catch (error) {
    console.error('Error fetching business reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch business reviews' 
      }, 
      { status: 500 }
    );
  }
}
