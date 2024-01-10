"use client";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";

const CourseField = ({ className }: { className?: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length > 7) return;
      try {
        const response = await fetch("/api/getCrs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ characters: inputValue }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        console.log(data);

        setSuggestions(data.suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [inputValue]);

  const handleInputChange = async (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={className}>
      <div className="w-32">
        <div className="relative">
          <input
            className="row-start-1 row-end-2 max-h-10 w-32 gap-0 rounded-md p-2 pr-8 outline-none ring-4 transition-all duration-1000 ease-in-out focus:ring-inset focus:ring-[#89CFF3]"
            type="text"
            id="characterType"
            value={inputValue}
            onChange={handleInputChange}
            name="selectedCourse"
          />
          <Image
            className="absolute right-2 top-2.5 m-0 h-5 w-5 rounded-full p-0 active:border-4 active:border-red-400"
            draggable="false"
            src="cross-square.svg"
            height="20"
            width="20"
            alt=""
            onClick={() => setInputValue("")}
          />
        </div>
        <div className="grid w-32 grid-cols-1 rounded-md bg-slate-300 p-1 text-center">
          <ul className="transition-all duration-500">
            {suggestions.map((suggestion, index) => (
              <li
                className="cursor-pointer rounded-md border-b-2 border-cyan-200 pb-1 duration-300 hover:bg-cyan-200 hover:font-bold active:bg-cyan-200 active:font-bold"
                key={index}
                onClick={() => setInputValue(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseField;
