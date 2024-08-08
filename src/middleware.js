import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { authConfig } from "./lib/auth.config";

const secret = process.env.NEXTAUTH_SECRET;

async function checkLogin(request) {
  const token = await getToken({ req: request, secret });
  return token ? token : null;
}

export async function middleware(request) {
  const token = await checkLogin(request);

  const isOnBlogPage = request.nextUrl.pathname.startsWith("/blog");
  const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (isOnBlogPage && !token) {
    return NextResponse.redirect(new URL(authConfig.pages.signIn, request.url));
  }

  if (isOnLoginPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
