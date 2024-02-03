import { redirect } from "next/navigation";

import ellip from "elliptic";

const UserAuth = async (formdata: FormData) => {
  "use server";
  console.log(formdata);
  await fetch("/api/rdslogin", {
    body: formdata,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // redirect("/coursefinder");
};

export default UserAuth;
