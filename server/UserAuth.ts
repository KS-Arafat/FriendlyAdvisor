"use server";
// npm pcakage
import { redirect } from "next/navigation";
import { load } from "cheerio";
import { cookies } from "next/headers";
import { writeFileSync } from "fs";

// custom
import AuthClass from "@/utils/AuthAPI";
import FilterImage from "@/utils/image-processing/filterImage";
import scanCaptcha from "@/utils/image-processing/segmentedOCR";
import { EncryptSession } from "@/utils/AES-Cipher";

// constants
const rootImagePath = "./server/temp";
const cookieStore = cookies();

// Fetch for get Captcha image
const fetchCaptcha = () =>
  fetch("https://rds3.northsouth.edu/index.php/captcha", {
    method: "get",
    headers: {
      Accept: "image/avif,image/webp,*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Sec-Fetch-Dest": "image",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "same-origin",
    },
    referrer: "https://rds3.northsouth.edu/index.php/common/login/preLogin",
    mode: "cors",
  });

const UserAuth = async (formdata: FormData) => {
  const user_id = formdata.get("s_id")?.toString(),
    user_pwd = formdata.get("s_pwd")?.toString();

  console.log(user_id, user_pwd);
  if (!user_id || !user_pwd || user_id.length != 7) redirect("/login?error=1");
  const userData = new AuthClass({
    u_id: user_id,
    pwd: user_pwd,
    csrf_cookie_name: "",
    phpSessionId: "",
  });

  //////// CAPTCHA DOWNLOADED
  const res = await fetchCaptcha();
  const imageBuffer = Buffer.from(await res.arrayBuffer());
  const imgPATHS = await FilterImage(imageBuffer, rootImagePath);

  ///////// CSRF TOKEN & PHPSESSION ASSIGNED
  const rdsCookies = res.headers.getSetCookie();
  userData.csrf_cookie_name = rdsCookies[1].split(";")[0].split("=")[1];
  userData.phpSessionId = rdsCookies[0].split(";")[0].split("=")[1];

  ////// PRELOGIN /////////
  const preFetchPage = await userData.preLoginFetch();
  // writeFileSync(rootImagePath + "/test.html", preFetchPage);
  const user_eid = load(preFetchPage)(`input[name="username"]`)
    .attr("value")
    ?.toString();

  if (!user_eid) redirect("/login?error=2");
  userData.enUID = user_eid;

  ////////// OCR CAPTCHA ///////////////////////////
  userData.captcha = await scanCaptcha(imgPATHS);

  ////////// LOGIN ///////////////////////////
  const loginPage = await userData.loginFetch();

  ///////// USERNAME EXTRACTION //////////////

  writeFileSync("./server/temp/login.html", loginPage);
  const $ = load(loginPage);
  let userName = $(".white").text();

  if (userName.length == 0) redirect("/login?error=3");
  // console.log($("#error_msg").text());

  ////////////// RDS COOKIES ENCRYPTION ///////////////////////
  const mySess = {
    csrf_cookie_name: userData.csrf_cookie_name,
    PHPSESSID: userData.phpSessionId,
    userName,
  };
  const session_tag = EncryptSession(JSON.stringify(mySess));

  ////////////// SETTING UP DUMMY BUT REAL COOKIES //////////////
  cookieStore.set("csrf_cookie_name", session_tag.EncryptedText, {
    secure: true,
    maxAge: 60 * 60 * 12, // 12 Hours
    sameSite: true,
    priority: "high",
  });
  cookieStore.set("PHPSESSID", session_tag.Tag, {
    secure: true,
    maxAge: 60 * 60 * 12, // 12 Hours
    sameSite: true,
    priority: "high",
  });

  redirect("/coursefinder");
};

export default UserAuth;
