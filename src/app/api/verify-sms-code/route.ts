import { NextRequest, NextResponse } from 'next/server';

// Store verification codes in memory (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Phone number and code are required' }, { status: 400 });
    }

    // Get stored verification data
    const storedData = verificationCodes.get(phone);
    
    if (!storedData) {
      return NextResponse.json({ error: 'No verification code found for this phone number' }, { status: 400 });
    }

    // Check if code is expired
    if (Date.now() > storedData.expires) {
      verificationCodes.delete(phone);
      return NextResponse.json({ error: 'Verification code has expired' }, { status: 400 });
    }

    // Check if code matches
    if (storedData.code !== code) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // Code is valid, remove it from storage
    verificationCodes.delete(phone);

    return NextResponse.json({ 
      success: true, 
      message: 'Phone number verified successfully' 
    });

  } catch (error) {
    console.error('Error verifying SMS code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' }, 
      { status: 500 }
    );
  }
}
