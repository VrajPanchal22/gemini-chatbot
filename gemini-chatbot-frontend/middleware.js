import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = cookies(request.headers).get("token");
  if (!token) {
    return NextResponse.redirect(`${process.env.BASE_URL}/login`, request.url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat"],
};
