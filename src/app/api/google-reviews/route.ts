import { NextRequest, NextResponse } from 'next/server';

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJlzPr_pwXDW4RXYc2FT3SaUc"; // Maoz Digital Place ID (correct format)

// Note: Google Places API doesn't return reviews for this business
// This indicates the business exists but reviews are not accessible via the public API
// This is common for newer businesses or those with limited Google My Business verification

export async function GET() {
  try {
    console.log('🔍 Google Reviews API called');
    console.log('📍 Place ID:', PLACE_ID);
    console.log('🔑 API Key available:', !!GOOGLE_PLACES_API_KEY);
    
    // If no API key is available, return no reviews message
    if (!GOOGLE_PLACES_API_KEY) {
      console.log('❌ No Google Places API key found');
      return NextResponse.json({
        success: false,
        error: 'Google Places API key not configured',
        message: 'Cannot fetch reviews without API configuration'
      });
    }

    // Try to fetch from Google Places API with extended fields
    console.log('🌐 Calling Google Places API...');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews,business_status,types,formatted_address&key=${GOOGLE_PLACES_API_KEY}`;
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
        success: false,
        error: `Google Places API error: ${data.status}`,
        api_error: data.status,
        api_error_message: data.error_message || 'Unknown error'
      });
    }

    const result = data.result;
    console.log('✅ Successfully got data from Google Places API');
    console.log('⭐ Rating:', result.rating);
    console.log('📊 Total ratings:', result.user_ratings_total);
    console.log('💬 Reviews count:', result.reviews ? result.reviews.length : 0);

    // Check if we actually got reviews data
    if (!result.rating && !result.reviews) {
      console.log('⚠️ No reviews data from Places API, trying alternative approach...');
      
      // Try alternative API call with different parameters
      try {
        const altApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=he&key=${GOOGLE_PLACES_API_KEY}`;
        console.log('🔄 Trying alternative API call with Hebrew language...');
        
        const altResponse = await fetch(altApiUrl);
        const altData = await altResponse.json();
        
        if (altData.status === 'OK' && altData.result && (altData.result.rating || altData.result.reviews)) {
          console.log('✅ Got data from alternative API call!');
          return NextResponse.json({
            success: true,
            placeDetails: {
              rating: altData.result.rating || 0,
              user_ratings_total: altData.result.user_ratings_total || 0,
            },
            reviews: altData.result.reviews || [],
            source: 'google_api_alt'
          });
        }
      } catch (altError) {
        console.log('❌ Alternative API call also failed:', altError);
      }
      
      console.log('⚠️ No reviews data available from any Google API method');
      return NextResponse.json({
        success: false,
        error: 'No reviews available',
        message: 'Business exists but reviews are not accessible via Google Places API. This is common for newer businesses or those with limited verification.',
        business_name: result.name || 'מעוז לוסטיג - מומחה שיווק דיגיטלי לחנויות איקומרס',
        business_address: result.formatted_address,
        business_status: result.business_status,
        business_types: result.types
      });
    }

    return NextResponse.json({
      success: true,
      placeDetails: {
        rating: result.rating || 0,
        user_ratings_total: result.user_ratings_total || 0,
      },
      reviews: result.reviews || [],
      source: 'google_api'
    });

  } catch (error) {
    console.error('❌ Error fetching Google reviews:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch reviews',
      error_message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
