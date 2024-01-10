import coursesList from "@/utils/getCourseList";

const POST = async (req: Request) => {
  const { characters }: { characters: string } = await req.json();
  let filteredCourses: string[] = [],
    count = 10;
  if (characters.length >= 3 && characters.length <= 7) {
    for (const course of coursesList) {
      if (course.toLowerCase().includes(characters.toLowerCase())) {
        filteredCourses.push(course);
        count--;
      }
      if (count <= 0) break;
    }
  }
  return new Response(JSON.stringify({ suggestions: filteredCourses }));
};

export { POST };
