import { redirect } from "next/navigation";

import ellip from "elliptic";

const UserAuth = async (formdata: FormData) => {
  "use server";
  const ec = new ellip.ec("secp256k1");
  //console.log(formdata);
  console.log(process.env.private_key);

  redirect("/coursefinder");
};

export default function Login() {
  return (
    <main className="grid h-full grid-cols-1  place-items-center">
      <p
        key={Math.random()}
        className="flex w-11/12 justify-center rounded-3xl border-b-2 border-dashed border-[#00A9FF] pb-2 pt-5 text-center font-serif text-3xl font-extrabold text-[#00A9FF]"
      >
        <span
          key={Math.random()}
          className="m-0 w-11/12 animate-pulse rounded-md border-b-4 border-double border-[#89CFF3] p-0 pb-2"
        >
          Friendly Advisor
        </span>
      </p>
      <form
        className="mt-5 grid w-9/12 grid-cols-1 place-items-center rounded-md bg-[#89CFF3] pl-3 pr-3 pt-5 shadow-md shadow-[#9ddefffd] sm:w-6/12"
        action={UserAuth}
      >
        <div className="w-full p-2">
          <label
            htmlFor="s_id"
            className="pl-3 font-sans font-bold text-[#d7feff]"
          >
            Student Name
          </label>
          <input
            type="text"
            name="s_id"
            id="s_id"
            placeholder="First 7 digits"
            className="h-10 w-full rounded-3xl bg-gray-100 px-4 text-sm shadow-md shadow-[#CDF5FD] outline-none outline-offset-2 transition-all duration-1000 focus:rounded-lg focus:outline-double focus:outline-[#71faff] active:outline-double active:outline-[#A0E9FF]"
          />
        </div>
        <div className="w-full p-2">
          <label
            htmlFor="s_pwd"
            className="pl-3 font-sans font-bold text-[#d7feff]"
          >
            Student Password
          </label>
          <input
            type="password"
            name="s_pwd"
            id="s_pwd"
            placeholder="Enter RDS Password"
            className="h-10 w-full rounded-3xl bg-gray-100 px-4 text-sm shadow-md shadow-[#CDF5FD] outline-none outline-offset-2 transition-all duration-1000 focus:rounded-lg focus:outline-double focus:outline-[#71faff] active:outline-double active:outline-[#A0E9FF]"
          />
        </div>
        <div className="flex p-5 pb-10">
          <button
            type="submit"
            className="h-10 w-full rounded-3xl  bg-emerald-300 px-4 py-2 pl-10 pr-10 font-mono text-lg font-bold uppercase shadow-md shadow-emerald-200
					outline-none transition-all duration-300 hover:rounded-xl hover:bg-emerald-200 hover:text-cyan-500 hover:shadow-lg hover:shadow-emerald-500"
          >
            sign in
          </button>
        </div>
      </form>
    </main>
  );
}
