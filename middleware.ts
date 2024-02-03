import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { EdgeIntegrityChecker } from "./utils/AES-Cipher";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  matcher: ["/coursefinder", "/watch"],
};
export const middleware = async (req: NextRequest) => {
  console.log("middleware");
  const cookieStore = req.cookies;
  const enMsg = cookieStore.get("csrf_cookie_name")?.value;
  const userTag = cookieStore.get("PHPSESSID")?.value;
  if (enMsg && userTag) {
    const authenticated = await EdgeIntegrityChecker({
      EncryptedText: enMsg,
      Tag: userTag,
    });
    if (authenticated) return NextResponse.rewrite(new URL(req.nextUrl));
  }
  cookieStore.clear();
  return NextResponse.redirect(new URL("/login?error=4", req.url));
};
