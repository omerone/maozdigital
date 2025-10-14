import { NextRequest, NextResponse } from 'next/server';

// Store verification codes in memory (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code with expiration (5 minutes)
    const expires = Date.now() + 5 * 60 * 1000;
    verificationCodes.set(phone, { code, expires });

    // In production, integrate with SMS service like:
    // - Twilio
    // - AWS SNS
    // - Israeli SMS providers (SMSGlobal, etc.)
    
    // For demo purposes, log the code to console
    console.log(`SMS Verification Code for ${phone}: ${code}`);

    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent successfully',
      // In development, return the code for testing
      code: process.env.NODE_ENV === 'development' ? code : undefined
    });

  } catch (error) {
    console.error('Error sending SMS verification:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' }, 
      { status: 500 }
    );
  }
}
