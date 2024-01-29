import { Playfair } from "next/font/google";
import Link from "next/link";
const playfair = Playfair({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="grid h-full max-h-full min-h-full grid-cols-1 place-items-center">
      <p className="special-article px-4 pt-10 font-serif text-2xl font-bold uppercase mix-blend-difference sm:text-3xl">
        Make Advising Easy <br />
        &
        <br />
        Automated
      </p>
      <div
        className={`grid h-full grid-cols-1 place-items-center px-4 pt-8 text-center font-mono text-lg sm:text-xl ${playfair.className}`}
      >
        <p className="translate-x-16 rounded-xl bg-gradient-to-tr from-red-400 to-rose-100 p-5 text-lg capitalize bg-blend-soft-light shadow-xl shadow-transparent transition-all duration-500 ease-linear hover:to-rose-50 hover:shadow-rose-200 sm:text-2xl">
          web automation
        </p>
        <p className="-top-6 -translate-x-16 -translate-y-5 rounded-xl bg-gradient-to-bl from-blue-400 to-sky-100 p-5 text-lg capitalize shadow-2xl shadow-transparent transition-all duration-500 ease-linear hover:to-sky-50 hover:shadow-blue-300 sm:text-2xl ">
          captcha cracking
        </p>
        <p className="-top-6 -translate-y-8 translate-x-14 rounded-xl bg-gradient-to-br from-fuchsia-300 to-purple-100 p-5 text-lg capitalize shadow-xl shadow-transparent transition-all duration-500 ease-linear hover:to-purple-50 hover:shadow-fuchsia-200 sm:translate-x-24 sm:text-2xl">
          realtime update
        </p>

        <p className="mt-6 rounded-lg p-2 text-center text-xl font-semibold capitalize text-sky-500 shadow-xl shadow-transparent transition-all duration-500 ease-in-out hover:text-sky-200  hover:shadow-cyan-300 sm:text-3xl">
          These together will make your Advising comfortable
        </p>

        <Link
          href={"/login"}
          className="active: mt-10 rounded-lg bg-sky-400 from-sky-400 px-4 py-2 text-2xl text-blue-100 shadow-xl shadow-transparent transition-all hover:bg-gradient-to-br hover:to-sky-200 hover:text-blue-900 hover:shadow-sky-300 active:bg-sky-200 active:text-blue-900"
        >
          Login
        </Link>
      </div>
      <div className="absolute -top-20 left-44 -z-50 m-0 h-[20vh] w-[20vh] animate-pulse rounded-full bg-gradient-to-tr from-teal-300 to-teal-100 p-0 blur-xl sm:left-36 sm:top-0 sm:h-[40vh] sm:w-[40vh]" />
      <div className="absolute bottom-28 right-36 -z-50 m-0 h-[40vh] w-[40vh] animate-pulse rounded-full bg-gradient-to-tr from-blue-100 to-blue-300 p-0 blur-xl" />
    </main>
  );
}
