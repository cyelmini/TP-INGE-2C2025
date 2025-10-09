import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Use the request URL origin or fallback to localhost:3000
  const origin = request.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Create response with redirect to /home
  const response = NextResponse.redirect(new URL('/home', origin))

  // Set demo cookie
  response.cookies.set('demo', '1', {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  })

  return response
}
