import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "app.session_token"; // must match COOKIE.name in server/src/lib/auth.ts
const PRESENCE_COOKIE = "ba-present";

/**
 * Route guard for protected frontend routes.
 * - In local dev, `app.session_token` may be readable on localhost.
 * - In production with split domains, we use the `ba-present` cookie as a
 *   frontend session hint that is set after successful Google sign-in.
 */
export default function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  if (sessionToken) {
    return NextResponse.next();
  }

  const baPresent = request.cookies.get(PRESENCE_COOKIE)?.value;
  if (baPresent === "1") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/dashboard", "/quiz/create"],
};
