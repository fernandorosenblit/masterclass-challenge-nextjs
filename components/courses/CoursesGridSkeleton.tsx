import CourseCardSkeleton from "./CourseCardSkeleton";

interface CoursesGridSkeletonProps {
  count?: number;
  columns?: {
    base?: number;
    md?: number;
    lg?: number;
  };
}

export default function CoursesGridSkeleton({
  count = 8,
}: CoursesGridSkeletonProps = {}) {
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
