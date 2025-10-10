import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { pool } from '@/lib/db';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: NextRequest) {
  const { email, phone, type } = await req.json();

  try {
    if (!email && !phone) {
      return NextResponse.json({ success: false, message: 'Email or phone required' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await pool.query(
      'INSERT INTO verification_codes (code, email, phone, expires_at) VALUES ($1, $2, $3, $4) ON CONFLICT (email, phone) DO UPDATE SET code = $1, expires_at = $4',
      [code, email || null, phone || null, expiresAt]
    );

    if (type === 'sms' && phone) {
      await client.messages.create({
        body: `Your Clay Roofing NY login code: ${code}`,
        from: process.env.TWILIO_PHONE,
        to: phone,
      });
    }

    return NextResponse.json({ success: true, message: 'Code sent!' });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send code' }, { status: 500 });
  }
}
