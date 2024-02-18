import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value as string;
  if (!token) {
    return NextResponse.redirect(`${process.env.BASE_URL}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat"],
};
