import { NextRequest, NextResponse } from 'next/server';

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJ-6F9NpamfDURdcnYg2iQCUA"; // Maoz Digital Place ID (converted format)

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
    console.log('🔍 Google Reviews API called');
    console.log('📍 Place ID:', PLACE_ID);
    console.log('🔑 API Key available:', !!GOOGLE_PLACES_API_KEY);
    
    // If no API key is available, return fallback data
    if (!GOOGLE_PLACES_API_KEY) {
      console.log('❌ No Google Places API key found, using fallback data');
      return NextResponse.json({
        success: true,
        placeDetails: {
          rating: FALLBACK_BUSINESS_INFO.rating,
          user_ratings_total: FALLBACK_BUSINESS_INFO.user_ratings_total,
        },
        reviews: FALLBACK_BUSINESS_INFO.reviews,
        source: 'fallback',
        message: 'No API key configured'
      });
    }

    // Try to fetch from Google Places API
    console.log('🌐 Calling Google Places API...');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_PLACES_API_KEY}`;
    console.log('📡 API URL (without key):', apiUrl.replace(GOOGLE_PLACES_API_KEY, 'HIDDEN_KEY'));
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📊 Response status:', response.status);

    if (!response.ok) {
      console.log('❌ Response not OK:', response.status, response.statusText);
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('📋 API Response status:', data.status);
    console.log('📋 API Response data keys:', Object.keys(data));

    if (data.status !== 'OK') {
      console.log(`❌ Google Places API status: ${data.status}, error: ${data.error_message || 'Unknown error'}`);
      return NextResponse.json({
        success: true,
        placeDetails: {
          rating: FALLBACK_BUSINESS_INFO.rating,
          user_ratings_total: FALLBACK_BUSINESS_INFO.user_ratings_total,
        },
        reviews: FALLBACK_BUSINESS_INFO.reviews,
        source: 'fallback',
        api_error: data.status,
        api_error_message: data.error_message
      });
    }

    const result = data.result;
    console.log('✅ Successfully got data from Google Places API');
    console.log('⭐ Rating:', result.rating);
    console.log('📊 Total ratings:', result.user_ratings_total);
    console.log('💬 Reviews count:', result.reviews ? result.reviews.length : 0);

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
    console.error('❌ Error fetching Google reviews:', error);
    // Return fallback data instead of error
    return NextResponse.json({
      success: true,
      placeDetails: {
        rating: FALLBACK_BUSINESS_INFO.rating,
        user_ratings_total: FALLBACK_BUSINESS_INFO.user_ratings_total,
      },
      reviews: FALLBACK_BUSINESS_INFO.reviews,
      source: 'fallback',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
