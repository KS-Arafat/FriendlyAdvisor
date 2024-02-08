import React from "react";
import LocalFont from "next/font/local";

const protest = LocalFont({
  src: "./ProtestGuerrilla-Regular.ttf",
  variable: "--Protest",
});

const roboto = LocalFont({
  src: "./Roboto-Medium.ttf",
  variable: "--Roboto",
  weight: "200",
});

type courseInfo = {
  name: string;
  section: number;
  emptyseat: number;
};

const Watch = () => {
  const courses: courseInfo[] = []; //up
  courses.push({ name: "test1", emptyseat: 11, section: 10 });
  courses.push({ name: "test2", emptyseat: 12, section: 20 });
  courses.push({ name: "lot", emptyseat: 12, section: 20 });
  courses.push({ name: "safin", emptyseat: 0, section: 20 });
  return (
    <div className="grid h-5/6 grid-cols-1 place-items-center">
      <h1
        className={`${protest.className} special-article mt-9 text-5xl font-bold uppercase mix-blend-difference`}
      >
        W a t c h e r
      </h1>

      <div className="bg grid w-11/12 grid-cols-1 pt-10 sm:w-7/12">
        <div
          className={`${roboto.className} group/th m-0 grid grid-cols-3 overflow-hidden rounded-b-sm rounded-t-lg transition-all`}
        >
          <p className="bg-cyan-500 p-1 text-center text-xl text-yellow-50 bg-blend-color-dodge transition-all duration-500 ease-in-out group-hover/th:rounded-lg group-hover/th:hover:rounded-full group-hover/th:hover:bg-cyan-300 group-hover/th:hover:text-amber-500">
            Name
          </p>
          <p className="bg-cyan-500 p-1 text-center text-xl text-yellow-50 bg-blend-color-dodge transition-all duration-500 ease-in-out group-hover/th:rounded-lg group-hover/th:hover:rounded-full group-hover/th:hover:bg-cyan-300 group-hover/th:hover:text-amber-500">
            Section
          </p>
          <p className="bg-cyan-500 p-1 text-center text-xl text-yellow-50 bg-blend-color-dodge transition-all duration-500 ease-in-out group-hover/th:rounded-lg group-hover/th:hover:rounded-full group-hover/th:hover:bg-cyan-300 group-hover/th:hover:text-amber-500">
            Seats
          </p>
        </div>
        {courses.map((e) => {
          return (
            <div
              key={Math.random()}
              className={`mt-1 grid grid-cols-3 rounded-sm p-1 text-center text-xl uppercase sm:mt-2 
                ${e.emptyseat <= 0 ? " bg-rose-300" : " bg-emerald-300"}`}
            >
              <p
                draggable="false"
                className="font-semibold text-purple-900 mix-blend-luminosity"
              >
                {e.name}
              </p>
              <p className="font-semibold text-sky-950 mix-blend-luminosity">
                {e.section}
              </p>
              <p className="font-semibold text-yellow-950 mix-blend-luminosity">
                {e.emptyseat}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watch;
