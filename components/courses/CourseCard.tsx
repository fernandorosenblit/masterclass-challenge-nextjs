import { Course } from "@/types/course";
import Image from "next/image";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
      <Image
        src={course.instructor_image_url}
        alt={course.title}
        width={100}
        height={100}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold">{course.title}</h3>
      <p className="text-sm text-gray-500">{course.instructor_name}</p>
    </div>
  );
}
