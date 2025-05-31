import { clerkMiddleware , createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";

 const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/transactions(.*)",
  "/account(.*)",
]);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode:'LIVE',
    }),
    detectBot({
      mode: "LIVE",
      allow: ['CATEGORY:SEARCH_ENGINE',"GO_HTTP"],
    }),
  ],
});

const clerk = clerkMiddleware(async (auth,req) => { 
 const { userId } = await auth();

 if (!userId && isProtectedRoute(req)) {
  const { redirectToSignIn } = await auth();
  
  return redirectToSignIn();
  }
});

export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};