import Image from "next/image";
import CourseField from "./CourseField";
import Testanimation from "./testanimation";
import { cookies } from "next/headers";
import coursesList from "@/utils/getCourseList";
import { redirect } from "next/navigation";

const cookieName = "coursetaken";

const AddCourseAction = async (data: FormData) => {
  "use server";
  let takencourse: string[] = [];
  let newCourse = data.get("selectedCourse")?.toString().toLocaleUpperCase();
  if (
    newCourse == "" ||
    newCourse == undefined ||
    !coursesList.includes(newCourse)
  )
    return;
  const cookie = cookies();
  const rawCookie = cookie.get(cookieName);
  try {
    if (rawCookie == undefined || rawCookie.value == "") {
      cookie.set(cookieName, JSON.stringify([]));
      takencourse = [];
    } else takencourse = JSON.parse(rawCookie.value) as string[];
  } catch (error) {
    cookie.set(cookieName, JSON.stringify([]), {
      maxAge: 60 * 60,
    });
  }

  if (takencourse.includes(newCourse) || takencourse.length > 5) return;

  takencourse.push(newCourse);

  cookie.set(cookieName, JSON.stringify(takencourse));
  return takencourse;
};

export default function coursefinder({
  searchParams,
}: {
  searchParams: { msg: string };
}) {
  const cookie = cookies();
  const rawCookie = cookie.get(cookieName);
  let takencourse: string[] = [];
  try {
    if (rawCookie == undefined || rawCookie.value == "") {
      takencourse = [];
    } else takencourse = JSON.parse(rawCookie.value) as string[];
  } catch (error) {
    cookie.set(cookieName, JSON.stringify([]));
  }
  console.log(takencourse);

  return (
    <div className="flex flex-col items-center overflow-visible">
      <p className="w-full animate-pulse text-pretty rounded-full border-b-2 border-double border-[#89CFF3] p-3 text-center text-3xl font-bold text-[#00A9FF]">
        Course Watcher
      </p>
      <div className="m-1 grid h-screen w-11/12 grid-cols-2 p-1 pt-5 sm:w-9/12 sm:gap-10">
        <form action={AddCourseAction} className="relative w-full ">
          <CourseField className="sm:absolute sm:right-[5rem] sm:top-4" />
          <button
            type="submit"
            className="fixed bottom-10 right-10 z-10 m-0 h-fit max-w-32  bg-slate-200 p-0 sm:absolute sm:right-5 sm:top-4 sm:max-w-10"
          >
            <Image
              className="active:max-w-24 active:border-4 active:blur-sm sm:active:max-w-10 sm:active:border-2"
              draggable="false"
              src="plus-square.svg"
              width="60"
              height="60"
              alt=""
            />
          </button>
        </form>
        <div className="card ] relative grid h-fit w-full grid-cols-1 justify-items-end rounded-lg bg-[#b4ecfd] shadow-xl">
          <form className="h-[50vh] w-full rounded-lg p-3">
            <p className="mb-4 rounded-xl border border-b-4 border-l-2 border-double border-[#2647ff] p-2 text-center font-serif font-semibold uppercase text-[#00aaff] shadow-md">
              Added Courses
            </p>
            <div className="h-9/12 mx-2">
              <ul className="grid h-full cursor-pointer grid-cols-1 gap-3 px-2 sm:grid-cols-2">
                {takencourse.map((e) => (
                  <li
                    className="custom-li rounded-lg py-1 text-center"
                    key={Math.random()}
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="custom-buttons absolute -bottom-14 left-0 grid w-full grid-cols-2">
              <button
                className="custom-button m-1"
                type="submit"
                formAction={async () => {
                  "use server";
                  redirect("/watch");
                }}
              >
                Watch
              </button>
              <button
                className="custom-button m-1 "
                type="submit"
                formAction={async () => {
                  "use server";
                  cookies().delete(cookieName);
                }}
              >
                Clear
              </button>
            </div>
          </form>
          <span className="top"></span>
          <span className="right"></span>
          <span className="bottom"></span>
          <span className="left"></span>
        </div>
      </div>
    </div>
  );
}
