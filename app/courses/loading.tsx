import CoursesGridSkeleton from "@/components/courses/CoursesGridSkeleton";

export default function CoursesLoading() {
  return (
    <>
      <header className="mb-8">
        <div className="h-10 bg-gray-200 rounded w-64 mb-2 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-96 animate-pulse" />
      </header>
      <CoursesGridSkeleton count={12} />
    </>
  );
}
