import { NextRequest, NextResponse } from 'next/server';

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "0x26c7a696d37aa1fb:0x409d90683dd8c9d5"; // Maoz Digital Place ID

// Fallback business information (in case API fails)
const FALLBACK_BUSINESS_INFO = {
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
    // If no API key is available, return fallback data
    if (!GOOGLE_PLACES_API_KEY) {
      console.log('No Google Places API key found, using fallback data');
      return NextResponse.json({
        success: true,
        placeDetails: {
          rating: FALLBACK_BUSINESS_INFO.rating,
          user_ratings_total: FALLBACK_BUSINESS_INFO.user_ratings_total,
        },
        reviews: FALLBACK_BUSINESS_INFO.reviews,
        source: 'fallback'
      });
    }

    // Try to fetch from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_PLACES_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.log(`Google Places API status: ${data.status}, using fallback data`);
      return NextResponse.json({
        success: true,
        placeDetails: {
          rating: FALLBACK_BUSINESS_INFO.rating,
          user_ratings_total: FALLBACK_BUSINESS_INFO.user_ratings_total,
        },
        reviews: FALLBACK_BUSINESS_INFO.reviews,
        source: 'fallback'
      });
    }

    const result = data.result;

    return NextResponse.json({
      success: true,
      placeDetails: {
        rating: result.rating || FALLBACK_BUSINESS_INFO.rating,
        user_ratings_total: result.user_ratings_total || FALLBACK_BUSINESS_INFO.user_ratings_total,
      },
      reviews: result.reviews || FALLBACK_BUSINESS_INFO.reviews,
      source: 'google_api'
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    // Return fallback data instead of error
    return NextResponse.json({
      success: true,
      placeDetails: {
        rating: FALLBACK_BUSINESS_INFO.rating,
        user_ratings_total: FALLBACK_BUSINESS_INFO.user_ratings_total,
      },
      reviews: FALLBACK_BUSINESS_INFO.reviews,
      source: 'fallback'
    });
  }
}
