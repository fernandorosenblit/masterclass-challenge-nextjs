import CourseCardSkeleton from "./CourseCardSkeleton";
import { COURSES_LIMIT } from "@/constants/courses";

interface CoursesGridSkeletonProps {
  count?: number;
  columns?: {
    base?: number;
    md?: number;
    lg?: number;
  };
}

export default function CoursesGridSkeleton({
  count = COURSES_LIMIT,
}: CoursesGridSkeletonProps) {
  return (
    <section aria-label="Loading courses">
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index}>
            <CourseCardSkeleton />
          </li>
        ))}
      </ul>
    </section>
  );
}
