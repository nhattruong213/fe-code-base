import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  const isAuthPath = req.nextUrl.pathname.startsWith('/auth');

  if (accessToken && isAuthPath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!accessToken && !isAuthPath) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (accessToken) {
    req.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/product/list', '/auth/:path*'],
};
