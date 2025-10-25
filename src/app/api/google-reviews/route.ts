import { NextResponse } from 'next/server';

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Multiple possible Place IDs extracted from https://maps.app.goo.gl/up9BSbr8ZhbbLtbe7
const POSSIBLE_PLACE_IDS = [
  "ChIJJsemltN6ofs",                     // Base64 encoded format
  "0x26c7a696d37aa1fb",                  // Original hex format
  "26c7a696d37aa1fb",                    // Hex without 0x
  "2794385260530016763",                 // Decimal format
  process.env.GOOGLE_PLACE_ID            // Environment variable (if set)
].filter(Boolean);

// We'll use POSSIBLE_PLACE_IDS directly instead of PLACE_ID

// Note: Google Places API doesn't return reviews for this business
// This indicates the business exists but reviews are not accessible via the public API
// This is common for newer businesses or those with limited Google My Business verification

// Function to try multiple Place IDs
async function tryPlaceId(placeId: string, apiKey: string): Promise<{data: {result: Record<string, unknown>, status: string}, placeId: string} | null> {
  console.log(`🌐 Trying Place ID: ${placeId}`);
  
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,business_status,types,formatted_address&key=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(`❌ Response not OK for ${placeId}:`, response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    console.log(`📋 API Response status for ${placeId}:`, data.status);

    if (data.status === 'OK' && data.result) {
      console.log(`✅ Success with Place ID: ${placeId}`);
      return { data, placeId };
    } else {
      console.log(`❌ Failed with Place ID ${placeId}:`, data.status, data.error_message || 'Unknown error');
      return null;
    }
  } catch (error) {
    console.log(`❌ Error with Place ID ${placeId}:`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export async function GET() {
  try {
    console.log('🔍 Google Reviews API called');
    console.log('📍 Trying Place IDs:', POSSIBLE_PLACE_IDS);
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

    // Try each Place ID until one works
    let successResult = null;
    for (const placeId of POSSIBLE_PLACE_IDS) {
      if (!placeId) continue;
      
      successResult = await tryPlaceId(placeId, GOOGLE_PLACES_API_KEY);
      if (successResult) {
        break;
      }
    }

    if (!successResult) {
      console.log('❌ All Place IDs failed');
      return NextResponse.json({
        success: false,
        error: 'No valid Place ID found',
        api_error: 'INVALID_REQUEST',
        api_error_message: 'None of the possible Place IDs returned valid results',
        tried_place_ids: POSSIBLE_PLACE_IDS
      });
    }

    const { data, placeId: workingPlaceId } = successResult;
    console.log('🎯 Working Place ID:', workingPlaceId);

    const result = data.result;
    console.log('✅ Successfully got data from Google Places API');
    console.log('⭐ Rating:', result.rating);
    console.log('📊 Total ratings:', result.user_ratings_total);
    console.log('💬 Reviews count:', Array.isArray(result.reviews) ? result.reviews.length : 0);

    // Check if we actually got reviews data
    if (!result.rating && !result.reviews) {
      console.log('⚠️ No reviews data from Places API, trying alternative approach...');
      
      // Try alternative API call with different parameters
      try {
        const altApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${workingPlaceId}&fields=reviews,rating,user_ratings_total&language=he&key=${GOOGLE_PLACES_API_KEY}`;
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
      
      console.log('⚠️ No reviews data available from Google API');
      
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
