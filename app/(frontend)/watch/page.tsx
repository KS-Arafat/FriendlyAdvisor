import React from "react";
import { MuseoModerno, Tourney } from "next/font/google";
const muse = MuseoModerno({ subsets: ["latin"] });
const tour = Tourney({ subsets: ["latin"] });
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
        className={`${muse.className} special-article pt-4 text-3xl font-bold uppercase mix-blend-difference`}
      >
        W a t c h e r
      </h1>

      <div className="bg grid w-11/12 grid-cols-1 pt-10 sm:w-7/12">
        <div
          className={`${tour.className} grid grid-cols-3 rounded-b-sm rounded-t-lg bg-gradient-to-tr from-cyan-400 to-emerald-100 p-1 text-center text-xl font-semibold text-amber-300 bg-blend-color-dodge`}
        >
          <p className="mix-blend-difference">Name</p>
          <p className="mix-blend-difference">Section</p>
          <p className="mix-blend-difference">Seats</p>
        </div>
        {courses.map((e) => {
          return (
            <div
              key={Math.random()}
              className={`mt-1 grid grid-cols-3 rounded-sm bg-gradient-to-bl p-1 text-center text-xl uppercase sm:mt-2 
                ${
                  e.emptyseat <= 0
                    ? " from-red-200 from-35% to-rose-500"
                    : " from-green-200 from-35% to-emerald-500"
                }`}
            >
              <p
                draggable="false"
                className="font-semibold text-teal-100 mix-blend-lighten"
              >
                {e.name}
              </p>
              <p className="font-semibold text-sky-500 mix-blend-luminosity">
                {e.section}
              </p>
              <p className="font-semibold text-yellow-600 mix-blend-luminosity">
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
