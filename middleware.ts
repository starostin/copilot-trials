// Middleware disabled for demo purposes
// To enable Clerk authentication, uncomment the code below and configure environment variables

import { NextResponse } from "next/server";

// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

export function middleware() {
  // No-op middleware - pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
