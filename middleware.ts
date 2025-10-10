import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/contact?login-required=true', req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: '/dashboard/:path*' };
