import { auth } from "@/auth";

export default auth((req) => {
  // if (!req.auth && req.nextUrl.pathname !== '/login') {
  //   const newUrl = new URL('/login', req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }

  const pathname = req.nextUrl.pathname;
  const isAuthenticated = req.auth;

  // const authApiRoutes = [
  //   '/api/auth/signup',
  //   '/api/auth/signin',
  //   '/api/auth/reset-password',
  // ];
  // const includeAuthApiRoutes = authApiRoutes.includes(pathname);

  // if (!isAuthenticated && pathname.startsWith('/api')) {
  //   if (!includeAuthApiRoutes) {
  //     return Response.json({ error: 'Unauthorized' }, { status: 401 });
  //   }
  // }

  if (isAuthenticated && pathname.startsWith("/auth")) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    "/",
  ],
};
