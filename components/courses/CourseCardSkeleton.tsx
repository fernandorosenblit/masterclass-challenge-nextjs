export default function CourseCardSkeleton() {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 animate-pulse bg-white"
      aria-label="Loading course"
    >
      <div className="relative overflow-hidden rounded-md aspect-video bg-gray-200 mb-3" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-gray-200 h-6 rounded mb-2" />
        <div className="bg-gray-200 h-4 rounded w-2/3" />
      </div>
    </div>
  );
}

