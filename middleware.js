import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(path);
  
  // Rutas del dashboard que requieren autenticación
  const dashboardRoutes = ['/dashboard', '/cobrar', '/users', '/faq', '/contact'];
  const isDashboardRoute = dashboardRoutes.some(route => path.startsWith(route));
  
  // Verificar sesión (en producción usar JWT o sesión real)
  const hasSession = request.cookies.get('session')?.value;
  
  // Proteger rutas del dashboard - solo si no hay sesión
  if (isDashboardRoute && !hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Solo redirigir desde login (/) al dashboard si hay sesión
  // Permitir acceso a register y forgot-password aunque haya sesión
  if (hasSession && path === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ]
};