#!/bin/bash

echo "Setting up Vercel environment variables..."

# Set the environment variables
vercel env add GOOGLE_PLACES_API_KEY production <<< "AIzaSyAVzB48kYABIRB5_OL8WI-UKFhgvzluXEM"
vercel env add GOOGLE_PLACE_ID production <<< "0x26c7a696d37aa1fb:0x409d90683dd8c9d5"
vercel env add NEXT_PUBLIC_GOOGLE_PLACE_ID production <<< "0x26c7a696d37aa1fb:0x409d90683dd8c9d5"

echo "Environment variables set successfully!"
echo "Redeploying the project..."

# Redeploy the project
vercel --prod

echo "Done! Check your Vercel dashboard for the deployment status."
