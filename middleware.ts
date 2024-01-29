import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  matcher: [
    // "/coursefinder",
  ],
};
export const middleware = async (req: NextRequest) => {
  console.log("middleware");
  // if (req.nextUrl.pathname.includes("/api/"))
  return NextResponse.redirect(new URL("/", req.url));
};
