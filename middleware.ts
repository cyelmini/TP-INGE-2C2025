import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for demo mode
  const demoMode = request.cookies.get('demo')?.value === '1'

  // Lista de rutas públicas que no requieren autenticación
  const publicRoutes = [
    '/',
    '/login',
    '/register-tenant',
    '/forgot-password',
    '/reset-password',
    '/accept-invitacion',
    '/admin-setup',
    '/user-setup',
    '/auth/set-password',
    '/contactenos',
    '/funcionalidades',
    '/api',
    '/_next',
    '/favicon.ico',
    '/demo'
  ]

  // Verificar si la ruta es pública
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Si estamos en modo demo, permitir acceso a todas las rutas protegidas
  if (demoMode && !isPublicRoute) {
    return NextResponse.next()
  }

  // Si es una ruta pública, permitir acceso
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Para rutas protegidas, el manejo de autenticación se hace en el lado del cliente
  // con los hooks useAuth y UserContext
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}