import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";

export const config = {
  matcher: ["/((?!api|!about|_next/static|_next/image|favicon.ico).*)"],
};

const PUBLIC_URLS = ["/", "/about"];

export default auth((req) => {
  function publicUrl(url: string) {
    return PUBLIC_URLS.find((i) => i === url);
  }

  const reqUrl = new URL(req.url);
  // if (!req.auth && reqUrl?.pathname !== "/") {
  if (!req.auth && !publicUrl(reqUrl?.pathname)) {
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  }
});
