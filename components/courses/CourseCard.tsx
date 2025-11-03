import { Course } from "@/types/course";
import Image from "next/image";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group border border-gray-200 rounded-lg p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200 bg-white h-full">
      <div className="relative overflow-hidden rounded-md aspect-video bg-gray-100">
        <Image
          src={course.instructor_image_url}
          alt={`${course.title} - Instructor: ${course.instructor_name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors hover:cursor-pointer text-gray-900">
          {course.title}
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <p
            className="text-sm text-gray-900 line-clamp-2 hover:cursor-pointer"
            aria-label="Instructor name"
          >
            <span className="sr-only">Instructor: </span>
            {course.instructor_name}
          </p>
        </div>
      </div>
    </article>
  );
}
